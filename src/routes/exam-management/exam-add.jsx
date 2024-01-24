import { useState } from 'react';
import { Form, Input, Button, Message, Select, InputNumber } from '@arco-design/web-react';
import { IconPlus } from  '@arco-design/web-react/icon';
import { AutoComplete } from '@arco-design/web-react';
import httpServer from '../httpServer';
const FormItem = Form.Item;
  const ExamAdd = () => {
  const [ isSending, setIsSending ] = useState(false);
  const [ isSent, setIsSent ] = useState(false);
  const [ form ] =Form.useForm();
  const [ data, setData] = useState();
  const options = ['math', 'english'];
  const Option = Select.Option; 

  async function saveData(data){
    httpServer({
      url: '/exam/examManagement/add',
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



  async function handSubmit() {
    try {
      await form.validate();
      Message.loading({
        id: 'exam_add',
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
      id: 'exam_add',
      content: '添加成功!',
    })
    setIsSent(false);
  }

  
  return (
    <div>
      <Form form={form} style={{ maxWidth:'600px' , padding: '20px', paddingTop: '80px', minWidth:'280px'  }} autoComplete='off'>
        <FormItem field={'examname'}  disabled={isSending} label='考试名称'  rules={[{ required: true }]}>
          <Input placeholder='输入考试名称' />
        </FormItem>
       <FormItem field={'subject'}  disabled={isSending} label='科目' rules={[{ required: true }]} >
        <Select placeholder='Please select'>
        {options.map((option) => (
          <Option key={option} disabled={isSending} value={option}>
            {option}
          </Option>
        ))}
      </Select>
      </FormItem>
      <FormItem field={'time'}  disabled={isSending} label='考试时长'  rules={[{ required: true,}]}>
      <InputNumber
        style={{ width: 160, margin: '10px 24px 10px 0' }}
        min={60}
        max={150}
        suffix='分钟'
        formatter={(value) => `${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')}
        parser={(value) => value.replace(/,/g, '')}
      />
        </FormItem>
      
        <FormItem field={'paper'}  disabled={isSending} label='试卷' rules={[{ required: true }]} >
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
export default ExamAdd;
