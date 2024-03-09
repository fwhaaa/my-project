import { useEffect, useState } from 'react';
import { Form, Input, Button, Message, Select, InputNumber } from '@arco-design/web-react';
import { IconPlus } from  '@arco-design/web-react/icon';
import httpServer from '../httpServer';
import useAddForm from '../../global-hooks/use-add-form-hook';
const FormItem = Form.Item;
  const ExamAdd = () => {
  const [ options, setOptions ] = useState([]);
  const [ form ] =Form.useForm();
  const [ subject , setSubject] =useState();
  const subjectOptions = ['math', 'english'];
  const {isSending,handSubmit} = useAddForm({form,url:'/exam/examManagement/add'})
  const Option = Select.Option; 


  async function getList(subject) {
    httpServer({
      url: `/exam/examManagement/paper?subject=${subject}`,
      method: 'GET'
    })
    .then((res) => {
      console.log('----res',res);
      const paperOptions =[];
      if(res.status ===200 && res.data.respCode ===1 ) {
        res.data.results.forEach(v=>{
          paperOptions.push({
            label: v.papername,
            value: v.id,
          })
        });
        console.log('paperOptions',paperOptions);
        setOptions(paperOptions);
      }
    })
    .catch((err) => {
      console.log('err',err);
    })
    
  }
  useEffect(()=>{
     getList(subject);
  },[subject])
  
  return (
    <div>
      <Form form={form} style={{ maxWidth:'600px' , padding: '20px', paddingTop: '80px', minWidth:'280px'  }} autoComplete='off'>
        <FormItem field={'examname'}  disabled={isSending} label='考试名称'  rules={[{ required: true }]}>
          <Input placeholder='输入考试名称' />
        </FormItem>
       <FormItem field={'subject'}  disabled={isSending} label='科目' rules={[{ required: true }]} >
        <Select placeholder='Please select' onChange={(value)=>{
          setSubject(value);
        }}>
        {subjectOptions.map((option) => (
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
        <Select placeholder='Please select' options={options}>
        </Select>
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
