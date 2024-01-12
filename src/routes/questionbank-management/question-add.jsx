import { useState, useContext } from 'react';
import { Form, Input, Button, Message, Radio, Select, Tabs, Typography, Space } from '@arco-design/web-react';
import { IconPlus } from  '@arco-design/web-react/icon';
// import { globalDispatchContext, globalContext } from './globalContext';
import { AutoComplete } from '@arco-design/web-react';
const FormItem = Form.Item;
  const QuestonAdd = () => {
  // const dispatch = useContext(globalDispatchContext);
  // const tasks =useContext(globalContext)
  const [ isSending, setIsSending ] = useState(false);
  const [ isSent, setIsSent ] = useState(false);
  const [ form ] =Form.useForm();
  const TabPane = Tabs.TabPane;
  const RadioGroup = Radio.Group;
  const TextArea = Input.TextArea;

  //   function sendData(data) {
  //       return new Promise(resolve =>{
  //         setTimeout(resolve,2000);
  //       });
  //     }
  //     const [email, setEmail] = useState([]);
  //     const handleSearch = (inputValue) => {
  //       const mail=[
  //         '@qq.com',
  //         '@163.com',
  //         '@gmail.com',
  //         '@xxx.com'
  //       ];
  //       setEmail(inputValue ? mail.map((v) => `${inputValue}${v}`) : []);
  //     }
  // async function handSubmit() {
  //   try {
  //     await form.validate();
  //     const isExist = tasks.some((v)=>v.id === form.getFieldValue('id') );
  //     if(isExist){
  //       Message.error('学号重复');
  //       return;
  //     }

  //     Message.loading({
  //       id: 'question_add',
  //       content: '正在添加' 
  //       });
  //     setIsSending(true);
  //     await dispatch({
  //       type: 'add',
  //       text: JSON.stringify(form.getFieldsValue())
  //     })   
  //     await sendData(JSON.stringify(form.getFieldsValue()));
  //     setIsSending(false);
  //     setIsSent(true);
  //   } catch (e) {
  //     Message.error('校验失败');
  //     console.log(e);
  //   }
  // }
  // if (isSent) {
  //   Message.success({
  //     id: 'question_add',
  //     content: '添加成功!',
  //   })
  //   setIsSent(false);
  // }
  return (
    <div>
       <Tabs defaultActiveTab='1'>
      <TabPane key='1' title='单选题'>
      {/* <Form form={form} style={{ maxWidth:'600px' , padding: '20px', paddingTop: '80px', minWidth:'280px'  }} autoComplete='off'>
      <FormItem field={'id'}  disabled={isSending} label='学号'  
      rules={[{ required: true },   
        { validator(value, cb) {
           const regex =/^\d+$/;
           if (!regex.test(value)) {
            return cb('必须填写数字');
            }
            return cb();
          }, }]}>
          <Input placeholder='输入学生学号' />
        </FormItem>
        <FormItem field={'StudentName'}  disabled={isSending} label='姓名'  
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
            />
        </FormItem>
      </Form> */}
  
        {/* <FormItem wrapperCol={{ offset: 5 }}>
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          <Button disabled={isSending} loading={isSending} type='primary'  onClick={handSubmit}   icon={<IconPlus /> } >提交</Button>
        </FormItem>  */}

      </TabPane>
      <TabPane key='2' title='多选题' >
      <Form form={form} style={{ maxWidth:'600px' , padding: '20px', minWidth:'280px'  }} autoComplete='off'>
      <FormItem field={'stem'}  disabled={isSending} label='题干' rules={[{ required: true }]} >
      <Space wrap>
      <TextArea placeholder='Please enter ...'  autoSize   />
      </Space>
      </FormItem>
      <FormItem field={'selectA'}  disabled={isSending} label='选项A' rules={[{ required: true }]} >
          <Input />  
        </FormItem>
        <FormItem field={'selectB'}  disabled={isSending} label='选项B' rules={[{ required: true }]} >
          <Input />
        </FormItem>
        <FormItem field={'selectC'}  disabled={isSending} label='选项C' rules={[{ required: true }]} >
          <Input />
        </FormItem>
        <FormItem field={'selectD'}  disabled={isSending} label='选项D' rules={[{ required: true }]} >
          <Input />
        </FormItem>
      </Form>
      </TabPane>
      <TabPane key='3' title='判断题'>
      <Form form={form} style={{ maxWidth:'600px' , padding: '20px', minWidth:'280px'  }} autoComplete='off'>
      <FormItem field={'stem'}  disabled={isSending} label='题干' rules={[{ required: true }]} >
      <Space wrap>
      <TextArea placeholder='Please enter ...'  autoSize   />
      </Space>
      </FormItem>
      <FormItem field={' correct answer'}  disabled={isSending}  rules={[{ required: true }]} >
      <RadioGroup defaultValue='true' >
        <Radio value='true'>正确</Radio>
        <Radio value='false'>错误</Radio>
      </RadioGroup>
      </FormItem>
      </Form>
      </TabPane>
      <TabPane key='4' title='简答题'>
        <Typography.Paragraph >Content of Tab Panel 4</Typography.Paragraph>
      </TabPane>

    </Tabs>
    </div>
  );
}
export default QuestonAdd;
