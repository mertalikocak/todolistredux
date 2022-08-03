import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveFilter,
  clearAllRemovedTodoAsync,
  selectTodos,
} from "../redux/todos/todoSlice";
const RemovedFooter = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const itemsLeft = items.length;
  const completedItems = items.filter((item) => item.completed);
  const handleDestroyAll = async () => {
    if (window.confirm("Are You Sure?")) {
      await dispatch(clearAllRemovedTodoAsync());
    }
  };
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft} </strong>
        {itemsLeft === 1 ? "item left" : "items left"}
      </span>

      <button
        className="clear-completed"
        onClick={() => {
          handleDestroyAll();
        }}
      >
        Delete All
      </button>
    </footer>
  );
};

export default RemovedFooter;
