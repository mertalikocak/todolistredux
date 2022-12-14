import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredTodos,
  getTodosAsync,
  toggleCompleteTodoAsync,
  toggleRemoveTodoAsync,
} from "../redux/todos/todoSlice";

const TodoList = () => {
  const filteredTodos = useSelector(selectFilteredTodos);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDestroy = async (id, removed) => {
    if (window.confirm("To Do will move to removed list. Are You Sure?")) {
      await dispatch(toggleRemoveTodoAsync({ id, data: { removed } }));
    }
  };
  const handleToggle = async (id, completed) => {
    await dispatch(toggleCompleteTodoAsync({ id, data: { completed } }));
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <ul className="todo-list" {...console.log("a")}>
      {filteredTodos.map((item) => (
        <li key={item._id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item._id, !item.completed)}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => {
                handleDestroy(item._id, !item.removed);
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
