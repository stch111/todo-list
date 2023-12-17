import React from 'react';
import { TodoList, selectTodoLists } from '../redux/todoSlice';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

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
  const { listId } = useParams();
  const lists = useAppSelector(selectTodoLists);
  const todoList = lists.find((list) => list.id === listId);
  return !todoList ? (
    <h2>No To-Do List selected</h2>
  ) : (
    <ul className="box" style={todoListStyle}>
      {todoList
        ? todoList.todos.map((todo) => (
            <div style={todoStyle}>
              <input type="checkbox" checked={todo.completed} />
              <div>{todo.text}</div>
            </div>
          ))
        : null}
    </ul>
  );
}

export default Todos;
