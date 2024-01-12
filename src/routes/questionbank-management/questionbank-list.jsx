import {  Tabs, Typography } from '@arco-design/web-react';
import SingleAdd from './single-add';
import MultiipleAdd from './multiple-add';

function QuestionBankList() {
  const TabPane = Tabs.TabPane;
  return (
    <div>
      <Tabs>
      <TabPane key='SingleChoice' title='单选题'>
      <SingleAdd></SingleAdd>
      </TabPane>
      <TabPane key='multipleChoice' title='多选题' >
      <MultiipleAdd></MultiipleAdd>
      </TabPane>
      <TabPane key='3' title='判断题'>
        <Typography.Paragraph >Content of Tab Panel 3</Typography.Paragraph>
      </TabPane>
    </Tabs>
  
    </div>
  );
}

export default QuestionBankList;
