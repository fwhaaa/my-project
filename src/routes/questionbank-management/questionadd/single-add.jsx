import { useState, useContext } from 'react';
import { Form, Input, Button, Message } from '@arco-design/web-react';
import { IconPlus } from  '@arco-design/web-react/icon';
import { singleContext, singleDispatchContext } from '../globalContext'
import httpServer from '../../httpServer';
const FormItem = Form.Item;
  const  SingleAdd = () => {
  const multipledispatch = useContext(singleDispatchContext);
  const tasks =useContext(singleContext)
  const [ isSending, setIsSending ] = useState(false);
  const [ isSent, setIsSent ] = useState(false);
  const [ form ] =Form.useForm();
  const singleChoicetask = useContext(singleContext);

    function sendData(data) {
        return new Promise(resolve =>{
          setTimeout(resolve,2000);
        });
      }
    async function saveData(data){
      httpServer({
        url: '/teacher/addQuestion/singleChoice',
      }, JSON.parse(data))
      .then((res) => {
        let respData = res.data;

      })
      .catch((err) => {
        console.log('err',err);
      })
    }

  async function singlehandSubmit() {
    try {
      Message.loading({
        id: 'question_add',
        content: '正在添加' 
        });
      setIsSending(true);
      await multipledispatch({
        type: 'add',
        text: JSON.stringify(form.getFieldsValue())
      })
      await saveData(JSON.stringify(form.getFieldsValue()));   
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
      <FormItem field={'selectA'}  disabled={isSending} label='选项A' rules={[{ required: true }]} >
          <Input />  
        </FormItem>
        <FormItem field={'selectB'}  disabled={isSending} label='选项B' rules={[{ required: true }]} >
          <Input />
        </FormItem>
        <FormItem field={'selectC'}  disabled={isSending} label='选项C' rules={[{ required: true }]} >
          <Input />
        </FormItem>
        <FormItem field={'selectD'}  disabled={isSending} label='选项D' rules={[{ required: true }]} >
          <Input />
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          <Button disabled={isSending} loading={isSending} type='primary'  onClick={singlehandSubmit}   icon={<IconPlus /> } >提交</Button>
        </FormItem> 
      </Form>
    </div>
  );
}
export default SingleAdd;