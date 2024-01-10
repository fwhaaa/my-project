import { useContext, useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Select, Form, Message  } from '@arco-design/web-react';
import { globalContext, globalDispatchContext } from './globalContext';

const FormItem = Form.Item;
function StudentList() {
  const dispatch = useContext(globalDispatchContext);
  const tasks = useContext(globalContext);
  const [data, setData] = useState(tasks);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  const [searchType,setSearchType] = useState('StudentName');
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  useEffect(()=>{
      setData(tasks)
  },[tasks])
  
  const columns = [
  
    {
      title: '学号',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '姓名',
      dataIndex: 'StudentName',
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
  
  async function DeleteList(item){
    await dispatch(
     {
      type: 'delete',
      id: item.id
     }
    )
    setVisible(false);
  }
  
  async function EditList(){
    form.validate().then(async () => {
      setConfirmLoading(true);
      await dispatch({
        type: 'edit',
        text: JSON.stringify(form.getFieldsValue())
      })
      setTimeout(() => {
        Message.success('Success !');
        setEditVisible(false);
        setConfirmLoading(false);
      }, 1500);
    })
 
    
  }

  async function handleSearch(search){
    if(searchType === 'StudentName'){
    setData(tasks.filter(t => t.StudentName.includes(search)));
    }
    if(searchType === 'id'){
      setData(tasks.filter(t => t.id.includes(search)));
  }
}
  return (
    <div>
       <Input.Group compact>
            <Select defaultValue='StudentName' onChange={(value)=>{
              console.log('value',value)
              setSearchType(value);
            }} showSearch style={{ width: '25%' }}>
              <Select.Option value='StudentName' >姓名</Select.Option>
              <Select.Option value='id'>学号</Select.Option>
            </Select>
            <Input style={{ width: '75%' }} placeholder='Please enter an address' onChange={handleSearch} />
          </Input.Group>
      <Table
        rowKey='id'
        columns={columns}
        data={data}
      />
        <Modal
        title='修改'
        visible={editVisible}
        onOk={() => {
          EditList();
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
          <FormItem label='学号' field='id' disabled rules={[{ required: true }]}>
            <Input placeholder='' />
          </FormItem>
            <FormItem label='姓名' field='StudentName' rules={[{ required: true }]}>
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
            DeleteList(currentRecord)
          }
            }
          onCancel={() => setVisible(false)}
          autoFocus={false}
          focusLock={true}
         >
          <p>
            确认删除学生?
          </p>
        </Modal>
    </div>
  );
}

export default StudentList;
