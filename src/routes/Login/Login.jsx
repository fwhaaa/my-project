import { Form, Input, Button, Checkbox } from '@arco-design/web-react';
const FormItem = Form.Item;


const Login = () => {
  return (
    <div style={{ display:'flex',justifyContent: 'center',alignItems: 'center',width:'100%'}} >
        <Form style={{ width: '600px' }} autoComplete='off'>
            <FormItem label='Username'>
                <Input placeholder='请输入账号' />
            </FormItem>
            <FormItem label='Password'>
            <Input.Password defaultValue='password'  placeholder='请输入密码'/>
            </FormItem>
            <FormItem wrapperCol={{ offset: 5 }}>
                <Button type='primary'>Submit</Button>
            </FormItem>
        </Form>
    </div>
  );
};

export default Login;