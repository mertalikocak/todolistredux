import React from "react";
import TodoList from "./TodoList";
import RemovedList from "./RemovedList";
import RemovedFooter from "./RemovedFooter";
import ContentFooter from "./ContentFooter";
import { selectList } from "../redux/todos/todoSlice";
import { useSelector } from "react-redux";

const Content = () => {
  const activeList = useSelector(selectList);
  return (
    <section className="main">
      <input className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      {activeList === "defaultList" ? <TodoList /> : <RemovedList />}
      {activeList === "defaultList" ? <ContentFooter /> : <RemovedFooter />}
    </section>
  );
};

export default Content;
