import QuestionCard from "./question-card";

const Preview = (props) => {
  const { questionList, setQuestionList } = props;
  console.log("questionList in preview", questionList);
  const singleChoiceList = questionList.filter((v) => v.type === "single");
  const multipleChoiceList = questionList.filter((v) => v.type === "multiple");
  const saqList = questionList.filter((v) => v.type === "saq");
  const judgeList = questionList.filter((v) => v.type === "judge");
  console.log("singleChoiceList", singleChoiceList);
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "100%",
        padding: 40,
        backgroundColor: "var(--color-fill-2)",
      }}
    >
      <h2>单选</h2>
      {singleChoiceList.map((question, index) => {
        console.log("question", question);
        return (
          <QuestionCard question={question} index={index + 1}></QuestionCard>
        );
      })}
      <h2>多选</h2>

      {multipleChoiceList.map((question, index) => {
        console.log("question", question);
        return (
          <QuestionCard question={question} index={index + 1}></QuestionCard>
        );
      })}

      <h2>判断</h2>

      {judgeList.map((question, index) => {
        console.log("question", question);
        return (
          <QuestionCard question={question} index={index + 1}></QuestionCard>
        );
      })}
      <h2>简答</h2>

      {saqList.map((question, index) => {
        console.log("question", question);
        return (
          <QuestionCard question={question} index={index + 1}></QuestionCard>
        );
      })}
    </div>
  );
};

export default Preview;
