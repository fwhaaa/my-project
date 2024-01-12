import { useContext, useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Form, Message, Tabs, Typography } from '@arco-design/web-react';
import { singleContext, multipleDispatchContext, singleDispatchContext,multipleContext } from './globalContext';

const FormItem = Form.Item;
function QuestionBankList() {
  const multipledispatch = useContext(multipleDispatchContext);
  const singledispatch =useContext(singleDispatchContext)
  const multipleChoicetask = useContext(multipleContext );
  const singleChoicetask = useContext( singleContext);
  const [multipledata, setMultipleData] = useState(multipleChoicetask);
  const [singledata, setSingleData] = useState(multipleChoicetask);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const TabPane = Tabs.TabPane;
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
    setMultipleData(multipleChoicetask)
  },[multipleChoicetask])

  useEffect(()=>{
    setSingleData(singleChoicetask)
  },[singleChoicetask])
  
  const multipleChoiceColumns = [
  
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
  const singleChoiceColumns = [
  
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
  
  
  async function DeleteSingleList(item){
    await singledispatch (
     {
      type: 'delete',
      id: item.stem
     }
    )
    console.log('singletask',singleChoicetask);
  
    setVisible(false);
  }

  async function DeleteMultipleList(item){
    await multipledispatch (
     {
      type: 'delete',
      id: item.stem
     }
    )
    setVisible(false);
  }
  async function EditMultipleList(){
    form.validate().then(async () => {
      setConfirmLoading(true);
      await multipledispatch ({
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
  
  async function EditSingleList(){
    form.validate().then(async () => {
      setConfirmLoading(true);
      console.log('singledispatch',singledispatch);
      await singledispatch ({
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

  return (
    <div>
      <Tabs defaultActiveTab='SingleChoice'>
      <TabPane key='SingleChoice' title='单选题'>
      <Table
        rowKey='id'
        columns={singleChoiceColumns}
        data={singleChoicetask}
      />
        <Modal
        title='修改'
        visible={editVisible}
        onOk={() => {
          console.log('single',singledispatch);
          EditSingleList();
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
          title='删除'
          visible={visible}
          onOk={() =>
          {        
            console.log('single',singledispatch);
            DeleteSingleList(currentRecord)
           
            
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
      </TabPane>
      <TabPane key='multipleChoice' title='多选题' >
      <Table
        rowKey='id'
        columns={multipleChoiceColumns}
        data={multipleChoicetask}
      />
        <Modal
        title='修改'
        visible={editVisible}
        onOk={() => {
          EditMultipleList()
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
          <FormItem label='题干' field='stem' disabled  rules={[{ required: true }]}>
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
          title='删除'
          visible={visible}
          onOk={() =>
          {        
            DeleteMultipleList(currentRecord)
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
    
      </TabPane>
      <TabPane key='3' title='判断题'>
        <Typography.Paragraph >Content of Tab Panel 3</Typography.Paragraph>
      </TabPane>
    </Tabs>
  
    </div>
  );
}

export default QuestionBankList;
