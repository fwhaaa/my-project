import { Tabs, Button } from '@arco-design/web-react';
import MultipleList from './paper-question-list/multiple-list'
import SingleList from './paper-question-list/single-list'
import { useState } from 'react';
import Preview from './preview';
import httpServer from '../httpServer';
const TabPane = Tabs.TabPane;

async function saveData(data){
    console.log('data',data);
    httpServer({
      url: '/paper/paperManagement/add',
    },data)
    .then((res) => {
      let respData = res.data;

    })
    .catch((err) => {
      console.log('err',err);
    })
  }

function  PaperAddQuestion(props) {
    const {metaInfo,setMetainfo} = props;
    const [questionList,setQuestionList] = useState([]);
    async function handSubmit(){
        console.log('questionList',questionList);
        console.log('metainfo',metaInfo);
        const questioncontent = {};
        questionList.map((v)=>{
            questioncontent[v.questionId] = v;
        })
        console.log('content',questioncontent);
        const data = {
            ...metaInfo,
            questioncontent: JSON.stringify(questioncontent)
        }
        await saveData(data);

    }

  return (
    <div>
      <Tabs>
      <TabPane key='SingleChoice' title='单选题'>
        <SingleList questionList={questionList} setQuestionList={setQuestionList}></SingleList>    
      </TabPane>
      <TabPane key='multipleChoice' title='多选题' >
        <MultipleList questionList={questionList} setQuestionList={setQuestionList}></MultipleList>
      </TabPane>
      {/* <TabPane key='judge' title='判断题'>
        <JudgeList></JudgeList>
      </TabPane>
      <TabPane key='saq' title='简答题'>
        <SaqList></SaqList>
      </TabPane> */}
    </Tabs>

    <Button type='primary'  onClick={handSubmit}    >提交</Button>
    <Preview questionList={questionList} setQuestionList={setQuestionList}></Preview>
  
    </div>
  );
}

export default PaperAddQuestion;