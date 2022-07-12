import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, destroy } from "../redux/todos/todoSlice";
let filtered = [];
const TodoList = () => {
  const items = useSelector((state) => state.todos.items);
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const dispatch = useDispatch();
  const handleDestroy = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(destroy(id));
    }
  };
  if (activeFilter != "all") {
    filtered = items.filter((todo) =>
      activeFilter == "active"
        ? todo.completed === false
        : todo.completed === true
    );
  } else {
    filtered = items;
  }
  return (
    <ul className="todo-list">
      {filtered.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
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
