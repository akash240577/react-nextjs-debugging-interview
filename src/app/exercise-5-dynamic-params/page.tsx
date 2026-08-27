"use client";

import { useState } from "react";

const PRODUCT_IDS = ["101", "102", "103"];

export default function ProductLookup() {
  const [id, setId] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [status, setStatus] = useState<number | null>(null);

  async function load(productId: string) {
    setId(productId);
    const res = await fetch(`/api/products/${productId}`);
    setStatus(res.status);
    setResult(await res.json());
  }

  return (
    <>
      <div className="bug-report">
        <h2>Bug report</h2>
        <p>
          &quot;We just upgraded Next.js. Since then, every product page
          says &apos;Not found&apos; even for products I can see in the
          database. Nothing about the product data changed - this started
          right after the framework bump.&quot;
        </p>
      </div>

      <div className="card">
        {PRODUCT_IDS.map((pid) => (
          <button key={pid} onClick={() => load(pid)} style={{ marginRight: "0.5rem" }}>
            GET /api/products/{pid}
          </button>
        ))}
        {id && (
          <pre style={{ marginTop: "1rem" }}>
            {`status: ${status}\n${JSON.stringify(result, null, 2)}`}
          </pre>
        )}
      </div>

      <p>
        Source: <code>src/app/api/products/[id]/route.ts</code>
      </p>
    </>
  );
}
