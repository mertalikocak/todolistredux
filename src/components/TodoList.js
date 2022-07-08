import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../redux/todos/todoSlice";
const TodoList = () => {
  const items = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();
  console.log(items);
  return (
    <ul className="todo-list">
      {/* <li className="completed">
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>Learn JavaScript</label>
          <button className="destroy" />
        </div>
      </li> */}
      {items.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button className="destroy" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
