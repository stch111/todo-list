import React from 'react';
import {
  Todo,
  TodoList,
  selectTodoLists,
  updateTodo,
} from '../redux/todoSlice';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

const todoListStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
};

const todoStyle = {
  display: 'flex',
  flexDirection: 'row' as 'row',
  gap: '20px',
};

const handleCheckboxClick = (
  todo: Todo,
  listId: string,
  dispatch: ThunkDispatch<
    {
      todos: TodoList[];
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>
) => {
  const updatedTodo = {
    ...todo,
    completed: !todo.completed,
  };
  dispatch(updateTodo({ listId: listId, todo: updatedTodo }));
};

function Todos() {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const lists = useAppSelector(selectTodoLists);
  const todoList = lists.find((list) => list.id === listId);
  return !listId || !todoList ? (
    <h2>No To-Do List selected</h2>
  ) : (
    <ul className="box" style={todoListStyle}>
      {todoList
        ? todoList.todos.map((todo) => (
            <div className="block" style={todoStyle} key={todo.id}>
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                onClick={() => handleCheckboxClick(todo, listId, dispatch)}
              />
              <div>{todo.text}</div>
            </div>
          ))
        : null}
    </ul>
  );
}

export default Todos;
