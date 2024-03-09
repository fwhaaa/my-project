import { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Select, Form, Message  } from '@arco-design/web-react';
// import httpServer from '../httpServer';
import useList from '../../global-hooks/use-list-hook';


const FormItem = Form.Item;
function TeachertList() {

  // const [data, setData] = useState();
  // const [visible, setVisible] = useState(false);
  // const [editVisible, setEditVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  const [searchType,setSearchType] = useState('teachername');
  const [form] = Form.useForm();
  const {data,deleteRecord,edit,editVisible,confirmLoading,setEditVisible,visible,setVisible} = useList({
    getListUrl:'/teacher/teacherManagement/list',
    deleteUrl:'/teacher/teacherManagement/delete',
    editUrl: '/teacher/teacherManagement/edit',
    form
  })
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };


  // async function getList() {
  //   httpServer({
  //     url: '/teacher/teacherManagement/list',
  //     method: 'GET'
  //   })
  //   .then((res) => {
  //     console.log('----res',res);
  //     let respData = res.data;
  //     if(res.status ===200 && respData.respCode ===1 ) {
  //       setData(res.data.results);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('err',err);
  //   })
  // }

  // async function deleteList(data){
  //   httpServer({
  //     url: '/teacher/teacherManagement/delete',
  //   }, data )
  //   .then(async (res) => {
  //     let respData = res.data;
  //     await getList();

  //   })
  //   .catch((err) => {
  //     console.log('err',err);
  //   })
  // }

  // async function editList(data) {

  //   httpServer({
  //     url: '/teacher/teacherManagement/edit',
  //   },JSON.parse(data))
  //   .then(async (res) => {
  //     let respData = res.data;
  //     await getList();

  //   })
  //   .catch((err) => {
  //     console.log('err',err);
  //   })
  // }


  
  // useEffect(()=>{
  //   getList();
  // },[])
  

  const columns = [
    {
      title: '姓名',
      dataIndex: 'teachername',
    },
    {
      title: '教师编号',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
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
  
  
//   async function handleSearch(search){
//     if(searchType === 'StudentName'){
//     setData(data.filter(t => t.teachername.includes(search)));
//     }
//     if(searchType === 'id'){
//       setData(data.filter(t => t.id.includes(search)));
//   }
// }
  // async function deleteTeacher(item){
  //   await deleteList(item);
  //   setVisible(false);
  // }

  // async function editTeacher(){
  //   form.validate().then(async () => {
  //     setConfirmLoading(true);
  //     await editList(JSON.stringify(form.getFieldsValue()));  
  //     setTimeout(() => {
  //       Message.success('Success !');
  //       setEditVisible(false);
  //       setConfirmLoading(false);
  //     }, 1500);
  //   })
  // }



  return (
    <div>
    <Input.Group compact>
         <Select defaultValue='teachername' onChange={(value)=>{
           setSearchType(value);
         }} showSearch style={{ width: '25%' }}>
           <Select.Option value='teachername' >姓名</Select.Option>
           <Select.Option value='id'>教师编号</Select.Option>
         </Select>
         {/* <Input style={{ width: '75%' }} placeholder='Please enter an address' onChange={handleSearch} /> */}
       </Input.Group>
   <Table
     rowKey='id'
     columns={columns}
     data={data}
   />
     <Modal
     title='修改'
     visible={editVisible}
     onOk={edit}
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
       <FormItem label='教师编号' field='id' disabled rules={[{ required: true }]}>
         <Input placeholder='' />
       </FormItem>
         <FormItem label='姓名' field='teachername' rules={[{ required: true }]}>
         <Input placeholder='' />
       </FormItem>
       <FormItem label='地址' required field='address' rules={[{ required: true }]}>
       <Input placeholder='' />
       </FormItem>
       <FormItem label='邮箱' required field='email' rules={[{ required: true }]}>
       <Input placeholder='' />
       </FormItem>
     </Form>
   </Modal>
    <Modal
       title='删除'
       visible={visible}
       onOk={() =>
       { 
         deleteRecord(currentRecord)
       }
         }
       onCancel={() => setVisible(false)}
       autoFocus={false}
       focusLock={true}
       confirmLoading={confirmLoading}
      >
       <p>
         确认删除学生?
       </p>
     </Modal>
 </div>
  );
}
export default TeachertList;
