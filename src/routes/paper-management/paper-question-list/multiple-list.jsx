import { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Form, Message, Radio, Checkbox } from '@arco-design/web-react';

import httpServer from '../../httpServer';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const options = [
  {
    label: 'A',
    value: 'a',
  },
  {
    label: 'B',
    value: 'b',
  },
  {
    label: 'C',
    value: 'c',
  },
  {
    label: 'D',
    value: 'd',
  },
];

function MultipleList(props){
  const {questionList,setQuestionList} = props;
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
          添加
        </Button> 
        </div>
      ),
    },
  ];

  async function addQuestion(){
    form.validate().then(async () => {
      setConfirmLoading(true);
      console.log('formdata',form.getFieldsValue());
      console.log('currentrecord',currentRecord);
      const rightAnswer = (form.getFieldsValue()).rightAnswer
      setQuestionList([...questionList,{
        questionId: currentRecord.id,
        ...currentRecord,
        rightAnswer: rightAnswer.join(','),
        type: 'multiple',
      }])
      
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
        title='设置正确答案'
        visible={editVisible}
        onOk={() => {
          addQuestion();
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
             <FormItem label='正确答案' field='rightAnswer'  rules={[{ required: true }]}>
             <CheckboxGroup
                options={options}
                style={{ display: 'block'}}
              />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default MultipleList;
