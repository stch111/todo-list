import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { TodoList } from '../db/interfaces';
import { db, getAll } from '../db/db';
import { populate } from '../redux/todoSlice';

const formStyle = {
  display: 'flex',
  // TS does not like this as a string, which may not fall under the FlexDirection union
  flexDirection: 'row' as 'row',
  gap: '10px',
};

const handleTextChange = (
  text: string,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  setState(text);
};

function NewTodoForm() {
  const dispatch = useAppDispatch();
  const [todoText, setTodoText] = useState('');
  const { listId } = useParams();

  const createTodo = async () => {
    setTodoText('');
    db.todos.add({
      todoListId: parseInt(listId!),
      text: todoText,
      completed: false,
    });
    const data = await getAll();
    dispatch(populate(data));
  };

  return !listId ? null : (
    <form className="box" style={formStyle}>
      <input
        type="text"
        className="input"
        placeholder="Add a new To-Do"
        value={todoText}
        onChange={(e) => handleTextChange(e.target.value, setTodoText)}
      />
      <button
        className="button is-primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          createTodo();
        }}
      >
        Add
      </button>
    </form>
  );
}

export default NewTodoForm;
