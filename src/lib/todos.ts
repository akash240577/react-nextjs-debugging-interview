export type Todo = { id: number; text: string };

let todos: Todo[] = [
  { id: 1, text: "Set up project" },
  { id: 2, text: "Write first test" },
];
let nextId = 3;

export function getTodos(): Todo[] {
  return todos;
}

export function addTodo(text: string): Todo {
  const todo = { id: nextId++, text };
  todos = [...todos, todo];
  return todo;
}
