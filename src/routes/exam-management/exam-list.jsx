import { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Select, Form, Message, InputNumber } from '@arco-design/web-react';
import httpServer from '../httpServer';


const FormItem = Form.Item;
function ExamList() {

  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  const [form] = Form.useForm();
  const subjectOptions = ['math', 'english'];
  const Option = Select.Option; 
  const [ options, setOptions ] = useState([]);
  const [ subject , setSubject] =useState();

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };


  async function getList() {
    httpServer({
      url: '/exam/examManagement/list',
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

  async function deleteExam(data){
    httpServer({
      url: '/exam/examManagement/delete',
    }, data )
    .then(async (res) => {
      let respData = res.data;
      await getList();
    })
    .catch((err) => {
      console.log('err',err);
    })
  }

  async function editExam(data) {

    httpServer({
      url: '/exam/examManagement/edit',
    },JSON.parse(data))
    .then(async (res) => {
      let respData = res.data;
      await getList();

    })
    .catch((err) => {
      console.log('err',err);
    })
  }

  async function getPaperList(subject) {
    httpServer({
      url: `/exam/examManagement/paper?subject=${subject}`,
      method: 'GET'
    })
    .then((res) => {
      console.log('----res',res);
      const paperOptions =[];
      if(res.status ===200 && res.data.respCode ===1 ) {
        res.data.results.forEach(v=>{
          paperOptions.push({
            label: v.papername,
            value: v.id,
          })
        });
        console.log('paperOptions',paperOptions);
        setOptions(paperOptions);
        setData(res.data.results);
      }
    })
    .catch((err) => {
      console.log('err',err);
    })
    
  }


  
  useEffect(()=>{
    getList();
  },[])

//   useEffect(()=>{
//     getPaperList(subject);
//  },[subject])
  

  const columns = [
    {
      title: '考试名',
      dataIndex: 'examname',
    },
    {
      title: '考试编号',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '科目',
      dataIndex: 'subject',
    },
    {
      title: '考试时长',
      dataIndex: 'time',
    },
    {
        title: '试卷编号',
        dataIndex: 'paperId',
      },
    {
      title: 'Operation',
      dataIndex: 'op',
      render: (_, record) => (
        <div>
        <Button onClick={() =>{
        setCurrentRecord(record)
        form.setFieldsValue(record)
        setEditVisible(true)
      } 
       } type='primary' status='default'  >
        修改
      </Button> 
      <Button onClick={() =>{
        setCurrentRecord(record)
        setVisible(true)
      } 
       } type='primary' status='danger'  >
        删除
      </Button>  
      </div>
      ),
    },
  ];
  

  async function deleteExamList(item){
    await deleteExam(item);
    setVisible(false);
  }

  async function editExamList(){
    form.validate().then(async () => {
      setConfirmLoading(true);
      await editExam(JSON.stringify(form.getFieldsValue()));  
      setTimeout(() => {
        Message.success('Success !');
        setEditVisible(false);
        setConfirmLoading(false);
      }, 1500);
    })
  }



  return (
    <div>
   <Table
     rowKey='id'
     columns={columns}
     data={data}
   />
     <Modal
     title='修改'
     visible={editVisible}
     onOk={() => {
       editExamList();
     }}
     confirmLoading={confirmLoading}
     onCancel={() => setEditVisible(false)}
   >
     <Form
       {...formItemLayout}
       form={form}
       labelCol={{
         style: { flexBasis: 90 },
       }}
       wrapperCol={{
         style: { flexBasis: 'calc(100% - 90px)' },
       }}
     >    
       <FormItem label='考试名' field='examname'  rules={[{ required: true }]}>
         <Input placeholder='' />
       </FormItem>
         <FormItem label='编号' field='id' disabled rules={[{ required: true }]}>
         <Input placeholder='' />
       </FormItem>
       <FormItem label='科目' required  disabled field='subject' rules={[{ required: true }]}>
       <Select placeholder='Please select' >
        {subjectOptions.map((option) => (
          <Option key={option}  value={option}>
            {option}
          </Option>
        ))}
      </Select>
       </FormItem>
       <FormItem field={'time'}   label='考试时长'  rules={[{ required: true,}]}>
       <InputNumber
        style={{ width: 160, margin: '10px 24px 10px 0' }}
        min={60}
        max={150}
        suffix='分钟'
        formatter={(value) => `${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')}
        parser={(value) => value.replace(/,/g, '')}
      />
        </FormItem>
       <FormItem field='paperId'  label='试卷编号' disabled rules={[{ required: true }]} >
       <Select placeholder='Please select' options={options}>
        </Select>
        </FormItem>
     </Form>
   </Modal>
    <Modal
       title='删除'
       visible={visible}
       onOk={() =>
       {        
         deleteExamList(currentRecord)
       }
         }
       onCancel={() => setVisible(false)}
       autoFocus={false}
       focusLock={true}
      >
       <p>
         确认删除考试?
       </p>
     </Modal>
 </div>
  );
}
export default ExamList;
