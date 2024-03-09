import { useState, useContext } from 'react';
import { Form, Input, Button} from '@arco-design/web-react';
import { IconPlus } from  '@arco-design/web-react/icon';
import { AutoComplete } from '@arco-design/web-react';
import useAddForm from '../../global-hooks/use-add-form-hook';
const FormItem = Form.Item;

const TeacherAdd = () => {
  const [ form ] =Form.useForm();
  const {isSending,handSubmit} = useAddForm({form,url:'/teacher/teacherManagement/add'})
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

  return (
    <div className='form-wrapper'>
      <Form form={form} style={{ maxWidth:'600px' , padding: '20px', paddingTop: '80px', minWidth:'280px'  }} autoComplete='off'>
        <FormItem field={'teachername'}  disabled={isSending} label='姓名'  rules={[{ required: true }]}>
          <Input placeholder='输入教师姓名' />
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
export default TeacherAdd;
