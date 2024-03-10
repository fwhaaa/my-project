import { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Select, Form, Message, InputNumber } from '@arco-design/web-react';
import httpServer from '../httpServer';
import useList from '../../global-hooks/use-list-hook';
import CommonModal from '../../global-hooks/use-modal-hook';


const FormItem = Form.Item;
function ExamList() {

  // const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  const [form] = Form.useForm();
  const subjectOptions = ['math', 'english'];
  const Option = Select.Option; 
  const [ options, setOptions ] = useState([]);
  const {data,deleteRecord,edit} = useList({
    getListUrl:'/exam/examManagement/list',
    deleteUrl:'/exam/examManagement/delete',
    editUrl: '/exam/examManagement/edit',
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
      title: '考试名',
      dataIndex: 'examname',
    },
    {
      title: '考试编号',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '科目',
      dataIndex: 'subject',
    },
    {
      title: '考试时长',
      dataIndex: 'time',
    },
    {
        title: '试卷编号',
        dataIndex: 'paperId',
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
      {/* <Button onClick={() =>{
        setCurrentRecord(record)
        setDeleteVisible(true)
      } 
       } type='primary' status='danger'  >
        删除
      </Button>   */}
      </div>
      ),
    },
  ];
  




  return (
    <div>
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
       <FormItem label='考试名' field='examname'  rules={[{ required: true }]}>
         <Input placeholder='' />
       </FormItem>
         <FormItem label='编号' field='id' disabled rules={[{ required: true }]}>
         <Input placeholder='' />
       </FormItem>
       <FormItem label='科目' required  disabled field='subject' rules={[{ required: true }]}>
       <Select placeholder='Please select' >
        {subjectOptions.map((option) => (
          <Option key={option}  value={option}>
            {option}
          </Option>
        ))}
      </Select>
       </FormItem>
       <FormItem field={'time'}   label='考试时长'  rules={[{ required: true,}]}>
       <InputNumber
        style={{ width: 160, margin: '10px 24px 10px 0' }}
        min={60}
        max={150}
        suffix='分钟'
        formatter={(value) => `${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')}
        parser={(value) => value.replace(/,/g, '')}
      />
        </FormItem>
       <FormItem field='paperId'  label='试卷编号' disabled rules={[{ required: true }]} >
       <Select placeholder='Please select' options={options}>
        </Select>
        </FormItem>
     </Form>
     </CommonModal>
       {/* <CommonModal type='delete' setVisible={setDeleteVisible} visible={deleteVisible} setConfirmLoading={setConfirmLoading} confirmLoading={confirmLoading} onOk={() =>
       { 
         deleteRecord(currentRecord)
       }
       } >

     </CommonModal> */}
 </div>
  );
}
export default ExamList;
