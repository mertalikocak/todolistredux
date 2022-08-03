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

export const getRemovedTodosAsync = createAsyncThunk(
  "todos/getRemovedTodosAsync",
  async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test/removed`
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

export const toggleCompleteTodoAsync = createAsyncThunk(
  "todos/toggleCompleteTodoAsync",
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test/changeComplete/${id}`,
      data
    );
    return res.data;
  }
);

export const toggleRemoveTodoAsync = createAsyncThunk(
  "todos/toggleRemoveTodoAsync",
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test/changeRemove/${id}`,
      data
    );
    return res.data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test/${id}`
    );
    return id;
  }
);

export const removeCompletedTodoAsync = createAsyncThunk(
  "todos/removeCompletedTodoAsync",
  async (completedList) => {
    for (let index = 0; index < completedList.length; index++) {
      var todo = completedList[index];
      console.log(todo._id);
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test/changeRemove/${todo._id}`,
        { removed: true }
      );
    }
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test`
    );
    console.log(res.data);
    return res.data;
  }
);

export const clearAllRemovedTodoAsync = createAsyncThunk(
  "todos/clearAllRemovedTodoAsync",
  async () => {
    var res = await axios.get(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test/removed`
    );
    console.log(res.data.todos.length);
    for (let index = 0; index < res.data.todos.length; index++) {
      const todo = res.data.todos[index];
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test/${todo._id}`
      );
    }
    res = await axios.get(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos-test`
    );
    console.log(res.data);
    return res.data;
  }
);

/* export const removeAllTodoAsync = createAsyncThunk(
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
); */

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: "all",
    activeList: "defaultList",
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
    changeActiveList: (state, action) => {
      state.activeList = action.payload;
    },
    /*     clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    }, */
  },
  extraReducers: {
    //get Todos
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;

      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },

    [getRemovedTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getRemovedTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;

      state.isLoading = false;
    },
    [getRemovedTodosAsync.rejected]: (state, action) => {
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
    //toggle complete todo
    [toggleCompleteTodoAsync.fulfilled]: (state, action) => {
      const { _id: id, completed } = action.payload;
      console.log(id);
      const index = state.items.findIndex((item) => item._id === id);
      console.log(state.items);
      state.items[index].completed = completed;
    },
    //toggle remove todo
    [toggleRemoveTodoAsync.fulfilled]: (state, action) => {
      const { _id: id } = action.payload;
      const filtered = state.items.filter((item) => item._id !== id);
      console.log(filtered);
      state.items = filtered;
    },
    // delete todo
    [deleteTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item._id !== id);
      state.items = filtered;
    },

    [removeCompletedTodoAsync.fulfilled]: (state) => {
      const filtered = state.items.filter((item) => !item.completed === true);
      state.items = filtered;
    },
    [clearAllRemovedTodoAsync.fulfilled]: (state) => {
      const filtered = state.items.filter((item) => !item.removed === true);
      state.items = filtered;
    },
  },
});
export const { changeActiveFilter, changeActiveList } = todoSlice.actions;
export const selectTodos = (state) => state.todos.items;
export const selectList = (state) => state.todos.activeList;
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
