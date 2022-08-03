import React from "react";
import Form from "./Form";
import { useSelector, useDispatch } from "react-redux";
import { selectList, changeActiveList } from "../redux/todos/todoSlice";

const Header = () => {
  const buttonStatus = useSelector(selectList);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <h1>todos</h1>
      {buttonStatus === "defaultList" ? (
        <a href="/#" onClick={() => dispatch(changeActiveList("removedList"))}>
          Removed List
        </a>
      ) : (
        <a href="/#" onClick={() => dispatch(changeActiveList("defaultList"))}>
          Back to Todo List
        </a>
      )}
      {buttonStatus === "defaultList" ? <Form /> : ""}
    </header>
  );
};

export default Header;
