import { useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import { multipleContext, multipleDispatchContext, singleContext, singleDispatchContext,judgeContext,judgeDispatchContext,saqContext,saqDispatchContext } from './globalContext';



const judge = [
  {
    stem: '2+2=4',

  },
  {
    stem: '2+2+4=9',

  }
];

const saq = [
  {
    stem: '111-1111=',

  },
  {
    stem: '3+4+43+2=',

  }
];



export default function  QuestionBankMangementIndex(){

  const [ judgetask, judgedispatch ] = useReducer(judgeTaskReducer,judge);
  function judgeTaskReducer(judgetask, action){
    switch (action.type){
      case 'add':{
        return [ ...judgetask, JSON.parse(action.text) ];
      }
      
      case 'delete': {
         return judgetask.filter(t => t.stem !== action.id)
      }

      case 'edit': {
        return judgetask.map(t => {
          if (t.stem  === JSON.parse(action.text).stem){
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

  const [ saqtask, saqdispatch ] = useReducer(saqTaskReducer,saq);
  function saqTaskReducer(saqtask, action){
    switch (action.type){
      case 'add':{
        return [ ...saqtask, JSON.parse(action.text) ];
      }
      
      case 'delete': {
         return saqtask.filter(t => t.stem !== action.id)
      }

      case 'edit': {
        return saqtask.map(t => {
          if (t.stem  === JSON.parse(action.text).stem){
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

      <judgeContext.Provider value={judgetask}>
        <saqContext.Provider value={saqtask}>

          <judgeDispatchContext.Provider value={judgedispatch}>
          <saqDispatchContext.Provider value={saqdispatch}>
          <Outlet></Outlet>
          </saqDispatchContext.Provider>
          </judgeDispatchContext.Provider>
        </saqContext.Provider>
        </judgeContext.Provider>

  )
}


