import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TodoList, addTodo } from '../redux/todoSlice';
import { useAppDispatch } from '../redux/hooks';
import { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

const formStyle = {
  display: 'flex',
  // TS does not like this as a string, which may not fall under the FlexDirection union
  flexDirection: 'row' as 'row',
  gap: '10px',
};

const createTodo = (
  listId: string,
  todoText: string,
  dispatch: ThunkDispatch<
    {
      todos: TodoList[];
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>
) => {
  dispatch(
    addTodo({
      listId: listId,
      todo: {
        id: uuidv4(),
        text: todoText,
        completed: false,
      },
    })
  );
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
          setTodoText('');
          createTodo(listId, todoText, dispatch);
        }}
      >
        Add
      </button>
    </form>
  );
}

export default NewTodoForm;
