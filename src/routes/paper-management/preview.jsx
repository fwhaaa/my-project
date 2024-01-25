import QuestionCard from "./question-card";



const Preview = (props) => {
    const {questionList,setQuestionList} = props;
    console.log('questionList in preview',questionList);
    const singleChoiceList = questionList.filter(v => v.type === 'single');
    const multipleChoiceList = questionList.filter(v => v.type === 'multiple');
    console.log('singleChoiceList',singleChoiceList);
  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: 40,
        backgroundColor: 'var(--color-fill-2)',
      }}
    >
      <h2>單選</h2>
        {
            singleChoiceList.map((question, index)=>{
                console.log('question',question);
              return  <QuestionCard question={question} index={index+1} ></QuestionCard>
            })
        }
        <h2>多選</h2>

        {
            multipleChoiceList.map((question, index)=>{
                console.log('question',question);
              return  <QuestionCard question={question} index={index+1} ></QuestionCard>
            })
        }
   
    </div>
  );
};

export default Preview;
