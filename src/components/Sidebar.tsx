import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { populate, selectTodoLists } from '../redux/todoSlice';
import { db, getAll } from '../db/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [newTodoListName, setNewTodoListName] = useState('');
  const todos = useAppSelector(selectTodoLists);
  const dispatch = useAppDispatch();

  const handleNewTodoList = async (newTodoListName: string) => {
    try {
      await db.todoLists.add({ name: newTodoListName });
      const data = await getAll();
      dispatch(populate(data));
      setNewTodoListName('');
    } catch (e) {
      if (typeof e === 'string') {
        console.log(e.toUpperCase());
      } else if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  return (
    <aside className="menu container is-primary">
      <ul className="menu-list">
        {todos.map((list) => (
          <li key={list.id}>
            <Link to={`/todo-list/${list.id}`}>{list.name}</Link>
          </li>
        ))}
      </ul>
      <hr
        className="solid"
        style={{
          borderTop: '1px solid #bbb',
        }}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newTodoListName.trim() !== '') {
            handleNewTodoList(newTodoListName);
          }
        }}
        className="is-flex is-flex-direction-column is-align-items-center"
      >
        <input
          type="text"
          className="input"
          placeholder="Add New To-Do List"
          value={newTodoListName}
          onChange={(e) => {
            setNewTodoListName(e.target.value);
          }}
        />
        <button type="submit" className="button m-4">
          Add
        </button>
      </form>
    </aside>
  );
}

export default Sidebar;
