import React, { useEffect, useRef, useState } from 'react';
import { populate, selectTodoLists } from '../../redux/todoSlice';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { db, getAll } from '../../db/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCancel,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import OptionsMenu from '../OptionsMenu';

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
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [showOptions, setShowOptions] = useState(false);
  const [editingTodo, setEditingTodo] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [todoNewText, setTodoNewText] = useState('');

  // Check that there's a parameter called listId
  if (!params.listId) {
    return <h2>Error getting To-Do List ID from parameters.</h2>;
  }

  // Check to make sure listId parameter is a valid number
  const listId = parseInt(params.listId);
  if (Number.isNaN(listId)) {
    return <h2>Invalid To-Do List ID from parameters.</h2>;
  }

  // ListId is a number. Make sure that it lines up with a todo list in the database
  const todoList = lists.find((list) => list.id === listId);
  if (!todoList) {
    return <h2>No To-Do List could be found for the given ID.</h2>;
  }

  // Update when checked/unchecked
  const handleCheckboxClick = async (checked: boolean, id: number) => {
    await db.todos.update(id, { completed: checked });
    const data = await getAll();
    dispatch(populate(data));
  };

  // Click event listener while text input for a todo is active
  // We want to stop editing when the user clicks off of the element
  const todoInputClickListener = async (e: MouseEvent) => {
    if (e.target !== document.getElementById(`todo-rename-${editingTodoId}`)) {
      updateTodo();
    }
  };

  const updateTodo = async () => {
    const res = await db.todos.update(editingTodoId as number, {
      text: todoNewText,
    });
    console.log(res);
    const data = await getAll();
    dispatch(populate(data));
    setEditingTodo(false);
  };

  return (
    <>
      <ul className="box" style={todoListStyle}>
        {/* Make sure todo list exists before rendering */}
        {todoList
          ? todoList.todos.map((todo) => (
              <div className="block level" style={todoStyle} key={todo.id}>
                <input
                  type="checkbox"
                  defaultChecked={todo.completed}
                  onChange={(e) => {
                    handleCheckboxClick(e.target.checked, todo.id);
                  }}
                  style={{ flexGrow: 0 }}
                />
                {/* Show an input when editing. Text otherwise */}
                {editingTodo && editingTodoId && editingTodoId === todo.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateTodo();
                    }}
                    style={{ flexGrow: 1 }}
                  >
                    <input
                      type="text"
                      className="input"
                      /* We will id these so that we can determine in a separate event listener when the user has clicked off of them */
                      id={`todo-rename-${todo.id}`}
                      value={todoNewText}
                      onChange={(e) => {
                        setTodoNewText(e.target.value);
                      }}
                    />
                  </form>
                ) : (
                  <div style={{ flexGrow: 1 }}>{todo.text}</div>
                )}
                {editingTodo && todo.id === editingTodoId ? (
                  <span
                    className="icon clickable-icon"
                    onClick={() => setEditingTodo(false)}
                  >
                    <FontAwesomeIcon icon={faCancel} />
                  </span>
                ) : (
                  <span
                    className="icon clickable-icon"
                    onClick={(e) => {
                      if (!editingTodo) {
                        setCoordinates({
                          x: e.currentTarget.offsetLeft,
                          y: e.currentTarget.offsetTop,
                        });
                        setEditingTodoId(todo.id);
                        setTodoNewText(todo.text);
                        setShowOptions(true);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </span>
                )}
              </div>
            ))
          : null}
      </ul>
      {/* This is a menu popup that'll show up where the user clicked on the menu ellipsis to the right */}
      {showOptions ? (
        <OptionsMenu
          renameCallback={() => {
            // Start editing todo
            setEditingTodo(true);
            // Add listener for user clicking off of the todo input
            //document.addEventListener('mouseup', todoInputClickListener);
          }}
          deleteCallback={async () => {
            if (editingTodoId) {
              await db.todos.delete(editingTodoId);
              const data = await getAll();
              dispatch(populate(data));
            }
          }}
          closeMenuCallback={() => {
            setShowOptions(false);
          }}
          coordinates={{
            x:
              coordinates.x < window.innerWidth / 2
                ? coordinates.x
                : coordinates.x - 120,
            y:
              coordinates.y < window.innerHeight / 2
                ? coordinates.y
                : coordinates.y - 112,
          }}
        />
      ) : null}
    </>
  );
}

export default Todos;
