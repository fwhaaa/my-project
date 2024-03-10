import { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Select, Form, Message  } from '@arco-design/web-react';
import httpServer from '../httpServer';
import useList from '../../global-hooks/use-list-hook';
import CommonModal from '../../global-hooks/use-modal-hook';

const FormItem = Form.Item;
function StudentList() {
  // const [data, setData] = useState();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  const [searchType,setSearchType] = useState('StudentName');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const {data,deleteRecord,edit} = useList({
    getListUrl:'/teacher/studentManagement/list',
    deleteUrl:'/teacher/studentManagement/delete',
    editUrl: '/teacher/studentManagement/edit',
    form,
    visible,
    setVisible,
    setConfirmLoading,
    setDeleteVisible
  })
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };


  const columns = [
  
    {
      title: '学号',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '姓名',
      dataIndex: 'studentname',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '操作',
      dataIndex: 'op',
      render: (_, record) => ( 
        <div>
          <Button onClick={() =>{
          setCurrentRecord(record)
          form.setFieldsValue(record)
          setVisible(true)
        } 
         } type='primary' status='default'  >
          修改
        </Button> 
        <Button onClick={() =>{
          setCurrentRecord(record)
          setDeleteVisible(true)
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





  return (
    <div>
       {/* <Input.Group compact>
            <Select defaultValue='StudentName' onChange={(value)=>{
              console.log('value',value)
              setSearchType(value);
            }} showSearch style={{ width: '25%' }}>
              <Select.Option value='StudentName' >姓名</Select.Option>
              <Select.Option value='id'>学号</Select.Option>
            </Select>
            <Input style={{ width: '75%' }} placeholder='Please enter an address' onChange={handleSearch} />
          </Input.Group> */}
      <Table
        rowKey='id'
        columns={columns}
        data={data}
      />
         <CommonModal type='edit' setVisible={setVisible} visible={visible} setConfirmLoading={setConfirmLoading} confirmLoading={confirmLoading} onOk={edit}> 
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
       <FormItem label='学生编号' field='id' disabled rules={[{ required: true }]}>
         <Input placeholder='' />
       </FormItem>
         <FormItem label='姓名' field='studentname' rules={[{ required: true }]}>
         <Input placeholder='' />
       </FormItem>
       <FormItem label='地址' required field='address' rules={[{ required: true }]}>
       <Input placeholder='' />
       </FormItem>
       <FormItem label='邮箱' required field='email' rules={[{ required: true }]}>
       <Input placeholder='' />
       </FormItem>
     </Form>
     </CommonModal>
     <CommonModal type='delete' setVisible={setDeleteVisible} visible={deleteVisible} setConfirmLoading={setConfirmLoading} confirmLoading={confirmLoading} onOk={() =>
       { 
         deleteRecord(currentRecord)
       }
       } >

     </CommonModal>

    </div>
  );

 }
export default StudentList;
