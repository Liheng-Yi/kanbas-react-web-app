import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({todo}:{todo: { id: string; title: string }}) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item d-flex align-items-center gap-3">
      {todo.title}
      <button className="btn btn-primary text-white"
              onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"> Delete </button>
      <button className="btn btn-danger text-white"
              onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"> Edit </button>
    </li>
);}
