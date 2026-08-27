"use client";

import { useEffect, useState } from "react";

type Prefs = {
  theme: string;
  pageSize: number;
};

function fetchPrefsCallCount() {
  fetchCount += 1;
  return { theme: "dark", pageSize: 25 } satisfies Prefs;
}

let fetchCount = 0;

function usePrefs(filters: Prefs) {
  const [prefs, setPrefs] = useState<Prefs | null>(null);

  useEffect(() => {
    // Pretend this is a network call keyed by the current filters.
    setPrefs(fetchPrefsCallCount());
  }, [filters]);

  return prefs;
}

export default function Dashboard() {
  const [renderCount, setRenderCount] = useState(0);
  const prefs = usePrefs({ theme: "dark", pageSize: 25 });

  useEffect(() => {
    setRenderCount((n) => n + 1);
  });

  return (
    <>
      <div className="bug-report">
        <h2>Bug report</h2>
        <p>
          &quot;The dashboard fan is spinning up whenever this page is open.
          I checked the Network tab and it&apos;s making the preferences
          request continuously, not just once on load. The page still looks
          fine, but it&apos;s hammering the API and the component re-renders
          never stop.&quot;
        </p>
      </div>

      <div className="card">
        <p>
          Theme: <strong>{prefs?.theme ?? "loading..."}</strong>
        </p>
        <p>
          Page size: <strong>{prefs?.pageSize ?? "loading..."}</strong>
        </p>
        <p style={{ color: "var(--muted)" }}>
          Component render count: {renderCount} (this should stabilize almost
          immediately)
        </p>
      </div>

      <p>
        Source: <code>src/app/exercise-4-effect-loop/page.tsx</code>. Open
        the browser console/network tab while this page is mounted.
      </p>
    </>
  );
}
