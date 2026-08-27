"use client";

import { useEffect, useState } from "react";

export default function AutoCounter() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setCount(count + 1);
    }, 500);

    return () => clearInterval(id);
  }, [running]);

  return (
    <>
      <div className="bug-report">
        <h2>Bug report</h2>
        <p>
          &quot;I click Start and the counter ticks up once, to 1, then just
          stops. The interval is clearly still running (I can see it in the
          Network-free console logs), but the number on screen never changes
          again. Clicking Stop then Start again also only ever gets it to
          1.&quot;
        </p>
      </div>

      <div className="card">
        <p style={{ fontSize: "2rem", margin: 0 }}>{count}</p>
        <button onClick={() => setRunning((r) => !r)}>
          {running ? "Stop" : "Start"}
        </button>
      </div>

      <p>
        Source: <code>src/app/exercise-1-stale-closure/page.tsx</code>
      </p>
    </>
  );
}
