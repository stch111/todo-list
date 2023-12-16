import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bulma/css/bulma.css';
import './styling/style.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="div-full-screen">
      <div className="div-contains-navbar">
        <Navbar />
      </div>
      <div className="div-contains-rest-of-screen columns">
        <div className="column is-2 section">
          <Sidebar />
        </div>
        <div className="section container column is-10">
          <div>To Dos</div>
        </div>
      </div>
    </div>
  </React.StrictMode>
);
