import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todos/todoSlice";

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    console.log("test");
    e.preventDefault();
    dispatch(addTodo({ title }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default Form;
