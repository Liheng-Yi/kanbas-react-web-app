import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleSetTodo = (todo: { id: string; title: string }) => {
    dispatch(setTodo(todo));
  };

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={handleDeleteTodo}
            setTodo={handleSetTodo}
          />
        ))}
      </ul>
      <hr />
    </div>
  );
}
