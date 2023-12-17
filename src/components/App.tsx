import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NewTodoForm from './NewTodoForm';
import Todos from './Todos';

function App() {
  return (
    <BrowserRouter>
      <div className="div-full-screen">
        <div className="div-contains-navbar">
          <Navbar />
        </div>
        <div className="div-contains-rest-of-screen columns">
          <div className="column is-2 section">
            <Sidebar />
          </div>
          <div className="div-todos-section section container column is-10">
            <Routes>
              <Route path="/" element={<div>Hello world!</div>} />
              <Route path="/todo-list" element={<div>Hello world!</div>} />
              <Route
                path="/todo-list/:listId"
                element={
                  <div>
                    <NewTodoForm />
                    <Todos />
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
