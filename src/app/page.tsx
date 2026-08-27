import Link from "next/link";

const exercises = [
  {
    href: "/exercise-1-stale-closure",
    title: "1. The counter that won't count",
    tag: "React · hooks",
  },
  {
    href: "/exercise-2-list-keys",
    title: "2. The todo list with amnesia",
    tag: "React · lists",
  },
  {
    href: "/exercise-3-race-condition",
    title: "3. The search box that lies",
    tag: "React · async",
  },
  {
    href: "/exercise-4-effect-loop",
    title: "4. The page that won't stop fetching",
    tag: "React · useEffect",
  },
  {
    href: "/exercise-5-dynamic-params",
    title: "5. The product page that crashes",
    tag: "Next.js · route handlers",
  },
  {
    href: "/exercise-6-shared-cart",
    title: "6. The cart everyone shares",
    tag: "Next.js · server state",
  },
  {
    href: "/exercise-7-hydration",
    title: "7. The clock that flickers",
    tag: "Next.js · SSR/hydration",
  },
  {
    href: "/exercise-8-stale-cache",
    title: "8. The todo that won't appear",
    tag: "Next.js · caching",
  },
];

export default function Home() {
  return (
    <>
      <h1>Debugging interview exercises</h1>
      <p>
        Each exercise is a small, deliberately broken feature. Read the bug
        report on the page, then open the linked source file(s) and find the
        root cause. See <code>README.md</code> at the project root for how to
        run an interview with these, and <code>INTERVIEWER_GUIDE.md</code> for
        solutions and talking points (interviewer only — don&apos;t open it on
        a shared screen).
      </p>
      <ul className="exercise-list">
        {exercises.map((e) => (
          <li key={e.href}>
            <Link href={e.href}>{e.title}</Link>
            <span className="tag">{e.tag}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
