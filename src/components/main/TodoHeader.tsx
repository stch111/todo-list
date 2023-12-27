import React, { useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faCancel,
  faDeleteLeft,
  faX,
} from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from '../../redux/hooks';
import { populate, selectTodoLists } from '../../redux/todoSlice';
import OptionsMenu from '../OptionsMenu';
import '../../style/TodoHeader.css';
import { db, getAll } from '../../db/db';
import { useDispatch } from 'react-redux';

function TodoHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const listId = useLoaderData() as number;
  const todoLists = useAppSelector(selectTodoLists);

  const list = todoLists.find((l) => l.id === listId);
  const [listName, setListName] = useState(!list ? '' : list.name);

  useEffect(() => {
    setListName(!list ? '' : list.name);
  }, [listId, list]);

  const deleteThisTodoList = async () => {
    await db.todoLists.delete(listId);
    navigate('/');
    const data = await getAll();
    dispatch(populate(data));
    setShowDeleteModal(false);
  };

  // Do not render if list doesn't exist
  if (!list) {
    return null;
  }

  if (editing) {
    return (
      <div className="level box todo-header">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await db.todoLists.update(listId, { name: listName });
            const data = await getAll();
            dispatch(populate(data));
            setEditing(false);
          }}
          className="level-item"
          style={{ flexGrow: 1 }}
        >
          <input
            type="text"
            className="input"
            value={listName}
            onChange={(e) => {
              setListName(e.target.value);
            }}
          />
        </form>
        <span
          className="icon clickable-icon level-item mx-2"
          onClick={() => {
            // Reset input text
            setListName(list!.name);
            // Cancel editing
            setEditing(false);
          }}
          style={{ flexGrow: 0 }}
        >
          <FontAwesomeIcon icon={faCancel} />
        </span>
      </div>
    );
  } else {
    return (
      <div className="level box todo-header">
        <h1 className="title">{list?.name}</h1>
        <span
          className="icon clickable-icon"
          onClick={(e) => {
            setCoordinates({
              x: e.currentTarget.offsetLeft,
              y: e.currentTarget.offsetTop,
            });
            setShowOptions(true);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
          {showOptions ? (
            <OptionsMenu
              renameCallback={() => {
                setEditing(!editing);
              }}
              deleteCallback={() => {
                setShowDeleteModal(true);
              }}
              closeMenuCallback={() => {
                setShowOptions(false);
              }}
              coordinates={
                coordinates
                  ? {
                      x:
                        coordinates.x < window.innerWidth / 2
                          ? coordinates.x
                          : coordinates.x - 120,
                      y:
                        coordinates.y < window.innerHeight / 2
                          ? coordinates.y
                          : coordinates.y - 112,
                    }
                  : { x: 0, y: 0 }
              }
            />
          ) : null}
        </span>
        <div className={`modal ${showDeleteModal ? 'is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-content has-background-light">
            <div className="box">
              <div className="level">
                <div className="level-left">
                  <h2 className="title">Confirm Deletion</h2>
                </div>
                <div className="level-right">
                  <span className="icon clickable-icon">
                    <FontAwesomeIcon
                      icon={faX}
                      onClick={() => {
                        setShowDeleteModal(false);
                      }}
                    />
                  </span>
                </div>
              </div>

              <p>Are you sure you want to delete to-do list "{list!.name}"?</p>
              <br />
              <div className="is-flex is-justify-content-flex-end">
                <button
                  className="button mr-4"
                  onClick={() => {
                    deleteThisTodoList();
                  }}
                >
                  Confirm
                </button>
                <button
                  className="button mr-4"
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoHeader;
