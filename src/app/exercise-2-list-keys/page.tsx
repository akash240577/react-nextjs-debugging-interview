"use client";

import { useState } from "react";

type Todo = {
  id: number;
  label: string;
};

const initialTodos: Todo[] = [
  { id: 1, label: "Write onboarding doc" },
  { id: 2, label: "Review PR #482" },
  { id: 3, label: "Fix flaky CI job" },
  { id: 4, label: "Ship v2.3" },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  function remove(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      <div className="bug-report">
        <h2>Bug report</h2>
        <p>
          &quot;I edited the text box for &apos;Review PR #482&apos; to say
          &apos;Review PR #482 - blocked&apos;, then deleted &apos;Write
          onboarding doc&apos; above it. After the delete, the text I typed
          jumped up onto the wrong row. Nothing else about the data changed -
          this seems purely visual, but it's confusing users badly.&quot;
        </p>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} className="card">
            <input
              defaultValue={todo.label}
              style={{ width: "70%", marginRight: "0.5rem" }}
            />
            <button onClick={() => remove(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p>
        Source: <code>src/app/exercise-2-list-keys/page.tsx</code>
      </p>
    </>
  );
}
