import { NextRequest, NextResponse } from "next/server";

const CATALOG = [
  "react",
  "react-dom",
  "react-router",
  "redux",
  "redux-toolkit",
  "next",
  "next-auth",
  "node",
  "nodemon",
  "typescript",
  "tailwindcss",
  "vite",
  "vitest",
  "webpack",
];

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase() ?? "";

  // Simulate a backend with unpredictable latency, e.g. a slow search
  // index or an upstream service under variable load.
  const delayMs = 100 + Math.random() * 900;
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const results = q
    ? CATALOG.filter((pkg) => pkg.includes(q))
    : [];

  return NextResponse.json({ query: q, results });
}
