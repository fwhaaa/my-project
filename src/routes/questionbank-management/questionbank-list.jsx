import {  Tabs, Typography } from '@arco-design/web-react';
import MultiipleList from './multiple-list';
import SingleList from './single-list';

function QuestionBankList() {
  const TabPane = Tabs.TabPane;
  return (
    <div>
      <Tabs>
      <TabPane key='SingleChoice' title='单选题'>
      <SingleList></SingleList>
      </TabPane>
      <TabPane key='multipleChoice' title='多选题' >
      <MultiipleList></MultiipleList>
      </TabPane>
      <TabPane key='3' title='判断题'>
        <Typography.Paragraph >Content of Tab Panel 3</Typography.Paragraph>
      </TabPane>
    </Tabs>
  
    </div>
  );
}

export default QuestionBankList;
