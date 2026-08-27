import { NextRequest, NextResponse } from "next/server";
import { addTodo, getTodos } from "@/lib/todos";

export async function GET() {
  return NextResponse.json({ todos: getTodos() });
}

export async function POST(request: NextRequest) {
  const { text } = (await request.json()) as { text: string };
  const todo = addTodo(text);
  return NextResponse.json({ todo });
}
