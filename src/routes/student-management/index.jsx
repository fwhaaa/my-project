import { Form, Input, Button, Checkbox } from '@arco-design/web-react';
import { useReducer, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { globalContext, globalDispatchContext } from '../../globalContext';

function tasksReducer(tasks, action){

}
const initialTasks= [
    {
      id: '1',
      StudentName: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      id: '2',
      StudentName: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      id: '3',
      StudentName: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      id: '4',
      StudentName: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',  
      email: 'ed.hellen@example.com',
    },
    {
      id: '5',
      StudentName: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
   
  
  
  ];
export default function  StudentMangementIndex(){
const [ tasks, dispatch ] = useReducer(tasksReducer, initialTasks);
 return(
    <globalContext.Provider value={tasks}>
        <globalDispatchContext.Provider value={dispatch}>
         <Outlet></Outlet>
        </globalDispatchContext.Provider>
    </globalContext.Provider>
 )
}



