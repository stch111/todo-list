import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar is-dark">
      <div className="navbar-brand">
        <Link className="navbar-item" to={'/'}>
          To-Do List
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
