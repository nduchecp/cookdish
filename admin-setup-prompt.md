# Build prompt — CookDish admin screens

Paste this into your coding agent. Scope is admin screens only — `app/admin/*`. Follow `admin.md` for the full spec; this prompt is the build order and what to hardcode versus wire up for real.

---

Build out the admin panel for CookDish under `app/admin/`. Auth/roles and the database aren't finished yet, so this pass is UI + routing structure with placeholder data — same approach already used for the consumer screens. Don't add real Supabase queries for anything the schema doesn't support yet (see "hardcode for now" below); build the screens so swapping in real data later is a data-source change, not a rebuild.

## 1. Route structure

```
app/admin/
  layout.tsx           # admin shell — separate nav from the consumer (tabs) layout, not nested under it
  page.tsx              # Overview — counts only
  recipes/
    page.tsx             # Recipe management list
    [id]/page.tsx         # Edit any recipe (reuse the /recipe/new form, no ownership check)
  moderation/
    page.tsx              # Two tabs: Pending review, Reported content
  categories/
    page.tsx               # Category list + create/edit
  users/
    page.tsx                # User list, search, suspend/ban actions
```

## 2. Build order

1. **Admin layout** — a distinct shell (sidebar or top nav, your call) with links to Overview, Recipes, Moderation, Categories, Users. Visually it can borrow the coral/cream palette from `design.md` §0.1, but it should read as clearly separate from the consumer app — an admin shouldn't confuse this for a regular screen mid-task.
2. **Overview** — four count cards: total recipes, total users, pending moderation count, open reports count. Hardcoded numbers for now.
3. **Category management** — build this early even though it's "just CRUD," because it's the screen that resolves the taxonomy gap from QA. List, create, edit, delete. Hardcode the initial list to match what's already live (Soups & Swallows, Rice & Stews, Grills & Suya, Bakery & Snacks) so it's not starting from empty.
4. **Recipe management** — list view with search/filter by category and source (reuse `RecipeCard` or a table variant of it). Edit opens the same form used by `/recipe/new`. Delete with a confirm step.
5. **Moderation** — two tabs per `admin.md` §2. Pending review: list + Approve/Reject buttons, reject opens a small reason input. Reported content: list grouped by recipe with a report count, Dismiss/Remove actions.
6. **User management** — searchable list, per-user Suspend/Ban action with a reason field, matching `admin.md` §2.

## 3. Hardcode for now — schema isn't there yet

- `moderation_status`, `moderated_by`, `moderated_at`, `moderation_notes` on recipes — build the Pending/Rejected UI states against a mock array, not a real column
- `reports` table doesn't exist yet — mock a handful of sample reports so the Reported Content tab has something to render
- `profiles.role` / `status` / `status_reason` — mock the user list, wire the Suspend/Ban buttons to update local state only, not a real row
- `categories` as a real table — mock the initial four categories as a local array; build the create/edit form so it's obviously meant to persist, even though it doesn't yet

## 4. Explicitly do not build yet

- No middleware role check (`profiles.role !== 'admin'` redirect) — there's no real role column to check against. Leave a `// TODO: gate this route once auth/roles exist` comment in the layout instead of building fake auth.
- No `is_admin()` Postgres function or RLS changes — that's a `database.md` migration task, not a UI task.
- No audit log, no granular roles — both explicitly deferred in `admin.md` §5.

## 5. When DB/auth are ready (separate future task, not this one)

Swap each hardcoded array for the matching Supabase query, add the `is_admin()` RLS policies from `database.md` §4, and add the middleware role check. Flag that as its own task when the time comes rather than trying to retrofit it into this pass.
