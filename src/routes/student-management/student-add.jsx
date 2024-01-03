import { Form, Input, Button,} from '@arco-design/web-react';
const FormItem = Form.Item;

const StudentAdd = () => {
  return (
    <Form style={{ width: '1250px', padding: '20px', paddingTop: '80px', background: "pink" }} autoComplete='off'>
      <FormItem label='姓名'>
        <Input placeholder='输入学生姓名' />
      </FormItem>
      <FormItem label='学号'>
        <Input placeholder='输入学生学号' />
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>

      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button type='primary'>提交</Button>
      </FormItem>
    </Form>
  );
};



export default StudentAdd;