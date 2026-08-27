"use client";

export default function ServerClock() {
  const renderedAt = new Date().toLocaleTimeString();
  const sessionId = Math.random().toString(36).slice(2, 8);

  return (
    <>
      <div className="bug-report">
        <h2>Bug report</h2>
        <p>
          &quot;Users are reporting a flash where the page seems to briefly
          show one thing and then swap to another right after load. Our
          error tracker also has a spike of React errors mentioning
          &apos;hydration&apos; that started around when this page shipped.
          The page still works, but something is clearly wrong.&quot;
        </p>
        <p style={{ marginBottom: 0 }}>
          Open the browser console after loading this page (a real reload,
          not client navigation) to see the warning.
        </p>
      </div>

      <div className="card">
        <p>
          Rendered at: <strong>{renderedAt}</strong>
        </p>
        <p>
          Session id: <strong>{sessionId}</strong>
        </p>
      </div>

      <p>
        Source: <code>src/app/exercise-7-hydration/page.tsx</code>
      </p>
    </>
  );
}
