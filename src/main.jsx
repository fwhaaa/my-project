import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './error-page';
import Contact from './routes/contact';
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
import StudentMangementIndex from './routes/student-management';
import TeacherMangementIndex from './routes/teacher-management';
import QuestionAdd from './routes/questionbank-management/question-add';
import QuesionBankMangementIndex from './routes/questionbank-management';
import QuestionBankList from './routes/questionbank-management/questionbank-list';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "student/management",
        element: <StudentMangementIndex />,
        children:[ 
          {
            path: "add",
            element: <StudentAdd />,
          },
          {
            path: "list",
            element: <StudentList />
          },

        ]
               
      },
      {
        path: "teacher/management",
        element: <TeacherMangementIndex />,
        children:[ 
          {
            path: "add",
            element: <TeacherAdd />,
          },
          {
            path: "list",
            element: <TeachertList />
          },
        ]
      },
      {
        path: "questionbank/management",
        element: <QuesionBankMangementIndex/>,
        children:[ 
          {
            path: "add",
            element: <QuestionAdd />,
          },
          {
            path: "list",
            element: <QuestionBankList />
          },
        ]
      },
      
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
