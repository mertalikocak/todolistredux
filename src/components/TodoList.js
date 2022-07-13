import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, destroy, selectFilteredTodos } from "../redux/todos/todoSlice";

const TodoList = () => {
  const filteredTodos = useSelector(selectFilteredTodos);
  const dispatch = useDispatch();
  const handleDestroy = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(destroy(id));
    }
  };

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
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
