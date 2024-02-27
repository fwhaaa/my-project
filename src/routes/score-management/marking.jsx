import { Form, Input, Button, Checkbox, Radio, Grid, Card,  InputNumber, Modal } from '@arco-design/web-react';
import{ useEffect, useState   } from 'react';
import { useParams,useNavigate } from "react-router-dom";
import httpServer from '../httpServer';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;


const Marking = () => {
  const [ form ] =Form.useForm();
  const [data, setData] = useState();
  const [answer, setAnswer] = useState();
  const [single,setSingle] = useState();
  const [multiple,setMultiple] = useState();
  const [judge,setJudge] = useState();
  const [saq,setSaq] = useState();
  const [question,setQuestion] = useState();
  const [singleScore,setSingleScore] = useState();
  const [multipleScore,setMultipleScore] = useState();
  const [judgeScore,setJudgeScore] = useState();
  const [saqScore,setSaqScore] = useState();
  const {examId,studentId,paperId} = useParams();
  const [examInfo,setExamInfo] = useState();
  const [visible, setVisible] = useState(false);
  const [point,setPoint] = useState();
  const navigate =useNavigate();



  async function saveData(data){
    console.log('--------savedata',data);
    httpServer({
      url: `/pending_approval/add/score`
    }, data)
    .then((res) => {
      let respData = res.data;
    })
    .catch((err) => {
      console.log('err',err);
    })
  }

  async function getList() {
    console.log('@@@@@@paperID',paperId);
    httpServer({
      url: `/paper/paperManagement/list?id=${paperId}`,
      method: 'GET'
    })
    .then((res) => {
      console.log('----res',res);
      let respData = res.data;
      if(res.status ===200 && respData.respCode ===1 ) {
        setData(res.data.results);
        console.log('---resluts',res.data.results);
        res.data.results?.map((v)=>{
          const question=JSON.parse(v.questioncontent);
          console.log('---------question',question);
          setSingle(question['single']);
          setMultiple(question['multiple']);
          setJudge(question['judge']);
          setSaq(question['saq']);
          setSingleScore(v.singlescore);
          setMultipleScore(v.multiplescore);
          setJudgeScore(v.judgescore);
          setSaqScore(v.saqscore);
          console.log('-------v',v);
          setQuestion(question);
        })
 
      }
    })
    .catch((err) => {
      console.log('err',err);
    })
  }

  async function getExamInfo() {
    console.log('-------examId',examId);
    httpServer({
      url: `/exam/examManagement/list?examId=${examId}`,
      method: 'GET'
    })
    .then((res) => {
      console.log('----res',res);
      let respData = res.data;
      if(res.status ===200 && respData.respCode ===1 ) {
        setExamInfo(res.data.results[0]);
      }
    })
    .catch((err) => {
      console.log('err',err);
    })
  }

  async function getAnser() {
    httpServer({
      url: `/pending_approval/list/paper?examId=${examId}&studentId=${studentId}`,
      method: 'GET'
    })
    .then((res) => {
      console.log('-&*……%……&%&……res',res);
      let respData = res.data;
      if(res.status ===200 && respData.respCode ===1 ) {
        setAnswer(JSON.parse(res.data.results[0].answer));
        console.log('*&*&&anser',JSON.parse(res.data.results[0].answer));
        form.setFieldsValue(JSON.parse(res.data.results[0].answer));
      }
    })
    .catch((err) => {
      console.log('err',err);
    })
  }
  
  console.log('----data',data);

  async function handSubmit() {
    const data =  form.getFieldsValue()
    let totalScore = 0;
    Object.keys(data).map((key)=>{
      const studentAnswer = data[key];
      const [ type,questionId ] = key.split('_');
      const questionInfo = question[type][questionId];
      const rightAnswer = questionInfo?.rightAnswer;
      if(type === 'multiple'){
        const rightAnswerStr = rightAnswer.split(',')?.sort().join('');
        const studentAnswerStr = studentAnswer?.sort().join('');
        if(rightAnswerStr === studentAnswerStr){
          totalScore += Number(multipleScore);
        }
      } else if( rightAnswer===studentAnswer ){
        switch (type){
          case 'single':{
            totalScore += Number(singleScore);
            break;
          }
          case 'judge':{
            totalScore += Number(judgeScore);
            break;
          }
        }
        console.log( '----------------totalScore',totalScore);
      }  else if(studentAnswer?.score !== undefined){
      console.log('scorein ',studentAnswer);
        console.log('score in ',studentAnswer);
        totalScore += Number(studentAnswer?.score);
        console.log('--------------total',totalScore);
        setPoint(totalScore)
       
    }
  })

   
}

 

  
  useEffect(()=>{
     getList();
     getAnser();
     getExamInfo();
  },[])
      
  console.log('single',single);
   console.log('enter');
   console.log('---------examInfo',examInfo);
  return (
    <div style={{ padding:'40px 60px' }}>
      <h1 style={{ marginTop: 0, textAlign:'center'}}> {examInfo?.examname}</h1>
      <Form  autoComplete='off' form={form}  layout='vertical' style={{width:'600px'}}> 
       <h3 style={{textAlign: 'left'}}>单选题</h3>
       {
        single && Object.keys(single).map((v,index)=> {
           const singleObj = single[v];
           console.log('singleObj',singleObj);
           const rightAnswer = singleObj.rightAnswer;
           console.log('--------rightAnswer',rightAnswer);
           const studentAnswer = answer?.[`single_${singleObj.id}`];
           console.log('--------studentAnswer',studentAnswer);
           const label = rightAnswer === studentAnswer 
           ? (<span style={{ color: 'green' }}> { `${index+1}、${singleObj.stem}` } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回答正确</span>) 
           : (<span style={{ color: 'red' }}> {`${index+1}、${singleObj.stem} `}
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回答错误！正确答案:  </span>{`${rightAnswer}`}</span>);
          return (     
            <FormItem disabled field={`single_${singleObj.id}`} label={label} style={{textAlign: 'left'}}>
              <RadioGroup direction='vertical' >
                  <Radio value={'a'}>A、{singleObj.selectA}</Radio>
                  <Radio value={'b'}>B、{singleObj.selectB}</Radio>
                  <Radio value={'c'}>C、{singleObj.selectC}</Radio>
                  <Radio value={'d'}>D、{singleObj.selectD}</Radio>
              </RadioGroup>
            </FormItem>
           )
         })
       }
        <h3 style={{textAlign: 'left'}}>多选题</h3>
       {
        multiple && Object.keys(multiple).map((v,index)=> {
          const multipleObj = multiple[v];
          const options = [
            {
                label: `A、${multipleObj.selectB}`,
                value: 'a'
        
            },
            {
                label: `B、${multipleObj.selectB}` ,
                value: 'b'
            },
            {
                label: `C、${multipleObj.selectC}` ,
                value: 'c'
            },
            {
                label: `D、${multipleObj.selectD}` ,
                value: 'd'
            },
          ];
          console.log('multipleObj',multipleObj);

          const rightAnswer = multipleObj.rightAnswer.split(',');
          console.log('--------rightAnswer',rightAnswer);
          const studentAnswer = answer?.[`multiple_${multipleObj.id}`];
          console.log('--------studentAnswer',studentAnswer);
          const rightAnswerStr = rightAnswer?.sort().join('');
          const studentAnswerStr = studentAnswer?.sort().join('');

          const label = rightAnswerStr === studentAnswerStr 
          ? (<span style={{ color: 'green' }}> { `${index+1}、${multipleObj.stem}` } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回答正确</span>) 
          : (<span style={{ color: 'red' }}> {`${index+1}、${multipleObj.stem} `}
           <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回答错误！正确答案:  </span>{`${rightAnswer}`}</span>);

           return (
          
            <FormItem disabled field={`multiple_${multipleObj.id}`} label={label} style={{textAlign: 'left'}}>
               <CheckboxGroup direction='vertical' options={options} />
            </FormItem>
           )
         })
       }
         <h3 style={{textAlign: 'left'}}>判断题</h3>
       {
        judge && Object.keys(judge).map((v,index)=> {
          const judgeObj = judge[v];
          console.log('judgeObj',judgeObj);
          const rightAnswer = judgeObj.rightAnswer;
          console.log('--------rightAnswer',rightAnswer);
          const studentAnswer = answer?.[`judge_${judgeObj.id}`];
          console.log('--------studentAnswer',studentAnswer);
          const label = rightAnswer === studentAnswer 
          ? (<span style={{ color: 'green' }}> { `${index+1}、${judgeObj.stem}` } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回答正确</span>) 
          : (<span style={{ color: 'red' }}> {`${index+1}、${judgeObj.stem} `}
           <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回答错误！正确答案:  </span>{rightAnswer === 'true'? '正确' : '错误'}</span>);
           return (
          
            <FormItem disabled field={`judge_${judgeObj.id}`} label={label} style={{textAlign: 'left'}}>
                <RadioGroup direction='vertical' >
                    <Radio value='true'>正确</Radio>
                    <Radio value='false'>错误</Radio>
                </RadioGroup>
            </FormItem>
           )
         })
       }
        <h3 style={{textAlign: 'left'}}>简答题</h3>
       {
        saq && Object.keys(saq).map((v,index)=> {
          const saqObj = saq[v];
          console.log('saqObj',saqObj);
          console.log('----saqsocre',saqScore);
          console.log('----singlesocre',singleScore);
          console.log('----multiplesocre',multipleScore);
          console.log('----judgesocre',judgeScore);
           return (
  
            // <FormItem field={`saq_${saqObj.id}`} label={`${index+1}、${saqObj.stem}`} style={{textAlign: 'left'}} disabled>
            //     <Input></Input>
            //     <FormItem field={`saq_${saqObj.id}`} tyle={{textAlign: 'left'}} disabled>
            //     </FormItem>
            // </FormItem>
            <Form.Item  field={`saq_${saqObj.id}`} label={`${index+1}、${saqObj.stem}`} style={{textAlign: 'left'}} disabled>
            <Grid.Row gutter={8}>
              <Grid.Col span={12}>
              <FormItem field={`saq_${saqObj.id}`} tyle={{textAlign: 'left'}} disabled>
              <Input></Input>
              </FormItem>
              </Grid.Col>
              <Grid.Col span={12}>
                <Form.Item field={`saq_${saqObj.id}.score`}  rules={[{ required: true }]}>
                  <InputNumber
                    placeholder={`请输入分数,最高分${saqScore}`}
                    min={0}
                    max={saqScore}
                  />
                </Form.Item>
              </Grid.Col>
            </Grid.Row>
          </Form.Item>

           )
         })
       }
     <FormItem wrapperCol={{ offset: 5 }}>
          <Button type='primary'  onClick={()=>{
            setVisible(true);
            handSubmit();

          }
            // handSubmit()
            }>提交</Button>
        </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
       
      </FormItem>
    </Form>
          <Modal
        title='Modal Title'
        visible={visible}
        onOk={()=>{ 
           saveData({
          studentId,
          examId,
          point,
        });
        navigate(`/score/management/paperList/${examId}`)
        
      }}
        onCancel={() => setVisible(false)}
        focusLock={true}
      >
        <p>
          总分为{point}分，是否提交？
        </p>
      </Modal>
    </div>

  );
};

export default Marking;
