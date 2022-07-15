const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const { response } = require("express");

dotenv.config({ path: "./config.env" });

const app = express();

//db connection
mongoose
  .connect("mongodb://127.0.0.1/todolistDB")
  .then(() => console.log("db connected."))
  .catch((err) => console.log(err));
//Middlewares
app.use(cors());
app.use(json());

let todos = [
  {
    id: nanoid(),
    title: "todo 1",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 2",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 3",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 4",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 5",
    completed: false,
  },
];

app.get("/todos", (req, res) => res.send(todos));

app.post("/todos", (req, res) => {
  const todo = { title: req.body.title, id: nanoid(), completed: false };
  todos.push(todo);
  return res.send(todo);
});

app.get("/todos-test", async (req, res) => {
  console.log("get istegi gönderildi");
  try {
    const todos = await Todo.find({});

    res.status(201).json({ todos });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

app.post("/todos-test", async (req, res) => {
  console.log("post istegi gönderildi");
  try {
    const todo = await Todo.create({ title: req.body.title, completed: false });

    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

app.delete("/todos-test/:_id", async (req, res) => {
  console.log("delete istegi gönderildi");
  const id = req.params._id;
  try {
    const deletedTodo = await Todo.deleteOne({ _id: id });
    res.status(201).json(deletedTodo);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

app.patch("/todos-test/:_id", async (req, res) => {
  console.log("patch istegi gönderildi");
  try {
    const id = req.params._id;
    const todo = await Todo.findById(id);
    const completed = Boolean(req.body.completed);
    todo.completed = completed;
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const completed = Boolean(req.body.completed);
  if (index > -1) {
    todos[index].completed = completed;
  }
  return res.send(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
