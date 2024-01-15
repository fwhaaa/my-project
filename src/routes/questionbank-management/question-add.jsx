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
      </TabPane>
      <TabPane key='4' title='简答题'>
        <Typography.Paragraph >Content of Tab Panel 4</Typography.Paragraph>
      </TabPane>

    </Tabs>
    </div>
  );
}
export default QuestonAdd;
