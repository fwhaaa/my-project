import { useReducer, useState } from 'react';
import { Form, Input, Button, Message } from '@arco-design/web-react';
import { IconPlus } from  '@arco-design/web-react/icon';


const FormItem = Form.Item;
const StudentAdd = ({addStudent,list,name}) => {
console.log('12sad',list);
console.log('name',name)
const [ isSending, setIsSending ] = useState(false);
const [ isSent, setIsSent ] = useState(false);
const [ form ] =Form.useForm();
  function sendData(data) {
    console.log(data);
    return new Promise(resolve =>{
      setTimeout(resolve,2000);
    });
  }
 
  async function handSubmit() {
    console.log("handsubmit");
    console.log(form.getFieldsValue());
    try {
      await form.validate();
      Message.loading({
        id: 'student_add',
        content: '正在添加' 
        });
      setIsSending(true);
      await sendData(JSON.stringify(form.getFieldsValue()));
      // addStudent([JSON.stringify(form.getFieldsValue())]);
      setIsSending(false);
      setIsSent(true);
    } catch (e) {
      Message.error('校验失败');
      console.log(e);

    }

  }
  if (isSent) {
    Message.success({
      id: 'student_add',
      content: '添加成功!',
    })
    setIsSent(false);
  
    
  }
  return (
    <div>
      <Form form={form} style={{ maxWidth:'600px' , padding: '20px', paddingTop: '80px', minWidth:'280px'  }} autoComplete='off'>
        <FormItem field={'name'}  disabled={isSending} label='姓名'  rules={[{ required: true }]}>
          <Input placeholder='输入学生姓名' />
        </FormItem>
        <FormItem field={'number'}  disabled={isSending} label='学号'  rules={[{ required: true }]}>
          <Input placeholder='输入学生学号' />
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
export default StudentAdd;