import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/todoSlice";

const Form = () => {
  const [title, setTitle] = useState("");
  const isLoading = useSelector((state) => state.todos.addNewTodoLoading);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    console.log("test");
    e.preventDefault();
    await dispatch(addTodoAsync({ title }));
  };

  if (error) {
    alert(error);
    return;
  }
  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
      <input
        disabled={isLoading}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isLoading && (
        <span style={{ display: "flex", alignItems: "center" }}>
          Loading...
        </span>
      )}
    </form>
  );
};

export default Form;
