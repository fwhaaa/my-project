import { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Select, Form, Message, InputNumber  } from '@arco-design/web-react';
import httpServer from '../httpServer';

const FormItem = Form.Item;
function PaperList() {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
//   const [searchType,setSearchType] = useState('StudentName');
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
  async function getList() {
    httpServer({
      url: '/paper/paperManagement/list',
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

  async function deleteList(data){
    httpServer({
      url: '/paper/paperManagement/delete',
    }, data )
    .then(async (res) => {
      let respData = res.data;
      await getList();

    })
    .catch((err) => {
      console.log('err',err);
    })
  }

  async function editList(data) {

    httpServer({
      url: '/paper/paperManagement/edit',
    },JSON.parse(data))
    .then(async (res) => {
      let respData = res.data;
      await getList();

    })
    .catch((err) => {
      console.log('err',err);
    })
  }


  
  useEffect(()=>{
    getList();
  },[])
  
  const columns = [
  
    {
      title: '试卷编号',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
        title: '科目',
        dataIndex: 'subject',
      },


    {
      title: '试卷名',
      dataIndex: 'papername',
    },
    {
      title: '单选题分值',
      dataIndex: 'singlescore',
    },
    {
      title: '多选选题分值',
      dataIndex: 'multiplescore',
    },
    {
      title: '判断题分值',
      dataIndex: 'judgescore',
    },
      {
      title: '简答题分值',
      dataIndex: 'saqscore',
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
        <Button>
          
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
  async function deletePaper(item){
    await deleteList(item);
    setVisible(false);
  }

  async function editPaper(){
    form.validate().then(async () => {
      setConfirmLoading(true);
      await editList(JSON.stringify(form.getFieldsValue()));  
      setTimeout(() => {
        Message.success('Success !');
        setEditVisible(false);
        setConfirmLoading(false);
      }, 1500);
    })
  }





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
        <Modal
        title='修改'
        visible={editVisible}
        onOk={() => {
          editPaper();
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
          <FormItem label='编号' field='id' disabled rules={[{ required: true }]}>
            <Input placeholder='' />
          </FormItem>
            <FormItem label='科目' field='subject' rules={[{ required: true }]}>
            <Input placeholder='' />
          </FormItem>
          <FormItem label='试卷名' required field='papername' rules={[{ required: true }]}>
          <Input placeholder='' />
          </FormItem>
          <FormItem label='单选题分值' required field='singlescore' rules={[{ required: true }]}>
          <InputNumber
            placeholder='Please enter'
            min={1}
            max={5}
        />
          </FormItem>
          <FormItem label='多选题分值' required field='multiplescore' rules={[{ required: true }]}>
          <InputNumber
            placeholder='Please enter'
            min={1}
            max={5}
         />
          </FormItem>
          <FormItem label='判断题分值' required field='judgescore' rules={[{ required: true }]}>
          <InputNumber
            placeholder='Please enter'
            min={1}
            max={5}
         />
          </FormItem>
          <FormItem label='简答题分值' required field='saqscore' rules={[{ required: true }]}>
          <InputNumber
            placeholder='Please enter'
            min={1}
            max={15}
         />
          </FormItem>
        </Form>
      </Modal>
       <Modal
          title='删除'
          visible={visible}
          onOk={() =>
          {        
            deletePaper(currentRecord)
          }
            }
          onCancel={() => setVisible(false)}
          autoFocus={false}
          focusLock={true}
         >
          <p>
            确认删除试卷?
          </p>
        </Modal>
    </div>
  );

 }
export default PaperList;
