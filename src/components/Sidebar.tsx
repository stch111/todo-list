import React from 'react';
import { TodoList } from '../redux/todoSlice';
import { useAppSelector } from '../redux/hooks';
import { selectTodoLists } from '../redux/todoSlice';

function Sidebar() {
  const todos = useAppSelector(selectTodoLists);
  return (
    <aside className="menu container is-primary">
      <ul className="menu-list">
        {todos.map((list) => (
          <li key={list.id}>
            <a>{list.name}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
