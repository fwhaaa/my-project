import { useContext, useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Form, Message, Tabs} from '@arco-design/web-react';
import { multipleDispatchContext, multipleContext } from '../globalContext';
import httpServer from '../../httpServer';

const FormItem = Form.Item;
function MultiipleList() {
  const dispatch = useContext(multipleDispatchContext);
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
  
  async function getQuestionList() {
    httpServer({
      url: '/teacher/questionList/multipleChoice',
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
      url: '/teacher/deleteQuestion/multipleChoice',
    }, data )
    .then(async (res) => {
      let respData = res.data;
      await getQuestionList();
    })
    .catch((err) => {
      console.log('err',err);
    })
  }
  
  useEffect(()=>{
    getQuestionList();
  },[])

  const Columns = [
  
    {
      title: '题干',
      dataIndex: 'stem',
    },
    {
      title: '选项A',
      dataIndex: 'selectA',
    },
    {
      title: '选项B',
      dataIndex: 'selectB',
    },
    {
      title: '选项C',
      dataIndex: 'selectC',
    },
    {
      title: '选项D',
      dataIndex: 'selectD',
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

  async function EditList(){
    form.validate().then(async () => {
      setConfirmLoading(true);
      await dispatch ({
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

  async function deleteQuestion(item){

    await deleteList(item);
    setVisible(false);
  }
  

  return (
    <div>
      <Table
        rowKey='id'
        columns={Columns}
        data={data}
      />
        <Modal
        title='单选修改'
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
          <FormItem label='题干' field='stem'  disabled rules={[{ required: true }]}>
            <Input placeholder='' />
          </FormItem>
            <FormItem label='选项A' field='selectA' rules={[{ required: true }]}>
            <Input placeholder='' />
          </FormItem>
          <FormItem label='选项B' field='selectB' rules={[{ required: true }]}>
          <Input placeholder='' />
          </FormItem>
          <FormItem label='选项C' field='selectC' rules={[{ required: true }]}>
          <Input placeholder='' />
          </FormItem>
          <FormItem label='选项D' field='selectD' rules={[{ required: true }]}>
          <Input placeholder='' />
          </FormItem>
        </Form>
      </Modal>
       <Modal
          title='单选删除'
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

export default MultiipleList;
