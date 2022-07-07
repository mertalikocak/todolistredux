import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: "1",
        title: "Learn React",
        completed: true,
      },
      { id: "2", title: "Read a book", completed: false },
    ],
  },
  reducer: {},
});

export default todoSlice.reducer;
