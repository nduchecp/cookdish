# CookDish — Database & Auth Spec (Supabase)

## 0. Recipe sourcing model

Recipes come from **two sources**, unified in the app layer as a `RecipeRef`:

- **External** — pulled live from free recipe APIs (primary source for Home, Search, Categories). Not stored as full records in Supabase; only a lightweight cache + references.
- **User-submitted** — created via Add Recipe, stored fully in Supabase (the `recipes`/`ingredients`/`steps` tables from before).

```
RecipeRef = { source: "themealdb" | "user", id: string }
```

Every place that used to reference `recipes.id` alone (favorites, meal plan entries) now stores `source` + `id` together, since an id like `"52977"` from TheMealDB and a Supabase uuid live in different namespaces.

### External providers (free tier)

| provider | use | notes |
|---|---|---|
| **TheMealDB** | primary recipe source | base URL `https://www.themealdb.com/api/json/v1/1/`; test key `1` is unlimited for dev/personal use. **A public app store release requires becoming a Patreon supporter** for your own key — budget for this before launch, not after. |
| **TheCocktailDB** | optional, if you ever add a drinks/beverages category | same auth pattern as TheMealDB, same publisher |
| Others (Spoonacular, Edamam) | optional supplementary source | free tiers exist but are quota-limited (daily call caps) — treat as a second-tier fallback, not primary, unless you're ready to manage rate limiting per source |

**Attribution**: TheMealDB is free but expects attribution — add a credit/link in Profile → About or the app footer.

## 1. Auth

Supabase Auth handles sign-up/login (email+password and/or OAuth). `auth.users` is managed by Supabase; app-specific data lives in a `profiles` table keyed to it 1:1.

- New user → trigger creates a matching `profiles` row (id = `auth.users.id`).
- Session handled via Supabase's SSR helpers in Next.js middleware, so server components can read the session directly.

## 2. Core tables

### profiles
| column | type | notes |
|---|---|---|
| id | uuid, PK | = auth.users.id |
| display_name | text | |
| avatar_url | text | |
| unit_system | text | `metric` \| `imperial`, default `metric` |
| theme | text | `light` \| `dark` \| `system` |
| dietary_prefs | text[] | e.g. `{vegetarian, gluten_free}` |
| created_at | timestamptz | default now() |

### recipes  (user-submitted only)
| column | type | notes |
|---|---|---|
| id | uuid, PK | default gen_random_uuid() |
| author_id | uuid, FK → profiles.id | |
| title | text | |
| description | text | |
| image_url | text | Supabase Storage path |
| video_url | text | nullable |
| prep_time_minutes | int | |
| cook_time_minutes | int | |
| servings | int | base serving count for scaling |
| category | text | breakfast / dessert / quick-dinner / seasonal etc. |
| dietary_tags | text[] | for filter matching |
| is_public | boolean | default true |
| created_at | timestamptz | |

### ingredients / steps  (user-submitted only — external recipes carry their own ingredient/instruction fields from the API payload)
Unchanged from before: `ingredients(recipe_id → recipes.id, name, amount, unit, sort_order)`, `steps(recipe_id → recipes.id, step_number, instruction, timer_seconds)`.

### external_recipes_cache
Caches API responses so Recipe Detail, Search, and grocery-list generation don't refetch the same meal on every request, and so a favorited/planned external recipe's ingredients are still available if the upstream API is briefly down.

| column | type | notes |
|---|---|---|
| source | text | `themealdb` (extend as more sources are added) |
| external_id | text | e.g. TheMealDB's `idMeal` |
| payload | jsonb | raw normalized API response (title, image, ingredients, instructions, category, area) |
| fetched_at | timestamptz | used to decide staleness (e.g. refresh if > 30 days old) |
| — | | composite PK (source, external_id) |

Populate on first view: Recipe Detail route checks the cache; on a miss, calls the external API, normalizes the payload, and upserts here before rendering. Search/Categories browse can hit the live API directly (no user-specific data at stake) and only write to cache when a user actually opens a detail page, favorites it, or adds it to a meal plan.

### favorites
| column | type | notes |
|---|---|---|
| user_id | uuid, FK → profiles.id | |
| recipe_source | text | `themealdb` \| `user` |
| recipe_id | text | external_id (as text) or the `recipes.id` uuid (as text) depending on source |
| collection_name | text | default `'Favorites'`, lets users make named folders |
| created_at | timestamptz | |
| — | | composite PK (user_id, recipe_source, recipe_id, collection_name) |

### meal_plans
| column | type | notes |
|---|---|---|
| id | uuid, PK | |
| user_id | uuid, FK → profiles.id | |
| recipe_source | text | `themealdb` \| `user` |
| recipe_id | text | external_id or recipes.id, as text |
| plan_date | date | |
| meal_slot | text | `breakfast` \| `lunch` \| `dinner` \| `snack` |

Grocery list generation: for `recipe_source = 'user'`, join to `ingredients`. For `recipe_source = 'themealdb'`, read the ingredient list out of `external_recipes_cache.payload` (TheMealDB returns up to 20 `strIngredient`/`strMeasure` pairs per meal — normalize these into a `[{name, amount}]` array when caching, so both sources merge into the same shape for the planner). Merge by `(name)` across both sources in the app layer.

### grocery_checked_items (optional)
| column | type | notes |
|---|---|---|
| user_id | uuid | |
| item_key | text | hash of ingredient name |
| checked | boolean | |

## 3. Relationships

```
profiles 1─* recipes                (author_id, user-submitted only)
recipes  1─* ingredients, steps     (recipe_id, cascade delete)
profiles *─* {recipes | external}   via favorites (recipe_source + recipe_id)
profiles 1─* meal_plans             (user_id, recipe_source + recipe_id)
external_recipes_cache              keyed by (source, external_id), no FK — referenced logically by favorites/meal_plans
```

## 4. Row Level Security (RLS)

RLS must be **on** for every Supabase-native table above (the external cache table is server-read data, not per-user, but still gets RLS with an "authenticated read" policy to prevent anonymous scraping via the client).

- `profiles`: user can select/update only their own row (`auth.uid() = id`).
- `recipes`: `select` allowed where `is_public = true OR author_id = auth.uid()`. `insert/update/delete` allowed only where `author_id = auth.uid()`.
- `ingredients`, `steps`: readable if the parent recipe is readable (join check); writable only if `auth.uid()` owns the parent recipe.
- `external_recipes_cache`: `select` for any authenticated user; `insert/update` only via a server-side route (service role or a Postgres function), never directly from the client, so cache writes stay validated/normalized.
- `favorites`, `meal_plans`, `grocery_checked_items`: `all` operations restricted to `user_id = auth.uid()`.

## 5. Storage

Two Supabase Storage buckets:
- `recipe-images` — public read, upload restricted to authenticated users, path convention `{user_id}/{recipe_id}/{filename}`. Only used for **user-submitted** recipes — external recipes use TheMealDB's own hosted image URLs directly (`strMealThumb`), no need to mirror them.
- `avatars` — public read, upload restricted to the owning user.

## 6. Indexes worth adding early

- `recipes(category)`, `recipes(dietary_tags)` (GIN) for filter queries on user-submitted content.
- `ingredients(recipe_id)`, `steps(recipe_id)` for detail-page fetch.
- `meal_plans(user_id, plan_date)` for the weekly planner query.
- `favorites(user_id, recipe_source, recipe_id)` — already the PK, but confirm it's used as the lookup path for "is this saved?" checks.
- Full-text search on user-submitted `recipes(title, description)` — external search uses TheMealDB's own `search.php?s=` endpoint instead of a local index.
