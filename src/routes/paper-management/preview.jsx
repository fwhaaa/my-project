import QuestionCard from "./question-card";



const Preview = (props) => {
    const {questionList,setQuestionList} = props;
    console.log('questionList in preview',questionList);
  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: 40,
        backgroundColor: 'var(--color-fill-2)',
      }}
    >
        {
            questionList.map((question, index)=>{
                console.log('question',question);
              return  <QuestionCard question={question} index={index+1}></QuestionCard>
            })
        }
   
    </div>
  );
};

export default Preview;
