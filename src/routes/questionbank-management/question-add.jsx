import { useState, useContext } from 'react';
import { Form, Input, Button, Message, Radio, Select, Tabs, Typography, Space } from '@arco-design/web-react';
import { IconPlus } from  '@arco-design/web-react/icon';
import { multipleContext, multipleDispatchContext, singleContext, singleDispatchContext } from './globalContext';
import { AutoComplete } from '@arco-design/web-react';
import MultipleAdd from './questionadd/multiple-add';
import SingleAdd from './questionadd/single-add';
const FormItem = Form.Item;
  const QuestonAdd = () => {
  const multipledispatch = useContext(multipleDispatchContext);
  const tasks =useContext(multipleContext)
  const [ isSending, setIsSending ] = useState(false);
  const [ isSent, setIsSent ] = useState(false);
  const [ form ] =Form.useForm();
  const TabPane = Tabs.TabPane;
  const multipleChoicetask = useContext(multipleContext );




  return (
    <div>
       <Tabs defaultActiveTab='1'>
      <TabPane key='1' title='单选题'>
        <SingleAdd></SingleAdd>
      </TabPane>
      <TabPane key='multiple' title='多选题' >
        <MultipleAdd></MultipleAdd>
      </TabPane>
      <TabPane key='3' title='判断题'>
      {/* <Form form={form} style={{ maxWidth:'600px' , padding: '20px', minWidth:'280px'  }} autoComplete='off'>
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
      </Form> */}
      </TabPane>
      <TabPane key='4' title='简答题'>
        <Typography.Paragraph >Content of Tab Panel 4</Typography.Paragraph>
      </TabPane>

    </Tabs>
    </div>
  );
}
export default QuestonAdd;
