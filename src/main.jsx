import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './error-page';
import Contact from './routes/contact';
import FormDemo from './routes/form-demo';
import StudentAdd from './routes/student-management/student-add';
import StudentList from './routes/student-management/student-list';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
// import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import Root from './routes/root';
import "@arco-design/web-react/dist/css/arco.css";
import TeacherAdd from './routes/teacher-management/teacher-add';
import TeachertList from './routes/teacher-management/teacher-list';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children:[
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "student/management/add",
        element: <StudentAdd />
               
      },
      {
        path: "student/management/list",
        element: <StudentList />
               
      },
      {
        path: "teacher/management/add",
        element: <TeacherAdd />
               
      },
      {
        path: "teacher/management/list",
        element: <TeachertList />
               
      },
      {
        path:"form/demo",
        element:<FormDemo />,    
      },
      
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
