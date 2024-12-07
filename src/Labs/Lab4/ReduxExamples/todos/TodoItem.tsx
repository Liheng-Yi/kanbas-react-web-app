import React from "react";

export default function TodoItem({
  todo,
  deleteTodo,
  setTodo,
}: {
  todo: { id: string; title: string };
  deleteTodo: (id: string) => void;
  setTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <li className="list-group-item">
      <button
        onClick={() => deleteTodo(todo.id)}
        id="wd-delete-todo-click"
        className="btn btn-danger btn-sm me-2"
      >
        Delete
      </button>
      <button
        onClick={() => setTodo(todo)}
        id="wd-set-todo-click"
        className="btn btn-primary btn-sm"
      >
        Edit
      </button>
      <span className="ms-2">{todo.title}</span>
    </li>
  );
}
