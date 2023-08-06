import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import 'primeicons/primeicons.css';
import "./styleSheets/bootstrap-grid.min.css"
import './styleSheets/index.css'
import './styleSheets/App.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Dashboard from './pages/Dashboard';
import Visitantes from "./pages/visitantes";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: [
      {
        path: "visitantes",
        element: <Visitantes/>,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)