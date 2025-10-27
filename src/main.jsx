import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/app/index.css';

import Login from './app/Routes/Login.jsx';
import Menu from './app/Routes/Menu.jsx';
import Party from './app/Routes/Party.jsx';
import Saves from './app/Routes/Saves.jsx';
import Status from './app/Routes/Status.jsx';
import Computer from './app/Routes/Computer.jsx';
import Profile from './app/Routes/Profile.jsx';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './app/App.jsx';

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
      },
      {
        path: 'Profile', 
        element: <Profile />,
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
