# Interviewer guide — solutions & talking points

Don't share this file or this screen with the candidate.

---

## 1. `exercise-1-stale-closure` — stale closure

**Root cause:** the `setInterval` callback is created once, when the effect
runs, and closes over `count` as it was *at that moment* (`0`). Every tick
calls `setCount(0 + 1)`, so the state setter keeps being called with the
same value, `1`, forever. `running` is the only dependency, so the effect
(and the closure) isn't recreated on each tick.

**Fix:** use the functional updater form, which doesn't depend on a
captured value:

```tsx
setCount((c) => c + 1);
```

**Follow-ups:**
- "What if the interval also needs to read some other piece of state?"
  (functional updater doesn't help there — `useRef` to hold the latest
  value, or add the value to deps and accept the interval restarting.)
- "Why didn't `[running]` catch this?" — dependency arrays only control
  when the effect *re-runs*; they don't make values inside the closure
  live.

## 2. `exercise-2-list-keys` — index as key

**Root cause:** `key={index}` ties each `<li>`'s identity to its position,
not the data. When an earlier item is removed, React reuses the DOM nodes
in order — the uncontrolled `<input>` at index 1 keeps its typed value
even though the *todo* now rendered at index 1 is a different one.

**Fix:** `key={todo.id}`.

**Follow-ups:**
- "When is index-as-key actually fine?" — static lists that never reorder,
  filter, or have items inserted/removed, and have no per-item local state.
- Ask them to explain it in terms of React's reconciliation, not just "it's
  a rule."

## 3. `exercise-3-race-condition` — out-of-order responses

**Root cause:** each keystroke fires a new `fetch`, and the backend has
randomized latency, so responses can resolve out of order. The effect has
no way to know a response belongs to a stale request and just overwrites
`results` with whatever arrives last, chronologically — not whatever was
requested last.

**Fix:** ignore stale responses, either with a closure flag or
`AbortController`:

```tsx
useEffect(() => {
  if (!term) { setResults([]); return; }
  let ignore = false;
  fetch(`/api/search?q=${encodeURIComponent(term)}`)
    .then((res) => res.json())
    .then((data) => {
      if (!ignore) setResults(data.results);
    });
  return () => { ignore = true; };
}, [term]);
```

`AbortController` is the more complete answer (also cancels the in-flight
request instead of just discarding the result) — strong candidates should
mention it even if they implement the simpler flag.

**Follow-ups:**
- "Would debouncing the input fix this?" — it reduces frequency but doesn't
  eliminate the race; two requests can still resolve out of order.

## 4. `exercise-4-effect-loop` — object identity in deps

**Root cause:** `Dashboard` passes a new object literal `{ theme: "dark",
pageSize: 25 }` to `usePrefs` on every render. `useEffect`'s dependency
comparison is by reference (`Object.is`), so `filters` looks "changed" on
every render even though its contents are identical. The effect calls
`setPrefs`, which triggers a re-render, which creates a new object, which
reruns the effect — forever.

**Fix options (discuss trade-offs):**
- Hoist the literal to a module-level constant (works here since it's
  static).
- `useMemo(() => ({ theme, pageSize }), [theme, pageSize])` if it's derived
  from other state/props.
- Depend on primitives instead of the object: `useEffect(..., [filters.theme,
  filters.pageSize])`.

**Follow-ups:**
- "Would `useCallback`/`useMemo` on the *caller* side always be the right
  fix?" — no; sometimes the real fix is not needing the object as a
  dependency at all (e.g. reading it inside the effect via a ref).

## 5. `exercise-5-dynamic-params` — un-awaited route params

**Root cause:** this Next.js version (App Router, 15+) made dynamic route
`params` (and `searchParams`) asynchronous — they're a `Promise`, not a
plain object, so Next can start streaming before params are resolved. The
handler is typed and destructured the old (pre-15) way, `{ params }: {
params: { id: string } }`, so `params.id` is `undefined` at runtime
(`params` is actually a `Promise`, which has no `id` property) and every
lookup misses.

**Fix:**

```ts
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = PRODUCTS[id];
  ...
}
```

Bonus: mention the generated `RouteContext<'/api/products/[id]'>` helper
type as the version-safe way to type this instead of hand-writing it.

**Follow-ups:**
- "Why didn't TypeScript catch this?" — because the handler's own inline
  type annotation is what TS checks against; it doesn't cross-reference
  what Next actually passes at runtime unless you use the generated route
  types (`next dev`/`next build`/`next typegen`).

## 6. `exercise-6-shared-cart` — module-level mutable state

**Root cause:** `let cart: CartItem[] = []` lives at module scope in the
Route Handler file. Node keeps one instance of that module in memory for
the life of the server process, so every request — from every user/tab —
reads and mutates the *same* array. There's no per-user or per-session
scoping at all.

**Fix (any of):**
- Scope the cart by a session identifier (e.g. a cookie-set id) and key a
  `Map<string, CartItem[]>` by it.
- Move it to a real per-user store (DB, KV, signed cookie carrying the
  cart itself for something this small).

**Follow-ups:**
- "Would this bug even show up in production?" — often *differently*: on a
  single long-lived server it reproduces exactly like this; on serverless
  (a fresh instance per invocation, or several instances behind a load
  balancer) each instance would have its *own* copy, so state randomly
  "resets" or diverges between requests instead of leaking between users.
  Either way, module-level mutable state is unsafe for anything
  request/user-specific.

## 7. `exercise-7-hydration` — hydration mismatch

**Root cause:** `ServerClock` is a Client Component (`"use client"`), which
means it's still rendered once on the server to produce the initial HTML,
*and* rendered again on the client during hydration. `new Date()` and
`Math.random()` are called directly in the render body, so the two
executions produce different text. React detects the mismatch, warns in
the console, and discards/redoes the mismatched DOM — hence the visible
flash.

**Fix:** don't compute non-deterministic values during the shared
render path. Compute them on the client only, after mount:

```tsx
"use client";
import { useEffect, useState } from "react";

export default function ServerClock() {
  const [renderedAt, setRenderedAt] = useState<string | null>(null);

  useEffect(() => {
    setRenderedAt(new Date().toLocaleTimeString());
  }, []);

  return <p>Rendered at: {renderedAt ?? "..."}</p>;
}
```

`suppressHydrationWarning` is the narrower, "I know this one text node
will always differ and that's fine" escape hatch (e.g. a live clock) — it
silences the warning but doesn't fix a real mismatch, so it's the wrong
answer if the candidate reaches for it without understanding why.

**Follow-ups:**
- "Would this bug happen if `ServerClock` were a Server Component (no
  `'use client'`)?" — no. Server Components render once, on the server;
  the result is serialized and the client hydrates from that same
  payload without re-executing the component. Non-determinism only causes
  a mismatch when the *same* component runs on both sides.

## 8. `exercise-8-stale-cache` — fetch caching not revalidated

**Root cause:** `loadTodos` calls `fetch(..., { cache: "force-cache" })`
(this Next.js version doesn't cache `fetch` by default, so this is an
explicit, deliberate opt-in). The Server Action `addTodoAction` posts the
new todo successfully but never tells Next.js that the cached response for
`GET /api/todos` is stale — no `revalidatePath`/`revalidateTag`. The page
keeps rendering the cached list until the cache entry is invalidated by
some other means (e.g. a full redeploy, or eventually a `dynamicIO`/build
boundary depending on setup) — from the user's point of view, it looks
like the todo silently didn't save.

**Fix:** invalidate the cache after the mutation, in the Server Action:

```ts
"use server";
import { revalidatePath } from "next/cache";

export async function addTodoAction(formData: FormData) {
  const text = formData.get("text");
  if (typeof text !== "string" || text.trim() === "") return;

  await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  revalidatePath("/exercise-8-stale-cache");
}
```

Also acceptable: drop `cache: "force-cache"` entirely, since this data
isn't a good caching candidate in the first place (changes on every user
mutation, no shared/long-lived value) — worth asking the candidate whether
they'd rather remove the cache or revalidate it, and why.

**Follow-ups:**
- "Why is `force-cache` on this fetch suspicious even before you know
  about the bug?" — this Next.js version doesn't cache fetches unless you
  ask it to, so `force-cache` here was a deliberate choice someone made;
  the candidate should ask *why* before assuming it's correct.
- "What's the difference between `revalidatePath` and `revalidateTag`
  here?" — `revalidatePath` invalidates everything cached for that route;
  `revalidateTag` (with `next: { tags: [...] }` on the fetch) is more
  precise and is the better answer for anything more than a single-page
  toy example.
