import { useState } from 'react';
import {  Message  } from '@arco-design/web-react';
import httpServer from '../routes/httpServer';

const useAddForm= ({form,url}) => {

  const [ isSending, setIsSending ] = useState(false);
  const [ isSent, setIsSent ] = useState(false);
  async function saveData(data){
    httpServer({
      url,
    }, JSON.parse(data))
    .then((res) => {
    })
    .catch((err) => {
      console.log('err',err);
    })
  }
  function sendData() {
    return new Promise(resolve =>{
      setTimeout(resolve,2000);
    });
  }

  async function handSubmit() {
    try {
      await form.validate();
      Message.loading({
        id: 'add',
        content: '正在添加' 
        });
      setIsSending(true);
      await saveData(JSON.stringify(form.getFieldsValue()))
      await sendData(JSON.stringify(form.getFieldsValue()));
      setIsSending(false);
      setIsSent(true);
    } catch (e) {
      Message.error('校验失败');
      console.log(e);
    }
  }
  if (isSent) {
    Message.success({
      id: 'add',
      content: '添加成功!',
    })
    setIsSent(false);
  }
  return {isSending, handSubmit};
}
export default useAddForm;
