import { Form, Input, Button,} from '@arco-design/web-react';
const FormItem = Form.Item;

const TeacherAdd = () => {
  return (
    <Form style={{ width: '40%', padding: '20px', paddingTop: '80px'}} autoComplete='off'>
      <FormItem label='姓名'>
        <Input placeholder='输入教师姓名' />
      </FormItem>
      <FormItem label='编号'>
        <Input placeholder='输入教师编号' />
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>

      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button type='primary'>提交</Button>
      </FormItem>
    </Form>
  );
};



export default TeacherAdd;