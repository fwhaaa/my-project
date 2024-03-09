import { useState } from 'react';
import { Table, Button, Input, Select, Form } from '@arco-design/web-react';
import useList from '../../global-hooks/use-list-hook';
import CommonModal from '../../global-hooks/use-modal-hook';


const FormItem = Form.Item;
function TeachertList() {
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  const [searchType,setSearchType] = useState('teachername');
  const [form] = Form.useForm();
  const {data,deleteRecord,edit} = useList({
    getListUrl:'/teacher/teacherManagement/list',
    deleteUrl:'/teacher/teacherManagement/delete',
    editUrl: '/teacher/teacherManagement/edit',
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
export default TeachertList;
