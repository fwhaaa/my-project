import { useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import { multipleContext, multipleDispatchContext, singleContext, singleDispatchContext,judgeContext,judgeDispatchContext } from './globalContext';

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

const judge = [
  {
    stem: '2+2=4',

  },
  {
    stem: '2+2+4=9',

  }
];




export default function  QuestionBankMangementIndex(){
  const [ multipleChoicetask, multipledispatch ] = useReducer(multipleChoiceTaskReducer,multipleChoice);
  function multipleChoiceTaskReducer(multipleChoicetask, action){
    switch (action.type){
      case 'add':{
        return [ ...multipleChoicetask, JSON.parse(action.text) ];
      }
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

  
  

  return (
    <multipleContext.Provider value={multipleChoicetask}>
      <singleContext.Provider value={singleChoicetask}>
      <judgeContext.Provider value={judgetask}>
        <multipleDispatchContext.Provider value={multipledispatch}>
         <singleDispatchContext.Provider value={singledispatch}>
          <judgeDispatchContext.Provider value={judgedispatch}>
          <Outlet></Outlet>
          </judgeDispatchContext.Provider>
         </singleDispatchContext.Provider>
        </multipleDispatchContext.Provider>
        </judgeContext.Provider>
      </singleContext.Provider>
    </multipleContext.Provider>
  )
}


