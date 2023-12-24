import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { populate, selectTodoLists } from '../redux/todoSlice';
import { db, getAll } from '../db/db';

const sidebarDividerStyle = {
  borderTop: '1px solid #bbb',
};

const newTodoListInputStyle = {
  display: 'flex',
  flexDirection: 'row' as 'row',
};

const handleNewTodoList = async (newTodoListName: string, dispatch: any) => {
  try {
    await db.todoLists.add({ name: newTodoListName });
    const data = await getAll();
    dispatch(populate(data));
  } catch (e) {
    if (typeof e === 'string') {
      console.log(e.toUpperCase());
    } else if (e instanceof Error) {
      console.log(e.message);
    }
  }
};

function Sidebar() {
  const [newTodoListName, setNewTodoListName] = useState('');
  const todos = useAppSelector(selectTodoLists);
  const dispatch = useAppDispatch();
  return (
    <aside className="menu container is-primary">
      <ul className="menu-list">
        {todos.map((list) => (
          <li key={list.id}>
            <Link to={`/todo-list/${list.id}`}>{list.name}</Link>
          </li>
        ))}
      </ul>
      <hr className="solid" style={sidebarDividerStyle} />
      <form style={newTodoListInputStyle}>
        <input
          type="text"
          className="input"
          placeholder="Add New To-Do List"
          value={newTodoListName}
          onChange={(e) => {
            setNewTodoListName(e.target.value);
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleNewTodoList(newTodoListName, dispatch);
          }}
        />
        <button
          type="submit"
          className="button"
          onClick={(e) => {
            e.preventDefault();
            handleNewTodoList(newTodoListName, dispatch);
          }}
        >
          +
        </button>
      </form>
    </aside>
  );
}

export default Sidebar;
