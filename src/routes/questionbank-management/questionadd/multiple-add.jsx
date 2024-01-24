import { useState } from 'react';
import { Form, Input, Button, Message, Select} from '@arco-design/web-react';
import { IconPlus } from  '@arco-design/web-react/icon';

import httpServer from '../../httpServer';
const options = ['math', 'english'];
const Option = Select.Option;
const FormItem = Form.Item;
  const  MultipleAdd = () => {
  const [ isSending, setIsSending ] = useState(false);
  const [ isSent, setIsSent ] = useState(false);
  const [ form ] =Form.useForm();
    function sendData(data) {
        return new Promise(resolve =>{
          setTimeout(resolve,2000);
        });
      }
    
    async function saveData(data){
      httpServer({
        url: '/question/addQuestion/multipleChoice',
      }, JSON.parse(data))
      .then((res) => {
        let respData = res.data;
      })
      .catch((err) => {
        console.log('err',err);
      })
    }

 

    async function handSubmit() {
      try {
        Message.loading({
          id: 'question_add',
          content: '正在添加' 
          });
        setIsSending(true);
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
      <FormItem field={'subject'}  disabled={isSending} label='科目' rules={[{ required: true }]} >
      <Select
        placeholder='Please select'
      >
        {options.map((option) => (
          <Option key={option} disabled={isSending} value={option}>
            {option}
          </Option>
        ))}
      </Select>
      </FormItem>
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
          <Button disabled={isSending} loading={isSending} type='primary'  onClick={handSubmit}   icon={<IconPlus /> } >提交</Button>
        </FormItem> 
      </Form>
    </div>
  );
}
export default MultipleAdd;