import { useContext, useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Form, Message } from '@arco-design/web-react';
import { judgeContext, judgeDispatchContext } from '../globalContext';

const FormItem = Form.Item;
function  JudgeList() {
  const judgedispatch =useContext(judgeDispatchContext)
  const judgetask = useContext(judgeContext);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  const [judgedata, setJudgeData] = useState(judgetask);
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
    setJudgeData(judgetask)
  },[judgetask])
  

  const judgeColumns = [
  
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
  
  
  async function DeleteJudgeList(item){
    await judgedispatch (
     {
      type: 'delete',
      id: item.stem
     }
    )
  
    setVisible(false);
  }

  async function EditJudgeList(){
    form.validate().then(async () => {
      setConfirmLoading(true);
      await judgedispatch({
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
      <Table
        rowKey='id'
        columns={judgeColumns}
        data={judgetask}
      />
        <Modal
        title='判断修改'
        visible={editVisible}
        onOk={() => {
            EditJudgeList();
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
        </Form>
      </Modal>
       <Modal
          title='判断删除'
          visible={visible}
          onOk={() =>
          {        
        
            DeleteJudgeList(currentRecord)
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

export default JudgeList;
