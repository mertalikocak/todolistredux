import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRemovedTodosAsync,
  selectFilteredTodos,
  deleteTodoAsync,
  toggleRemoveTodoAsync,
} from "../redux/todos/todoSlice";
function RemovedList() {
  const filteredTodos = useSelector(selectFilteredTodos);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getRemovedTodosAsync());
  }, [dispatch]);

  const handleDestroy = async (id) => {
    if (window.confirm("To Do will be deleted forever. Are You Sure?")) {
      await dispatch(deleteTodoAsync(id));
    }
  };
  const handleSave = async (id, removed) => {
    if (window.confirm("To Do will move to Todo List. Are You Sure?")) {
      await dispatch(toggleRemoveTodoAsync({ id, data: { removed } }));
    }
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
        <li key={item._id}>
          <div className="view">
            {/*<input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item._id, !item.completed)}
            /> */}
            <label>{item.title}</label>

            <button
              className="save"
              onClick={() => {
                handleSave(item._id, !item.removed);
              }}
            />
            <button
              className="destroy"
              onClick={() => {
                handleDestroy(item._id);
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default RemovedList;
