import React from 'react';
import { selectTodoLists } from '../redux/todoSlice';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { Todo, TodoList } from '../db/interfaces';

const todoListStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
};

const todoStyle = {
  display: 'flex',
  flexDirection: 'row' as 'row',
  gap: '20px',
};

function Todos() {
  const dispatch = useDispatch();
  const params = useParams();
  const lists = useAppSelector(selectTodoLists);

  // Check that there's a parameter called listId
  if (!params.listId) {
    return <h2>Error getting To-Do List ID from parameters.</h2>;
  }

  // Check to make sure listId parameter is a valid number
  const listId = parseInt(params.listId);
  if (Number.isNaN(listId)) {
    return <h2>Invalid To-Do List ID from parameters.</h2>;
  }

  const todoList = lists.find((list) => list.id === listId);
  if (!todoList) {
    return <h2>No To-Do List could be found for the given ID.</h2>;
  }

  return (
    <ul className="box" style={todoListStyle}>
      {todoList
        ? todoList.todos.map((todo) => (
            <div className="block" style={todoStyle} key={todo.id}>
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                onClick={() => {}}
              />
              <div>{todo.text}</div>
            </div>
          ))
        : null}
    </ul>
  );
}

export default Todos;
