import { Tabs, Button, Message } from "@arco-design/web-react";
import MultipleList from "./paper-question-list/multiple-list";
import SingleList from "./paper-question-list/single-list";
import { useState } from "react";
import Preview from "./preview";
import httpServer from "../httpServer";
import SaqList from "./paper-question-list/saq-list";
import JudgeList from "./paper-question-list/judge-list";
const TabPane = Tabs.TabPane;

async function saveData(data) {
  console.log("data", data);
  httpServer(
    {
      url: "/paper/paperManagement/add",
    },
    data
  )
    .then((res) => {
      let respData = res.data;
    })
    .catch((err) => {
      console.log("err", err);
    });
}

function PaperAddQuestion(props) {
  const { metaInfo, setMetainfo } = props;
  const [questionList, setQuestionList] = useState([]);
  async function handSubmit() {
    console.log("questionList", questionList);
    console.log("metainfo", metaInfo);
    const questioncontent = {};
    console.log("questionlist", questionList);
    questionList.forEach((v) => {
      if (questioncontent[v.type]) {
        questioncontent[v.type][v.questionId] = v;
      } else {
        questioncontent[v.type] = {};
        questioncontent[v.type][v.questionId] = v;
      }
    });
    console.log("-----content", questioncontent);
    const data = {
      ...metaInfo,
      questioncontent: JSON.stringify(questioncontent),
    };
    await saveData(data);
    Message.success({
      id: "teacher_add",
      content: "添加成功!",
    });
  }

  return (
    <div>
      <Tabs>
        <TabPane key="SingleChoice" title="单选题">
          <SingleList
            metaInfo={metaInfo}
            setMetainfo={setMetainfo}
            questionList={questionList}
            setQuestionList={setQuestionList}
          ></SingleList>
        </TabPane>
        <TabPane key="multipleChoice" title="多选题">
          <MultipleList
            metaInfo={metaInfo}
            setMetainfo={setMetainfo}
            questionList={questionList}
            setQuestionList={setQuestionList}
          ></MultipleList>
        </TabPane>
        <TabPane key="judge" title="判断题">
          <JudgeList
            metaInfo={metaInfo}
            setMetainfo={setMetainfo}
            questionList={questionList}
            setQuestionList={setQuestionList}
          ></JudgeList>
        </TabPane>
        <TabPane key="saq" title="简答题">
          <SaqList
            metaInfo={metaInfo}
            setMetainfo={setMetainfo}
            questionList={questionList}
            setQuestionList={setQuestionList}
          ></SaqList>
        </TabPane>
      </Tabs>

      <Button type="primary" onClick={handSubmit}>
        提交
      </Button>
      <Preview
        questionList={questionList}
        setQuestionList={setQuestionList}
      ></Preview>
    </div>
  );
}

export default PaperAddQuestion;
