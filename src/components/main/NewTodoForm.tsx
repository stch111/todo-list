import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { db, getAll } from '../../db/db';
import { populate, selectTodoLists } from '../../redux/todoSlice';

import '../../style/NewTodoForm.css';

const handleTextChange = (
  text: string,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  setState(text);
};

function NewTodoForm() {
  const dispatch = useAppDispatch();
  const [todoText, setTodoText] = useState('');
  const listId = useLoaderData() as number;
  const listExists = useAppSelector(selectTodoLists).find(
    (list) => list.id === listId
  );

  const createTodo = async () => {
    setTodoText('');
    db.todos.add({
      todoListId: listId!,
      text: todoText,
      completed: false,
    });
    const data = await getAll();
    dispatch(populate(data));
  };

  return isNaN(listId) || !listExists ? null : (
    <form className="box new-todo-form">
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
