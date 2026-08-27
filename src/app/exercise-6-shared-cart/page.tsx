"use client";

import { useEffect, useState } from "react";

type CartItem = { name: string; qty: number };

const ITEMS = ["Keyboard", "Monitor", "Dock"];

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  async function refresh() {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCart(data.cart);
  }

  async function add(name: string) {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setCart(data.cart);
  }

  async function clear() {
    const res = await fetch("/api/cart", { method: "DELETE" });
    const data = await res.json();
    setCart(data.cart);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <div className="bug-report">
        <h2>Bug report</h2>
        <p>
          &quot;A customer emailed us screenshots showing items in their cart
          that they never added. Support couldn&apos;t reproduce it on one
          machine, but it happens reliably if you open the cart page in two
          different browser windows (or one normal + one incognito) at the
          same time and add items in each.&quot;
        </p>
        <p style={{ marginBottom: 0 }}>
          Try it: open this page in a normal window and an incognito window
          side by side, add different items in each, and compare.
        </p>
      </div>

      <div className="card">
        {ITEMS.map((name) => (
          <button key={name} onClick={() => add(name)} style={{ marginRight: "0.5rem" }}>
            Add {name}
          </button>
        ))}
        <button onClick={clear} style={{ marginLeft: "0.5rem" }}>
          Clear cart
        </button>
        <ul>
          {cart.map((item) => (
            <li key={item.name}>
              {item.name} × {item.qty}
            </li>
          ))}
        </ul>
      </div>

      <p>
        Source: <code>src/app/api/cart/route.ts</code>
      </p>
    </>
  );
}
