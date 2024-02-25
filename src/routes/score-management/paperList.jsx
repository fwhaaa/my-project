import{ useState, React, useEffect } from 'react';
import { Table,Button,Modal } from '@arco-design/web-react';
import httpServer from '../httpServer';
import { useMatches, useParams, Link, useNavigate, Outlet, } from "react-router-dom";
import { Card } from '@arco-design/web-react';
const { Grid } = Card;

const ScorePaperList = () => {
  const  {examId} = useParams();
  console.log('----------------------------',useParams());
  console.log('*******',examId);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [currentRecord,setCurrentRecord] = useState(undefined);
  const navigate =useNavigate();
  const matches = useMatches();
  // const subject = matches[0].params.subject;
  const  {subject} = useParams();
  console.log('subject',subject);
  console.log('matches',matches);
  async function getList() {
    console.log('@@@@@@@@@@@@@@@@',examId);
    httpServer({
      url: `/pending_approval/list/paper?examId=${examId}`,
      method: 'GET'
    })
    .then((res) => {
      console.log('----res',res);
      let respData = res.data;
      if(res.status ===200 && respData.respCode ===1 ) {
        setData(res.data.results);
      }
    })
    .catch((err) => {
      console.log('err',err);
    })
  }
  
const columns = [
  {
    title: '试卷编号',
    dataIndex: 'paperId',
  },
  {
    title: '考试编号',
    dataIndex: 'examId',
  },
  {
    title: '学生',
    dataIndex: 'studentId',
  },
  {
    title: '分数',
    dataIndex: 'score',
  },
  {
    title: '操作',
    dataIndex: 'op',
    render: (_, record) => ( 
      <div>
        <Button type='primary' status='default' onClick={()=> {
           navigate(`/score/management/marking/${record.examId}/${record.paperId}/${record.studentId}`);
        }} >
        阅卷
      </Button>  
      </div>  
    ),
  },
];
useEffect(()=>{
  getList();
},[])
    

  console.log('----enterpaperlist');
  return <div>
    
      <Table columns={columns} data={data}></Table>

    </div>;
};

export default ScorePaperList;