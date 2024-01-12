import { useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import { multipleContext, multipleDispatchContext, singleContext, singleDispatchContext } from './globalContext';

const multipleChoice= [
  {
    stem: '3+3=',
    selectA: '1',
    selectB: '2',
    selectC: '3',
    selectD: '4',
  },
  {
    stem: '3+3+4=',
    selectA: '1',
    selectB: '2',
    selectC: '3',
    selectD: '4',
  }
];

const singleChoice= [
  {
    stem: '2+2=',
    selectA: '1',
    selectB: '2',
    selectC: '3',
    selectD: '4',
  },
  {
    stem: '2+2+4=',
    selectA: '12',
    selectB: '21',
    selectC: '32',
    selectD: '41',
  }
];




export default function  QuesionBankMangementIndex(){
  const [ multipleChoicetask, multipledispatch ] = useReducer(multipleChoiceTaskReducer,multipleChoice);
  function multipleChoiceTaskReducer(multipleChoicetask, action){
    switch (action.type){
      case 'delete': {
         return multipleChoicetask.filter(t => t.stem !== action.id)
      }

      case 'edit': { 
        return multipleChoicetask.map(t => {
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

  const [ singleChoicetask, singledispatch ] = useReducer(singleChoiceTaskReducer,singleChoice);
  function singleChoiceTaskReducer(singleChoicetask, action){
    switch (action.type){
      case 'add':{
        return [ ...singleChoicetask, JSON.parse(action.text) ];
      }
      
      case 'delete': {
         return singleChoicetask.filter(t => t.stem !== action.id)
      }

      case 'edit': {
        return singleChoicetask.map(t => {
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
    <multipleContext.Provider value={multipleChoicetask}>
      <singleContext.Provider value={singleChoicetask}>
        <multipleDispatchContext.Provider value={multipledispatch}>
         <singleDispatchContext.Provider value={singledispatch}>
          <Outlet></Outlet>
         </singleDispatchContext.Provider>
        </multipleDispatchContext.Provider>
      </singleContext.Provider>
    </multipleContext.Provider>
  )
}


