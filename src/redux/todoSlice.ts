import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Todo {
  id: string; //Guid
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: string; //Guid
  name: string;
  todos: Todo[];
}

const initialState: TodoList[] = [];

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    populate: (_state, action: PayloadAction<TodoList[]>) => action.payload,
    addList: (state, action: PayloadAction<TodoList>) =>
      state.concat(action.payload),
    deleteList: (state, action: PayloadAction<string>) =>
      state.filter((list) => list.id !== action.payload),
    renameList: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const { id, name } = action.payload;
      const listToRename = state.find((list) => list.id === id);
      if (listToRename !== undefined) {
        listToRename.name = name;
      }
    },
    addTodo: (state, action: PayloadAction<{ listId: string; todo: Todo }>) => {
      const { listId, todo } = action.payload;
      const listToAddTo = state.find((list) => list.id === listId);
      if (listToAddTo !== undefined) {
        listToAddTo.todos = listToAddTo.todos.concat(todo);
      }
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ listId: string; todoId: string }>
    ) => {
      const { listId, todoId } = action.payload;
      const listToDeleteFrom = state.find((list) => list.id === listId);
      if (listToDeleteFrom !== undefined) {
        listToDeleteFrom.todos = listToDeleteFrom.todos.filter(
          (todo) => todo.id !== todoId
        );
      }
    },
    updateTodo: (
      state,
      action: PayloadAction<{ listId: string; todo: Todo }>
    ) => {
      const { listId, todo } = action.payload;
      const listToUpdateTodo = state.find((list) => list.id === listId);
      // Check that Todo List exists
      if (listToUpdateTodo !== undefined) {
        const todoToUpdate = listToUpdateTodo.todos.find(
          (t) => (t.id = todo.id)
        );
        // Check that Todo exists
        if (todoToUpdate !== undefined) {
          // Update
          todoToUpdate.text = todo.text;
          todoToUpdate.completed = todo.completed;
        }
      }
    },
  },
});

export const {
  populate,
  addList,
  deleteList,
  renameList,
  addTodo,
  deleteTodo,
  updateTodo,
} = todoSlice.actions;

export const selectCount = (state: RootState) => state;
export default todoSlice.reducer;
