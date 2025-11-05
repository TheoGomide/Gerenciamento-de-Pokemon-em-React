import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/app/index.css'
import './shared/styles/Menu.css'

import Login from './app/Routes/Login.jsx'
import Menu from './app/Routes/Menu.jsx'
import Party from './app/Routes/Party.jsx'
import Saves from './app/Routes/Saves.jsx'
import Status from './app/Routes/Status.jsx'
import Computer from './app/Routes/Computer.jsx'
import Profile from './app/Routes/Profile.jsx'
import ProtectedRoute from './app/Routes/ProtectedRoute.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './app/App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/login', element: <Login /> },
      {
        path: 'Menu',
        element: (
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Party',
        element: (
          <ProtectedRoute>
            <Party />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Saves',
        element: (
          <ProtectedRoute>
            <Saves />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Status',
        element: (
          <ProtectedRoute>
            <Status />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Computer',
        element: (
          <ProtectedRoute>
            <Computer />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
