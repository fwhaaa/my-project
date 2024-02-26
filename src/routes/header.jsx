import { PageHeader, Avatar, Menu, Dropdown, Button, Modal, Form, Input, Message } from '@arco-design/web-react';
import { IconUser,  IconEdit,  IconDown } from '@arco-design/web-react/icon';
import { useState } from 'react';
import httpServer from './httpServer';
const username = localStorage.getItem('username');
const FormItem = Form.Item;

const headerStyle={

   padding: '1px', 
}

const Head = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [ isSending, setIsSending ] = useState(false);
  const [ isSent, setIsSent ] = useState(false);

  const dropList = (
    <Menu>
      <Menu.Item key='1' onClick={()=>{

        
        setVisible(true)
        form.setFieldValue('username',username);
        
        }}>修改密码</Menu.Item>
      <Menu.Item key='2'>退出登录</Menu.Item>
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
    <div style={ headerStyle }>
      <PageHeader
        title='在线考试系统'
        subTitle='This is a description'
        breadcrumb={{
          routes: [
            {
              path: '/',
              breadcrumbName: 'Home',
            },
            {
              path: '/channel',
              breadcrumbName: '。。。',
            },
            {
              path: '/',
              breadcrumbName: '。。。',
            },
          ],
        }}
        extra={
          
          <div  >
             <Dropdown droplist={dropList} trigger='click' >
             <Avatar
              triggerIcon={<IconEdit />}
              style={{ backgroundColor: '#14C9C9'}}
              >
              <IconUser />
            </Avatar>
            </Dropdown>
       <Modal
        title='Modal Title'
        visible={visible}
        onOk={() =>
          update()
          }
        onCancel={() => setVisible(false)}
 
        focusLock={true}
      >
         <Form  autoComplete='off' form={form}>
      <FormItem label='用户名' disabled field='username'>
        <Input placeholder='please enter your username...' />
      </FormItem>
      <FormItem label='新密码' field='password'>
        <Input placeholder='请输入新密码' />
      </FormItem>
      <FormItem label='再次输入密码' field='check'>
        <Input placeholder='再次输入新密码' />
      </FormItem>
    </Form>

      </Modal>
          </div>
        }
      />

      
    </div>
  );
};

export default Head;