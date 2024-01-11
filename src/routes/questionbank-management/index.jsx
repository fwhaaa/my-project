import { useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import { globalContext, globalDispatchContext } from './globalContext';

const multipleChoice= [
  {
    stem: '1+1=',
    selectA: '1',
    selectB: '2',
    selectC: '3',
    selectD: '4',
  }
];




export default function  QuesionBankMangementIndex(){
  const [ tasks, dispatch ] = useReducer(tasksReducer,multipleChoice);
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
         return tasks.filter(t => t.id!== action.stem)
      }

      case 'edit': {
        return tasks.map(t => {
          if (t.stem === JSON.parse(action.text).stem){
            return JSON.parse(action.text);
          }else{
            return t;
          }
        })
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


