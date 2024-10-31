import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import React from "react";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item d-flex gap-2 justify-content-between align-items-center">
      <input defaultValue={todo.title}
        onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }/>
      <div>
        <button className="btn btn-warning btn-sm me-2" onClick={() => dispatch(addTodo(todo))}
                id="wd-update-todo-click"> Update </button>
        <button className="btn btn-success btn-sm me-2" onClick={() => dispatch(updateTodo(todo))}
              id="wd-add-todo-click"> Add </button>
      </div>
      
    </li>
);}
