# CookDish — Agent Working Notes

Instructions for any AI coding agent (Claude Code, Cursor, etc.) working in the CookDish repo. Read alongside `design.md` and `database.md`, which are the source of truth for screens and schema.

## 1. Stack constraints — do not deviate

- **Frontend + backend**: Next.js, App Router only (no Pages Router).
- **Database + auth**: Supabase. No other database, no custom auth.
- **Hosting**: Vercel. Assume Vercel's env var handling (`NEXT_PUBLIC_*` for client-exposed values).
- **Recipe content**: TheMealDB (free, base URL `https://www.themealdb.com/api/json/v1/1/`, test key `1`) is the primary external source, plus optional secondary free APIs (e.g. TheCocktailDB). Do not add a paid recipe API without being asked.
- No additional backend service, no separate API server — route handlers in `app/api/` cover any server-side logic Supabase's client library can't do directly, including all calls to TheMealDB (never call it directly from a client component — proxy through a server component or route handler so caching and normalization happen in one place).

## 2. External API conventions

- All TheMealDB calls happen server-side (server components or route handlers), never in `"use client"` code — this keeps the cache-check-then-fetch logic in one place and avoids exposing call patterns to the client.
- Normalize every TheMealDB payload before it touches the rest of the app: map `strIngredient1..20`/`strMeasure1..20` into a single `ingredients: [{name, amount}]` array, drop empty slots, and store the normalized shape in `external_recipes_cache.payload` (see `database.md` §2) — nothing downstream should ever loop over `strIngredient1`, `strIngredient2`, ... by hand.
- Check `external_recipes_cache` before calling the live API; only call out on a cache miss or when `fetched_at` is stale (suggest 30 days for recipe content, which rarely changes).
- Treat every external call as fallible: TheMealDB has no uptime SLA on the free tier. Recipe Detail, Search, and Categories all need a real empty/error state, not just a spinner that hangs.
- If the app is ever submitted to an app store or gets meaningful traffic, the test key `1` needs to be swapped for a supporter key per TheMealDB's terms — flag this rather than shipping silently on the shared key indefinitely.

## 3. File/folder conventions

- Follow the route structure in `design.md` exactly — don't invent alternate route names or restructure the `(tabs)` group.
- Shared presentational components go in `components/ui/`; feature-specific components (e.g. `PlannerCalendar`) go in `components/{feature}/`.
- Supabase client setup: one client for server components (`lib/supabase/server.ts`), one for client components (`lib/supabase/client.ts`), one for middleware (`lib/supabase/middleware.ts`). Never instantiate a client inline inside a component.
- Types generated from the Supabase schema go in `lib/database.types.ts` — regenerate rather than hand-edit when the schema changes.

## 4. Component rules

- Default to server components. Add `"use client"` only when the component needs state, effects, or browser APIs (forms, checklists, drag-and-drop, sliders).
- Data fetching happens in server components or route handlers — never inside a shared `components/ui/` primitive. A `RecipeCard` receives data as props; it does not fetch its own data.
- Respect RLS: never use the Supabase service-role key in client-reachable code. Service-role key (if ever needed for an admin task) stays server-only, in a route handler, never bundled to the client.

## 5. Coding standards

- TypeScript strict mode. No `any` — use the generated Supabase types or explicit interfaces.
- Server actions or route handlers for mutations (creating a recipe, toggling a favorite, updating meal plans) — don't call Supabase directly from client components for writes that need validation.
- Form validation with a schema library (e.g. zod) on both the client form and the server action, since RLS won't catch malformed data shapes.
- Loading and error states are required for every data-fetching route (`loading.tsx`, `error.tsx`) — not optional polish.

## 6. Feature-specific notes

- **Serving-size scaling**: compute client-side from `recipes.servings` as the base; never mutate stored `ingredients.amount` — scaling is a display-time calculation.
- **Grocery list**: derive from `meal_plans` at request time — join to `ingredients` for `recipe_source = 'user'`, read from `external_recipes_cache.payload` for `recipe_source = 'themealdb'` (see `database.md` §2), then merge both into one list by ingredient name. Don't create a persistent denormalized grocery table unless check-off state needs to survive across devices.
- **Unit conversion (metric/imperial)**: driven by `profiles.unit_system`; keep the conversion function pure and centralized in `lib/units.ts` so every screen displaying an amount uses it.
- **Image uploads**: go to the `recipe-images` Supabase Storage bucket under `{user_id}/{recipe_id}/{filename}` — see `database.md` §5. Never write raw base64 into a database column.

## 7. What not to do

- Don't add a state management library (Redux/Zustand) for data that Supabase + server components already handle — reach for React state/URL search params first.
- Don't build a custom auth flow "for flexibility" — use Supabase Auth's provided flows and SSR helpers.
- Don't fetch on the client when a server component can fetch at request time; only go client-side when the data needs to update from user interaction without a full navigation.
- Don't skip RLS policies "to move faster" — every new table needs a policy before it ships, per `database.md` §4.
