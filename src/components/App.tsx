import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NewTodoForm from './main/NewTodoForm';
import Todos from './main/Todos';
import { useEffect } from 'react';
import { getAll } from '../db/db';
import { populate } from '../redux/todoSlice';
import { useAppDispatch } from '../redux/hooks';
import TodoHeader from './main/TodoHeader';
import '../style/style.css';

const router = createBrowserRouter([
  {
    element: (
      <div className="div-full-screen">
        <div className="div-contains-navbar">
          <Navbar />
        </div>
        <div className="div-contains-rest-of-screen columns m-0">
          <div className="div-contains-sidebar column is-2 section">
            <Sidebar />
          </div>
          <div className="div-todos-section section container column is-10">
            <Outlet />
          </div>
        </div>
      </div>
    ),
    children: [
      {
        path: '/',
        element: (
          <div className="box">
            <h1 className="title">Hello world!</h1> <br />
            <h2 className="subtitle">
              Please select a to-do list on the left or create a new one.
            </h2>
          </div>
        ),
      },
      {
        path: '/todo-list/',
        element: (
          <div className="box">
            <h1 className="title">Hello world!</h1> <br />
            <h2 className="subtitle">
              Please select a to-do list on the left or create a new one.
            </h2>
          </div>
        ),
      },
      {
        path: 'todo-list/:listId',
        loader: ({ params }) => {
          return params.listId ? parseInt(params.listId) : NaN;
        },
        element: (
          <div>
            <TodoHeader />
            <NewTodoForm />
            <Todos />
          </div>
        ),
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();
  // On app start, retrieve data from db and refresh state
  useEffect(() => {
    (async () => {
      const data = await getAll();
      dispatch(populate(data));
    })();
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
