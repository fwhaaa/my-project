import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Message,
  Radio,
} from "@arco-design/web-react";
import httpServer from "../../httpServer";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
function SingleList(props) {
  const [visible, setVisible] = useState(false);
  const { questionList, setQuestionList } = props;
  const [editVisible, setEditVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(undefined);
  const [data, setData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { metaInfo, setMetainfo } = props;
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
      url: `/question/questionList/singleChoice?subject=${metaInfo.subject}`,
      method: "GET",
    })
      .then((res) => {
        console.log("----res", res);
        let respData = res.data;
        if (res.status === 200 && respData.respCode === 1) {
          setData(res.data.results);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  useEffect(() => {
    getQuestionList();
  }, []);

  const Columns = [
    {
      title: "科目",
      dataIndex: "subject",
    },
    {
      title: "题干",
      dataIndex: "stem",
    },
    {
      title: "选项A",
      dataIndex: "selectA",
    },
    {
      title: "选项B",
      dataIndex: "selectB",
    },
    {
      title: "选项C",
      dataIndex: "selectC",
    },
    {
      title: "选项D",
      dataIndex: "selectD",
    },

    {
      title: "操作",
      dataIndex: "op",
      render: (_, record) => (
        <div>
          <Button
            onClick={() => {
              setCurrentRecord(record);
              form.setFieldsValue(record);
              setEditVisible(true);
            }}
            type="primary"
            status="default"
          >
            添加
          </Button>
        </div>
      ),
    },
  ];

  async function addQuestion(props) {
    form.validate().then(async () => {
      setConfirmLoading(true);
      console.log("formdata", form.getFieldsValue());
      console.log("currentrecord", currentRecord);
      const rightAnswer = form.getFieldsValue().rightAnswer;
      console.log("rightanswer", rightAnswer);
      // if(questionList.map())
      // const isexist = questionList?.some((v)=> v.type === 'single' && v.questionId ===  currentRecord.id)
      if (
        questionList?.some(
          (v) => v.type === "single" && v.questionId === currentRecord.id
        )
      ) {
        Message.warning("该题目已存在");
        setConfirmLoading(false);
      } else {
        setQuestionList([
          ...questionList,
          {
            questionId: currentRecord.id,
            ...currentRecord,
            rightAnswer: rightAnswer,
            type: "single",
          },
        ]);
        setTimeout(() => {
          Message.success("Success !");
          setEditVisible(false);
          setConfirmLoading(false);
        }, 1500);
      }

      // console.log('----------------isexist',isexist);
    });
  }
  return (
    <div>
      <Table rowKey="id" columns={Columns} data={data} />
      <Modal
        title="设置正确答案"
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
            style: { flexBasis: "calc(100% - 90px)" },
          }}
        >
          <FormItem
            label="正确答案"
            field="rightAnswer"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio value="c">C</Radio>
              <Radio value="d"> D </Radio>
            </Radio.Group>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}
export default SingleList;
