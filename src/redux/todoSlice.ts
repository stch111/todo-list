import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Todo, TodoList } from '../db/interfaces';
import { db } from '../db/db';

// const initialState: TodoList[] = [
//   {
//     id: 1,
//     name: 'List 1',
//     todos: [
//       {
//         id: 1,
//         text: 'Take out the garbage',
//         completed: false,
//       },
//       {
//         id: 2,
//         text: 'Oil change',
//         completed: true,
//       },
//       {
//         id: 3,
//         text: 'Wash dishes',
//         completed: true,
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'List 2',
//     todos: [],
//   },
//   {
//     id: 3,
//     name: 'List 3',
//     todos: [],
//   },
// ];

const initialState: TodoList[] = [];

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    populate: (_state, action: PayloadAction<TodoList[]>) => action.payload,
  },
});

export const { populate } = todoSlice.actions;

export const selectTodoLists = (state: RootState) => state.todos;
export default todoSlice.reducer;
