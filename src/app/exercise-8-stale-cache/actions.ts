"use server";

export async function addTodoAction(formData: FormData) {
  const text = formData.get("text");
  if (typeof text !== "string" || text.trim() === "") return;

  await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  // Note: nothing here tells Next.js that the cached
  // GET /api/todos response is now out of date.
}
