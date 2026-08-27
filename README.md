# Debugging interview exercises

A small Next.js 16 (App Router, TypeScript) app containing eight
independent, deliberately broken features — four React frontend bugs, four
Next.js backend/SSR bugs. Each is scoped to one file (or a small pair of
files) and reproducible in a couple of minutes.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the exercise index. Exercise 8 assumes the
dev server is on the default port 3000 (it makes a server-side fetch to
`http://localhost:3000/api/todos`).

## Running an interview

- Pick 2–3 exercises based on the role's focus (frontend-heavy candidates:
  1–4; full-stack/backend-leaning: 5–8).
- Send the candidate the running app (or have them `npm install && npm run
  dev` themselves) plus this repo, minus `INTERVIEWER_GUIDE.md`. Don't open
  that file on a shared screen.
- Read them the "Bug report" box on the exercise page — that's the framing
  a real bug report would give them, deliberately without naming the cause.
- Let them reproduce the bug first. A candidate who can't reproduce a bug
  can't safely claim to have fixed it — this is worth watching for.
- Ask them to explain *why* it happens before jumping to a fix. The fix is
  usually one or two lines; the diagnosis is what's being evaluated.

## Exercises

| # | Page | Files | Concept |
|---|------|-------|---------|
| 1 | `/exercise-1-stale-closure` | `page.tsx` | stale closures over state in `setInterval`/`useEffect` |
| 2 | `/exercise-2-list-keys` | `page.tsx` | using array index as React `key` |
| 3 | `/exercise-3-race-condition` | `page.tsx`, `api/search/route.ts` | out-of-order async responses in `useEffect` |
| 4 | `/exercise-4-effect-loop` | `page.tsx` | new object/array identity per render as an effect dependency |
| 5 | `/exercise-5-dynamic-params` | `api/products/[id]/route.ts` | Route Handler `params` is a `Promise` and must be awaited |
| 6 | `/exercise-6-shared-cart` | `api/cart/route.ts` | module-level mutable state shared across all requests/users |
| 7 | `/exercise-7-hydration` | `page.tsx` | non-deterministic render output causing SSR/client hydration mismatch |
| 8 | `/exercise-8-stale-cache` | `page.tsx`, `actions.ts`, `api/todos/route.ts` | `fetch` caching (`force-cache`) not revalidated after a mutation |

See `INTERVIEWER_GUIDE.md` for the root cause, fix, and follow-up questions
for each one.
