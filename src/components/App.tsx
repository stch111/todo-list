import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NewTodoForm from './NewTodoForm';
import Todos from './Todos';
import { useEffect } from 'react';
import { getAll } from '../db/db';
import { populate } from '../redux/todoSlice';
import { useAppDispatch } from '../redux/hooks';

function App() {
  const dispatch = useAppDispatch();
  // On app start, retrieve data from db and refresh state
  useEffect(() => {
    (async () => {
      const data = await getAll();
      dispatch(populate(data));
    })();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="div-full-screen">
        <div className="div-contains-navbar">
          <Navbar />
        </div>
        <div className="div-contains-rest-of-screen columns">
          <div className="div-contains-sidebar column is-2 section">
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
