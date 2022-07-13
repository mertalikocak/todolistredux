import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredTodos,
  getTodosAsync,
  toggleTodoAsync,
  removeTodoAsync,
} from "../redux/todos/todoSlice";

const TodoList = () => {
  const filteredTodos = useSelector(selectFilteredTodos);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDestroy = async (id) => {
    if (window.confirm("Are You Sure?")) {
      await dispatch(removeTodoAsync(id));
    }
  };
  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }));
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item.id, !item.completed)}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => {
                handleDestroy(item.id);
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
