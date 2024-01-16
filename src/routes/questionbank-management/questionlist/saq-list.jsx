import { useContext, useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Form, Message } from '@arco-design/web-react';
import { saqContext, saqDispatchContext } from '../globalContext';

const FormItem = Form.Item;
function SaqList() {
  const dispatch =useContext(saqDispatchContext)
  const task = useContext(saqContext);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  const [data, setData] = useState(task);
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
    setData(task)
  },[task])
  

  const Columns = [
  
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
  
  
  async function DeleteList(item){
    await dispatch (
     {
      type: 'delete',
      id: item.stem
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

  return (
    <div>
      <Table
        rowKey='id'
        columns={Columns}
        data={task}
      />
        <Modal
        title='判断修改'
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
        </Form>
      </Modal>
       <Modal
          title='判断删除'
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
            确认删除题目?
          </p>
        </Modal>
    </div>
  );
}

export default SaqList;
