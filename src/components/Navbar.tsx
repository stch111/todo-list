import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar is-dark">
      <div className="navbar-brand">
        <Link className="navbar-item" to={'/'}>
          <h1 className="title has-text-light">To-Do List</h1>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
