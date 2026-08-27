"use client";

import { useEffect, useState } from "react";

type SearchResponse = {
  query: string;
  results: string[];
};

export default function PackageSearch() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!term) {
      setResults([]);
      return;
    }

    fetch(`/api/search?q=${encodeURIComponent(term)}`)
      .then((res) => res.json())
      .then((data: SearchResponse) => {
        setResults(data.results);
      });
  }, [term]);

  return (
    <>
      <div className="bug-report">
        <h2>Bug report</h2>
        <p>
          &quot;Our package search hits a real backend, and it's usually
          fine, but if I type a full word quickly (like &apos;react&apos;)
          the results box often ends up showing matches for &apos;r&apos; or
          &apos;re&apos; instead - as if it forgot what I actually typed. It
          self-corrects if I stop and wait a second. QA says it's most
          reproducible on a throttled connection.&quot;
        </p>
      </div>

      <div className="card">
        <input
          placeholder="Search packages..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{ width: "100%", marginBottom: "0.75rem" }}
        />
        <p style={{ color: "var(--muted)", margin: "0 0 0.5rem" }}>
          Showing results for: <strong>{term || "(nothing typed)"}</strong>
        </p>
        <ul>
          {results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      <p>
        Source: <code>src/app/exercise-3-race-condition/page.tsx</code> (and{" "}
        <code>src/app/api/search/route.ts</code> if you want to see the
        simulated backend)
      </p>
    </>
  );
}
