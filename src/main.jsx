import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Login from './Routes/Login.jsx';
import Menu from './Routes/Menu.jsx';
import Party from './Routes/Party.jsx';
import Saves from './Routes/Saves.jsx';
import Status from './Routes/Status.jsx';
import Computer from './Routes/Computer.jsx';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "Menu",
        element: <Menu />
      },
      {
        path: "Party",
        element: <Party />
      },
      {
        path: "Saves",
        element: <Saves />
      },
      {
        path: "Status",
        element: <Status />
      },
      {
        path: "Computer",
        element: <Computer />
      }

    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
