import { NextRequest, NextResponse } from "next/server";

type CartItem = { name: string; qty: number };

// Holds the cart for... everyone. There's no per-user or per-session
// scoping here at all.
let cart: CartItem[] = [];

export async function GET() {
  return NextResponse.json({ cart });
}

export async function POST(request: NextRequest) {
  const { name } = (await request.json()) as { name: string };

  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, qty: 1 });
  }

  return NextResponse.json({ cart });
}

export async function DELETE() {
  cart = [];
  return NextResponse.json({ cart });
}
