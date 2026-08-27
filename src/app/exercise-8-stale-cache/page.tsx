import { addTodoAction } from "./actions";

type TodosResponse = {
  todos: { id: number; text: string }[];
};

async function loadTodos(): Promise<TodosResponse> {
  const res = await fetch("http://localhost:3000/api/todos", {
    cache: "force-cache",
  });
  return res.json();
}

export default async function TodosPage() {
  const { todos } = await loadTodos();

  return (
    <>
      <div className="bug-report">
        <h2>Bug report</h2>
        <p>
          &quot;I add a todo, the form clears like it worked, but the new
          item doesn&apos;t show up in the list. If I wait a while and refresh
          repeatedly it eventually appears. The POST request in the network
          tab returns a 200 with the new todo in the response body, so the
          server clearly has it.&quot;
        </p>
        <p style={{ marginBottom: 0 }}>
          Run <code>npm run dev</code> (default port 3000) for this exercise.
        </p>
      </div>

      <div className="card">
        <form action={addTodoAction} style={{ marginBottom: "1rem" }}>
          <input name="text" placeholder="New todo" required />
          <button type="submit" style={{ marginLeft: "0.5rem" }}>
            Add
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>

      <p>
        Source: <code>src/app/exercise-8-stale-cache/page.tsx</code> and{" "}
        <code>src/app/exercise-8-stale-cache/actions.ts</code>
      </p>
    </>
  );
}
