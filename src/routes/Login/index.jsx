import { Form, Input, Button, Checkbox, Message } from '@arco-design/web-react';
import Password from '@arco-design/web-react/es/Input/password';
import httpServer from '../httpServer'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const FormItem = Form.Item;
    const [ form ] =Form.useForm();
    const navigate =useNavigate();
    async function login(data) {
        console.log('-------------username',data);
        httpServer({
          url: `/login/login`,
          method: 'POST'
        }, data)
        .then((res) => {
          console.log('----res',res);
          let respData = res.data;
          if(respData.respCode === -1){
            Message.error(`登录失败,${respData.respMsg}`)
            
          }else {
            Message.success('登录成功')
            navigate(`/`);
          }
        })
        .catch((err) => {
          console.log('err',err);
        })
      }
    function handSubmit(){
         const data = form.getFieldsValue();
         login(data);
         
    }

  return (
    <div style={{ display:'flex',justifyContent: 'center',alignItems: 'center',width:'100%'}} >
        <Form form={form} style={{ width: '600px' }} autoComplete='off'>
            <FormItem label='用户名' field='username'>
                <Input placeholder='请输入账号' />
            </FormItem>
  
            <FormItem label='密码' field='password'>
            <Input defaultValue='password'  placeholder='请输入密码'/>
            </FormItem>
            <FormItem wrapperCol={{ offset: 5 }}>
                <Button type='primary' onClick={handSubmit}>登录</Button>
            </FormItem>
        </Form>
    </div>
  );
};

export default Login;