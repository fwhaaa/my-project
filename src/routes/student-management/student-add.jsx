import { useState, useContext } from 'react';
import { Form, Input, Button, Message, Radio } from '@arco-design/web-react';
import { IconPlus } from  '@arco-design/web-react/icon';
import { globalDispatchContext, globalContext } from './globalContext';
import { AutoComplete } from '@arco-design/web-react';
import httpServer from '../httpServer';



const FormItem = Form.Item;
  const StudentAdd = () => {

  const [ isSending, setIsSending ] = useState(false);
  const [ isSent, setIsSent ] = useState(false);
  const [ form ] =Form.useForm();

  async function saveData(data){
    httpServer({
      url: '/teacher/studentManagement/add',
    }, JSON.parse(data))
    .then((res) => {
      let respData = res.data;
    })
    .catch((err) => {
      console.log('err',err);
    })
  }
  function sendData(data) {
    return new Promise(resolve =>{
      setTimeout(resolve,2000);
    });
  }
      const [email, setEmail] = useState([]);
      const handleSearch = (inputValue) => {
        const mail=[
          '@qq.com',
          '@163.com',
          '@gmail.com',
          '@xxx.com'
        ];
        setEmail(inputValue ? mail.map((v) => `${inputValue}${v}`) : []);
      }
      async function handSubmit() {
        try {
          await form.validate();
          Message.loading({
            id: 'studnet_add',
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
          id: 'student_add',
          content: '添加成功!',
        })
        setIsSent(false);
      }
  return (
    <div className='form-wrapper'>
      <Form form={form} style={{ maxWidth:'600px' , padding: '20px', paddingTop: '80px', minWidth:'280px'  }} autoComplete='off'>
      {/* <FormItem field={'id'}  disabled={isSending} label='学号'  
      rules={[{ required: true },   
        { validator(value, cb) {
           const regex =/^\d+$/;
           if (!regex.test(value)) {
            return cb('必须填写数字');
            }
            return cb();
          }, }]}>
          <Input placeholder='输入学生学号' />
        </FormItem> */}
        <FormItem field={'studentname'}  disabled={isSending} label='姓名'  
          rules={[
            { required: true },
         
            ]}>
          <Input placeholder='输入学生姓名' />
        </FormItem>
        <FormItem field={'address'}  disabled={isSending} label='地址' rules={[{ required: true }]} >
          <Input placeholder='输入地址' />
        </FormItem>
        <FormItem field={'email'}  disabled={isSending} label='邮箱' rules={[{ required: true }]} >
        <AutoComplete
            placeholder='输入邮箱'
            onSearch={handleSearch}
            data={email}
            defaultActiveFirstOption={true}
            />
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
