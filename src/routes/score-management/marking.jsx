import { Form, Input, Button, Checkbox, Radio, Grid, Card } from '@arco-design/web-react';
import{ useEffect, useState   } from 'react';
import { useParams } from "react-router-dom";
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
  const {examId} = useParams();
  const {studentId} = useParams();
  const {paperId} = useParams();


  async function saveData(data){
    httpServer({
      url: `/pending_approval/add/exam`
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
          setQuestion(question);
          
        })
 
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
    console.log('-------data',data);
    const params = {
     studentId: '001',
     paperId,
     answer: JSON.stringify(data)
    };

    await saveData(params)
    console.log('answer',JSON.stringify(data));
  }

 

  
  useEffect(()=>{
     getList();
     getAnser();
  },[])
      
  console.log('single',single);
   console.log('enter');

  return (
    <div style={{padding:'40px 60px'}}>
      
      <Form  autoComplete='off' form={form}  layout='vertical' style={{width:'600px'}}> 
       <h3 style={{textAlign: 'left'}}>单选题</h3>
       {
        single && Object.keys(single).map((v,index)=> {
           const singleObj = single[v];
           console.log('singleObj',singleObj);

           const rightAnswer = singleObj.rightAnswer;
           console.log('--------rightAnswer',rightAnswer);
           const studentAnswer = answer[`single_${singleObj.id}`];
           console.log('--------studentAnswer',studentAnswer);
           const label = rightAnswer === studentAnswer 
           ? (<span style={{ color: 'green' }}> { `${index+1}、${singleObj.stem}` } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回答正确</span>) 
           : (<span style={{ color: 'red' }}> {`${index+1}、${singleObj.stem} `}
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回答错误！正确答案:  </span>{`${rightAnswer}`}</span>);

          return (     
            <FormItem field={`single_${singleObj.id}`} label={label} style={{textAlign: 'left'}}>
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



           return (
          
            <FormItem field={`multiple_${multipleObj.id}`} label={`${index+1}、${multipleObj.stem}`} style={{textAlign: 'left'}}>
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
           return (
          
            <FormItem field={`judge_${judgeObj.id}`} label={`${index+1}、${judgeObj.stem}`} style={{textAlign: 'left'}}>
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
           return (
          
            <FormItem field={`saq_${saqObj.id}`} label={`${index+1}、${saqObj.stem}`} style={{textAlign: 'left'}}>
                <Input></Input>
            </FormItem>
           )
         })
       }
     <FormItem wrapperCol={{ offset: 5 }}>
          <Button type='primary'  onClick={handSubmit}    >提交</Button>
        </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
       
      </FormItem>
    </Form>
    </div>

  );
};

export default Marking;
