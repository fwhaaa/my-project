import { Tabs } from '@arco-design/web-react';
import MultipleAdd from './questionadd/multiple-add';
import SingleAdd from './questionadd/single-add';
import JudgeAdd from './questionadd/judge-add';
import SaqAdd from './questionadd/saq-add';

  const QuestonAdd = () => {
  const TabPane = Tabs.TabPane;
  return (
    <div>
       <Tabs defaultActiveTab='1'>
      <TabPane key='1' title='单选题'>
        <SingleAdd></SingleAdd>
      </TabPane>
      <TabPane key='multiple' title='多选题' >
        <MultipleAdd></MultipleAdd>
      </TabPane>
      <TabPane key='judge' title='判断题'>
        <JudgeAdd></JudgeAdd>
      </TabPane>
      <TabPane key='4' title='简答题'>
        <SaqAdd></SaqAdd>
      </TabPane>
    </Tabs>
    </div>
  );
}
export default QuestonAdd;
