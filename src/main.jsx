import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './error-page';
import Contact from './routes/contact';
import FormDemo from './routes/form-demo';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import "@arco-design/web-react/dist/css/arco.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children:[
      {
        path:"contacts/:contactId",
        element:<Contact />,
      },
      {
        path:"form/demo",
        element:<FormDemo />,    
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
