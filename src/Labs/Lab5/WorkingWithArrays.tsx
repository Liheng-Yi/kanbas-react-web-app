import React, { useState } from "react";
import * as client from "./client";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithArrays() {
  const API = `${REMOTE_SERVER}/lab5/todos`;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [todos, setTodos] = useState<any[]>([]);
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <input
        id="wd-todo-id"
        defaultValue={todo.id}
        className="form-control w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />
      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <h3>Creating new Items in an Array</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />

      <h3>Deleting from an Array</h3>
      <button
        className="btn btn-primary float-end"
        onClick={() => deleteTodo(todo)}
      >
        Delete Todo with ID = {todo.id}
      </button>
      <input
        defaultValue={todo.id}
        className="form-control w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h3>Updating an Item in an Array</h3>
      <button
        className="btn btn-primary float-end"
        onClick={() => updateTodo(todo)}
      >
        Update Todo
      </button>
      <input
        defaultValue={todo.id}
        className="form-control w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <input
        defaultValue={todo.title}
        className="form-control w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <hr />

      <h3>Updating Todo Properties</h3>

      <div className="mb-3">
        <a
          id="wd-update-todo-description"
          href={`${API}/${todo.id}/description/${todo.description}`}
          className="btn btn-primary float-end"
        >
          Update Description
        </a>
        <input
          id="wd-todo-description"
          defaultValue={todo.description}
          className="form-control w-75"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          placeholder="Todo Description"
        />
      </div>
      <br />
      <hr />

      <div className="mb-3">
        <a
          id="wd-update-todo-completed"
          href={`${API}/${todo.id}/completed/${!todo.completed}`}
          className="btn btn-success float-end"
        >
          Toggle Completed
        </a>
        <div className="form-check">
          <input
            id="wd-todo-completed"
            type="checkbox"
            className="form-check-input"
            checked={todo.completed}
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
          />
          <label className="form-check-label">Completed</label>
        </div>
      </div>
      <hr />
    </div>
  );
}
