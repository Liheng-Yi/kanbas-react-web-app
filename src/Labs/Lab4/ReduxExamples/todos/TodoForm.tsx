import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state:any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <li className="list-group-item d-flex align-items-center gap-2">
            <input
                style={{ width: '30%' }} 
                className="form-control"
                defaultValue={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
            <button 
                className="btn btn-warning text-dark float-right"
                onClick={() => dispatch(updateTodo(todo))}>
                Update
            </button>
            <button 
                className="btn btn-success text-white float-right"
                onClick={() => dispatch(addTodo(todo))}>
                Add
            </button>
            
        </li>
    );
}

