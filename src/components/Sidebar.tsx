import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectTodoLists } from '../redux/todoSlice';

function Sidebar() {
  const todos = useAppSelector(selectTodoLists);
  return (
    <aside className="menu container is-primary">
      <ul className="menu-list">
        {todos.map((list) => (
          <li key={list.id}>
            <Link to={`/todo-list/${list.id}`}>{list.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
