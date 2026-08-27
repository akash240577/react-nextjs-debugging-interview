import { NextRequest, NextResponse } from "next/server";

const PRODUCTS: Record<string, { id: string; name: string; price: number }> = {
  "101": { id: "101", name: "Mechanical Keyboard", price: 129 },
  "102": { id: "102", name: "4K Monitor", price: 349 },
  "103": { id: "103", name: "USB-C Dock", price: 89 },
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = PRODUCTS[params.id];

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
