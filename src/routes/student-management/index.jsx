import { useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import { globalContext, globalDispatchContext } from './globalContext';

const initialTasks= [
  {
    id: '1',
    StudentName: 'Jane Doe',
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    id: '2',
    StudentName: 'Alisa Ross',
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    id: '3',
    StudentName: 'Kevin Sandra',
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    id: '4',
    StudentName: 'Ed Hellen',
    address: '42 Park Road, London',  
    email: 'ed.hellen@example.com',
  },
  {
    id: '5',
    StudentName: 'William Smith',
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];




export default function  StudentMangementIndex(){
  const [ tasks, dispatch ] = useReducer(tasksReducer, initialTasks);
  function tasksReducer(tasks, action){
    switch (action.type){
      case 'add':{
        return [ ...tasks, JSON.parse(action.text) ];
      }
      
      case 'change':{
        return tasks.map(t =>{
          if (t.id === action.task.id){
            return action.task;
          } else {
            return t;
          }
        });
      }
      case 'delete': {
         return tasks.filter(t => t.id!== action.id)
      }
      default: {
        throw Error('Unknow action ' + action.type)
      }
    }
  }

  return (
    <globalContext.Provider value={tasks}>
        <globalDispatchContext.Provider value={dispatch}>
          <Outlet></Outlet>
        </globalDispatchContext.Provider>
    </globalContext.Provider>
  )
}


