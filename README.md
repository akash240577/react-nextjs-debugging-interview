# Debugging interview exercises

A small Next.js 16 (App Router, TypeScript) app containing several
independent, deliberately broken features.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the exercise index. Exercise 8 assumes the
dev server is on the default port 3000 (it makes a server-side fetch to
`http://localhost:3000/api/todos`).

## How to work through an exercise

Each exercise page has a "Bug report" box at the top, written the way a
real bug report would read. Start there:

1. Reproduce the bug yourself before touching any code.
2. Figure out *why* it happens — the fix is usually small; the diagnosis
   is the point.
3. Open the source file(s) linked at the bottom of the page and fix it.
