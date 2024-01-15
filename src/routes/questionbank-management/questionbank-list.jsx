import {  Tabs, Typography } from '@arco-design/web-react';
import MultiipleList from '../questionbank-management/questionlist/multiple-list'
import SingleList from '../questionbank-management/questionlist/single-list'
import JudgeList from './questionlist/judge-list';

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
      <TabPane key='judge' title='判断题'>
        <JudgeList></JudgeList>
      </TabPane>
    </Tabs>
  
    </div>
  );
}

export default QuestionBankList;
