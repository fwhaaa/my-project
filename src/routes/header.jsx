import { PageHeader, Avatar, Menu, Dropdown, Button, Modal, Form, Input, Message } from '@arco-design/web-react';
import { IconUser,  IconEdit,  IconDown } from '@arco-design/web-react/icon';
import { useState } from 'react';
import httpServer from './httpServer';
import { useNavigate } from 'react-router-dom';
const username = localStorage.getItem('username');
const FormItem = Form.Item;


const Head = () => {
  const [visible, setVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate =useNavigate();


  const dropList = (
    <Menu>
      <Menu.Item key='1' onClick={()=>{
        setVisible(true)
        form.setFieldValue('username',username);
        }}>修改密码</Menu.Item>
      <Menu.Item key='2' onClick={()=>setLogoutVisible(true)}>退出登录</Menu.Item>
    </Menu>
  );
  
  
  async function saveData(data){
    console.log('--------------------',data);
    httpServer({
      url: '/user/password/update',
    }, data)
    .then((res) => {
      let respData = res.data;
    })
    .catch((err) => {
      console.log('err',err);
    })
  }

  async function handSubmit() {
      await saveData(form.getFieldsValue());
      Message.success('修改成功')
      setVisible(false)
      localStorage.setItem('password', form.getFieldValue('password'));
    } 
  
    function logout(){
      localStorage.clear();
      Message.normal('已退出登录')
      navigate(`/login`)
    }
  





  function update(){
   const data =  form.getFieldsValue();
   console.log('------------passworddata  ',data);
   if(data.password!==data.check){
    Message.warning('两次密码不一致，请重新输入')
   } else{
     handSubmit()
   }
  }

  return (
    <div >
      <PageHeader
        title='在线考试系统'
        subTitle='This is a description'
        breadcrumb={{
          routes: [
            // {
            //   path: '/',
            //   breadcrumbName: 'Home',
            // },
            // {
            //   path: '/channel', 
            //   breadcrumbName: '。。。',
            // },
            // {
            //   path: '/',
            //   breadcrumbName: '。。。',
            // },
          ],
        }}
        extra={
          
          <div  >
             <Dropdown droplist={dropList} trigger='click' >
             <Avatar
              style={{ backgroundColor: '#14C9C9'}}
              >
              {localStorage.getItem('username')}
            </Avatar>
            </Dropdown>
       <Modal
        title='修改密码'
        visible={visible}
        onOk={() =>
          update()
          }
        onCancel={() => setVisible(false)}
 
        focusLock={true}
      >
         <Form  autoComplete='off' form={form}>
      <FormItem label='用户名' disabled field='username'>
        <Input />
      </FormItem>
      <FormItem label='新密码' field='password'>
        <Input placeholder='请输入新密码' />
      </FormItem>
      <FormItem label='再次输入密码' field='check'>
        <Input placeholder='再次输入新密码' />
      </FormItem>
    </Form>

      </Modal>

      <Modal
        title='提示'
        visible={logoutVisible}
        onOk={() => logout()}
        onCancel={() => setLogoutVisible(false)}
      >
        <p style={{textAlign:'center'}}>
         是否要退出登录
        </p>
      </Modal>
          </div>
        }
      />

      
    </div>
  );
};

export default Head;