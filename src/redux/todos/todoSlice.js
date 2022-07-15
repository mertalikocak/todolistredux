import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test`
    );

    return res.data.todos;
  }
);
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (data) => {
    console.log(data);
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test`,
      data
    );
    return res.data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test/${id}`,
      data
    );
    return res.data;
  }
);

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test/${id}`
    );
    return id;
  }
);
export const removeAllTodoAsync = createAsyncThunk(
  "todos/removeAllTodoAsync",
  async (completedList) => {
    for (let index = 0; index < completedList.length; index++) {
      var todo = completedList[index];
      console.log(todo._id);
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test/${todo._id}`
      );
    }
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test`
    );
    console.log(res.data);
    return res.data;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: "all",
    isLoading: false,
    error: null,
    addNewTodoLoading: false,
  },
  reducers: {
    /*     toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed;
    }, */
    /*  destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    }, */
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: {
    //get Todos
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      console.log(state.items);
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //add todo
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodoLoading = true;
    },

    [addTodoAsync.fulfilled]: (state, action) => {
      state.addNewTodoLoading = false;
      state.items.push(action.payload);
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodoLoading = false;
      state.error = action.error.message;
    },
    //toggle todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { _id: id, completed } = action.payload;
      console.log(id);
      const index = state.items.findIndex((item) => item._id === id);
      console.log(state.items);
      state.items[index].completed = completed;
    },
    //remove todo
    [removeTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item._id !== id);
      state.items = filtered;
    },
    [removeAllTodoAsync.fulfilled]: (state) => {
      const filtered = state.items.filter((item) => !item.completed === true);
      state.items = filtered;
    },
  },
});
export const { changeActiveFilter, clearCompleted } = todoSlice.actions;
export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};
export default todoSlice.reducer;
