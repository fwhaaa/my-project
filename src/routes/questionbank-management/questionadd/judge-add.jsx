import { useState, useContext } from 'react';
import { Form, Input, Button, Message } from '@arco-design/web-react';
import { IconPlus } from  '@arco-design/web-react/icon';
import {judgeContext, judgeDispatchContext } from '../globalContext'

const FormItem = Form.Item;
  const JudgeAdd = () => {
  const judgedispatch = useContext(judgeDispatchContext);
  const task =useContext(judgeContext)
  const [ isSending, setIsSending ] = useState(false);
  const [ isSent, setIsSent ] = useState(false);
  const [ form ] =Form.useForm();


    function sendData(data) {
        return new Promise(resolve =>{
          setTimeout(resolve,2000);
        });
      }

 

  async function handSubmit() {
    try {
      await form.validate();
      const isExist = task.some((v)=>v.stem === form.getFieldValue('stem') );
      if(isExist){
        Message.error('题目重复');
        return;
      }
      Message.loading({
        id: 'question_add',
        content: '正在添加' 
        });
      setIsSending(true);
      await judgedispatch ({
        type: 'add',
        text: JSON.stringify(form.getFieldsValue())
      })   
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
      id: 'question_add',
      content: '添加成功!',
    })
    setIsSent(false);
  }
  return (
    <div>
      <Form form={form} style={{ maxWidth:'600px' , padding: '20px', minWidth:'280px'  }} autoComplete='off'>
      <FormItem field={'stem'}  disabled={isSending} label='题干' rules={[{ required: true }]} >
      <Input />  
      </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          <Button disabled={isSending} loading={isSending} type='primary'  onClick={handSubmit}   icon={<IconPlus /> } >提交</Button>
        </FormItem> 
      </Form>
    </div>
  );
}
export default JudgeAdd;