import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveFilter,
  removeCompletedTodoAsync,
  selectTodos,
} from "../redux/todos/todoSlice";
const ContentFooter = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const itemsLeft = items.filter((item) => !item.completed).length;
  const completedItems = items.filter((item) => item.completed);
  const handleDestroyCompleted = async () => {
    if (window.confirm("Are You Sure?")) {
      await dispatch(removeCompletedTodoAsync(completedItems));
    }
  };
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft} </strong>
        {itemsLeft === 1 ? "item left" : "items left"}
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("all"))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("active"))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("completed"))}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={() => {
          handleDestroyCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default ContentFooter;
