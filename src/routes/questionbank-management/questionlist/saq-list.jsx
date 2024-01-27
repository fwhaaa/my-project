import { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Form, Message } from '@arco-design/web-react';

import httpServer from '../../httpServer';

const FormItem = Form.Item;
function SaqList() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  const [data, setData] = useState([]);
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
      url: '/question/questionList/saq',
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
      url: '/question/deleteQuestion/saq',
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
      url: '/question/editQuestion/saq',
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
  
  const Columns = [
    {
      title: '科目',
      dataIndex: 'subject',
    },
    {
      title: '编号',
      dataIndex: 'id',
    },
  
    {
      title: '题干',
      dataIndex: 'stem',
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
  
  
  async function deleteQuestion(item){
    await deleteList(item);
    setVisible(false);
  }

  async function editQuestion(){
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
      <Table
        rowKey='id'
        columns={Columns}
        data={data}
      />
        <Modal
        title='简答修改'
        visible={editVisible}
        onOk={() => {
          editQuestion();
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


          <FormItem label='科目' field='subject'  disabled rules={[{ required: true }]}>
          <Input placeholder='' />
          </FormItem>
          <FormItem label='编号' field='id'  disabled rules={[{ required: true }]}>
          <Input placeholder='' />
          </FormItem>    
          <FormItem label='题干' field='stem'   rules={[{ required: true }]}>
          <Input placeholder='' />
          </FormItem>
        </Form>
      </Modal>
       <Modal
          title='简答删除'
          visible={visible}
          onOk={() =>
          {        
            deleteQuestion(currentRecord)
          }
            }
          onCancel={() => setVisible(false)}
          autoFocus={false}
          focusLock={true}
         >
          <p>
            确认删除题目?
          </p>
        </Modal>
    </div>
  );
 }          
export default SaqList;