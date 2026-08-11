# CookDish — Design & Navigation Spec

## 0. Recipe sourcing

Recipe content comes from two places, and every screen below needs to handle both without the user noticing a seam:

- **External free APIs** (TheMealDB primarily) power Home, Search, and Categories — this is the bulk of the catalog and needs no user to have submitted anything for the app to feel full on day one.
- **User-submitted recipes** (Add Recipe) mix into the same feeds, search results, and category grids.

Practically: `RecipeCard` and `RecipeDetail` components take a normalized shape (`{source, id, title, image, ...}`) regardless of where the data came from — see `database.md` §0 for the `RecipeRef` model. Search queries TheMealDB's `search.php?s=` live and merges results with a Supabase full-text query against user recipes; Categories similarly merges TheMealDB's `filter.php?c=` with the local `category` column.

Add a small attribution line ("Recipes powered by TheMealDB") in CookDish's Profile/About — required by their free-tier terms.

## 0.1 Visual design system (from inspo)

- **Palette**: warm terracotta/coral orange as the single accent (`~#E8734A`) — used for CTAs, active nav state, tags, progress bars, favorited hearts. Background is a soft cream/off-white (`~#FDF6EF`), not pure white. Text is near-black, not gray, for headlines.
- **Cards**: white, rounded corners (~16–20px), soft shadow, photo as the dominant element (rounded thumbnail or full-bleed hero).
- **Typography**: bold sans headlines with one highlighted word in the accent color (e.g. "Cook with **Simple** Ingredients"). Recipe metadata is always the same compact pattern: `{time} · {difficulty}` under the title.
- **Recurring components**: star rating + review count, heart icon (outline → filled coral on favorite), circular checkbox ingredient rows, pill-shaped filter/trending-search chips, difficulty badges.
- **Bottom nav**: icon + label, 4 items, active item filled/colored, inactive outline/gray.

## 0.2 Screens not in the original plan

- **Onboarding** (`/onboarding`, pre-auth): 3-slide carousel — hero photo + headline ("Discover delicious recipes", "Cook with simple ingredients", intro to CookDish) + short copy, skip button, dot pagination, "Get started" CTA on the last slide leading into `/auth`.
- **Cooking mode** (`/recipe/[source]/[id]/cook`): distinct from the static Recipe Detail read view — one step at a time, full-bleed step photo, "Step X of N" progress bar, prev/next controls, a center play/pause for the step timer, and a "Chef's tip" callout. Launched from the "Start cooking" CTA on Recipe Detail.

## 0.3 Reconciling My Recipes vs Favorites

Treat these as **one screen** (`/my-recipes`) with three tabs, not two separate screens:

- **Saved** — anything favorited (external or user recipes), replaces the standalone "Favorites" screen from the mockups
- **My recipes** — recipes this user authored via Add Recipe
- **Collections** — user-created folders, can mix saved + authored recipes

This keeps one source of truth for "things I've bookmarked" instead of the mockup's two overlapping favorite-lists. The heart icon on any `RecipeCard` still toggles the same `favorites` row regardless of which screen it's tapped from.

## 1. Navigation pattern

Persistent bottom tab bar on mobile / left sidebar on desktop (same routes, responsive shell). **Four tabs**, matching the mockups:

1. Home
2. Search
3. My Recipes (Saved / My recipes / Collections — see §0.3)
4. Profile

**Reached from Profile, not the tab bar** — one level deeper, listed as rows on the Profile screen:

- Meal Planner
- Shopping/Grocery List
- Cooking History
- Settings

**Not tabs** — pushed on top of whichever tab is active, so back-navigation always returns to the tab context:

- Recipe Detail (`/recipe/[source]/[id]`)
- Cooking Mode (`/recipe/[source]/[id]/cook`)
- Add/Create Recipe (`/recipe/new`)
- Category Detail (`/categories/[slug]`)
- Onboarding (`/onboarding`, pre-auth only)

Rationale: Recipe Detail is reached from Home, Search, Categories, and My Recipes alike — it's a shared destination, not a tab of its own. Meal Planner and Shopping List moved out of the tab bar to match the mockups' information architecture — frequent, but not frequent enough to earn permanent nav real estate over Search and My Recipes.

## 2. Screen flow

```
Onboarding → Auth → Home
Home → Search, Categories
Search, Categories → Recipe Detail
Recipe Detail → Cooking Mode, My Recipes (save), Meal Planner (via Profile)
Any tab → Profile → Meal Planner, Shopping List, Cooking History, Settings
Any tab → Add Recipe (persistent "+" action)
```

## 3. Next.js App Router structure

```
app/
  layout.tsx                    # root layout: fonts, Supabase session provider, theme
  page.tsx                      # redirects to /onboarding, /auth, or /(tabs) based on session state

  onboarding/page.tsx            # 3-slide carousel, pre-auth, shown once (localStorage/cookie flag)

  auth/
    login/page.tsx
    signup/page.tsx
    callback/route.ts           # Supabase OAuth/magic-link callback

  (tabs)/
    layout.tsx                  # shared bottom nav / sidebar shell (4 items)
    page.tsx                    # Home & Discovery feed
    search/
      page.tsx                  # Search & filter
    categories/
      page.tsx                  # Category grid
      [slug]/page.tsx           # Category detail (list of recipes)
    my-recipes/
      page.tsx                  # Saved / My recipes / Collections tabs — see §0.3
    profile/
      page.tsx                  # Account, stats, menu (links below)
      planner/page.tsx          # Meal planner + grocery list
      shopping-list/page.tsx    # Standalone grocery list view
      history/page.tsx          # Cooking history
      settings/page.tsx         # Units, theme, dietary prefs

  recipe/
    [source]/[id]/
      page.tsx                  # Recipe Detail (server component)
      cook/page.tsx             # Cooking mode — step-by-step, timer, chef's tips
      loading.tsx
      not-found.tsx
    new/
      page.tsx                  # Add/Create Recipe form
      edit/[id]/page.tsx        # Edit own recipe

  api/
    grocery-list/route.ts       # aggregates planner recipes → shopping list
    recipes/[source]/[id]/scale/route.ts # optional: server-side serving-size math
```

Route groups: `(tabs)` keeps the shared nav layout scoped to tab screens only, so `recipe/[source]/[id]` and `recipe/new` render full-screen without the bottom bar underneath a modal. Profile's sub-pages (`planner`, `shopping-list`, `history`, `settings`) stay nested under `profile/` rather than becoming their own top-level routes, matching how the mockups present them as "drill in from Profile."

## 4. Screen-by-screen breakdown

### Onboarding (`/onboarding`)
- 3 slides: hero photo, bold headline (one word in accent color), short supporting copy
- Skip button (top right, slides 1–2), dot pagination, arrow/"Get started" CTA advancing to `/auth`
- Shown once — gate behind a cookie/localStorage flag, not a route the signed-in user ever sees again

### Home & Discovery Feed (`/`)
- Greeting header ("Hello, {name} 👋") + search entry point + filter icon
- Category quick-nav row (Breakfast/Lunch/Dinner/Dessert icons, "See all" → `/categories`)
- "Popular Recipes" grid, "See all" per section
- States: skeleton loading, empty (new user → show onboarding prompt), error (retry banner)

### Search & Filter (`/search`)
- Search bar (debounced query) — fans out to TheMealDB `search.php?s=` and a Supabase query against user recipes, merged client-side
- Trending search pills (static/curated list, e.g. "Pasta", "Quick meals", "Vegan") above results
- "Recommended for you" grid before a query is entered, based on dietary prefs — swaps to results grid once the user types
- Filter chips: cooking time, dietary restriction, ingredient include/exclude — cooking time and dietary tags only reliably apply to user recipes and cached external recipes (TheMealDB doesn't expose prep time), so filter UI should degrade gracefully rather than silently drop external results
- Empty state with filter-relief suggestion

### Categories & Collections (`/categories`, `/categories/[slug]`)
- Grid of category cards — seed from TheMealDB's `categories.php` (Breakfast, Dessert, Seafood, Vegetarian, etc.) plus any custom categories used by user recipes
- Category detail = TheMealDB `filter.php?c=` results merged with local `recipes` filtered by `category`, reuses the Search results component

### Recipe Detail (`/recipe/[id]`, route disambiguated by source e.g. `/recipe/themealdb/[id]` and `/recipe/user/[id]`)
- Hero image/video, title, author (external recipes show "via TheMealDB" instead of an author)
- Prep/cook time, servings (client-side scaler — recalculates ingredient amounts; TheMealDB doesn't return prep/cook time or a base serving count, so show "servings" as an editable assumption for external recipes rather than a fetched fact)
- Ingredient checklist (client component, local state — checked items persist per session)
- Step-by-step instructions, optional per-step timers (external recipes get one block of instructions parsed into steps by splitting on line breaks — not always as clean as authored steps, so keep a "view original instructions" fallback)
- Actions: Save to favorites, Add to meal planner, Add to grocery list, Share
- Server component for initial data fetch: checks `external_recipes_cache` first, falls back to a live TheMealDB `lookup.php?i=` call and upserts the cache on a miss (see `database.md` §2). Checklist/scaler are client islands.

### Cooking Mode (`/recipe/[source]/[id]/cook`)
- One step at a time, full-bleed step photo, "Step X of N" progress bar
- Prev/next controls either side, center play/pause button driving the step's timer (if `timer_seconds` is set)
- "Chef's tip" callout box where relevant (authored per-step for user recipes; omitted for external recipes unless you curate tips separately)
- Entirely a client component — step index and timer are local state, no server round-trip per step

### My Recipes (`/my-recipes`)
- Three tabs per §0.3: **Saved**, **My recipes**, **Collections**
- Saved = everything in `favorites` regardless of source; My recipes = `recipes` where `author_id = auth.uid()`; Collections = favorites grouped by `collection_name`
- Card actions: unfavorite (heart toggle), open, and for My recipes only — edit/delete

### Meal Planner (`/profile/planner`)
- Weekly calendar grid, drag-or-tap to assign a recipe to a day/slot
- Links out to Shopping List for the generated grocery list rather than embedding it inline

### Shopping List (`/profile/shopping-list`)
- Auto-generated grocery list: ingredients from all planned recipes for the selected date range, merged and deduped by name
- Check-off list state, "clear checked" action

### Cooking History (`/profile/history`)
- Chronological log of recipes marked "cooked" from Cooking Mode's completion screen — simple list, reuses `RecipeCard`

### Add/Create Recipe (`/recipe/new`)
- Multi-step or single long form: title, photo/video upload, prep/cook time, servings, dynamic ingredient rows, dynamic step rows
- Draft autosave (localStorage or Supabase draft row) so users don't lose long-form input
- Preview before publish

### Profile (`/profile`)
- Avatar, name, email
- Stats row: recipe count, favorites count, collections count (quick glance, tappable → jumps into the relevant My Recipes tab)
- Menu rows with chevrons: Meal Planner, Shopping List, Cooking History, Settings, Help & Support
- Sign out

### Settings (`/profile/settings`)
- Unit system toggle (metric/imperial) — global setting, drives ingredient display everywhere
- Theme (light/dark/system)
- Dietary preference tags (used to personalize Home feed and filter results)

## 5. Component architecture

- **Server components by default** for anything that's a read of Supabase data with no interactivity (Recipe Detail body, category grids, feed lists).
- **Client components** only where state/interaction is required: ingredient checklist, serving scaler, filter chips, planner drag-and-drop, form inputs, all of Cooking Mode.
- Shared UI primitives (`components/ui/`): RecipeCard, IngredientRow, FilterChip, TabBar, StarRating, DifficultyBadge, Skeletons — kept presentation-only, no data fetching inside them.
- Data fetching lives in server components or route handlers, never inside shared UI primitives, so the same card component works in Home, Search, Categories, and My Recipes without duplicating fetch logic.
