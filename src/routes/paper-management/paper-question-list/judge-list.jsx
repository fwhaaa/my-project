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
const RadioGroup = Radio.Group;
import httpServer from "../../httpServer";

const FormItem = Form.Item;
function JudgeList(props) {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const { questionList, setQuestionList } = props;
  const [currentRecord, setCurrentRecord] = useState(undefined);
  const [data, setData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { metaInfo, setMetainfo } = props;
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
      url: `/question/questionList/judge?subject=${metaInfo.subject}`,
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
    getList();
  }, []);

  const Columns = [
    {
      title: "科目",
      dataIndex: "subject",
    },
    {
      title: "编号",
      dataIndex: "id",
    },

    {
      title: "题干",
      dataIndex: "stem",
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
      // setQuestionList([...questionList,{
      //   questionId: currentRecord.id,
      //   ...currentRecord,
      //   rightAnswer: rightAnswer,
      //   type: 'judge',
      // }])

      // setTimeout(() => {
      //   Message.success('Success !');
      //   setEditVisible(false);
      //   setConfirmLoading(false);
      // }, 1500);
      if (
        questionList?.some(
          (v) => v.type === "judge" && v.questionId === currentRecord.id
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
            type: "judge",
          },
        ]);
        setTimeout(() => {
          Message.success("Success !");
          setEditVisible(false);
          setConfirmLoading(false);
        }, 1500);
      }
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
              <Radio value="true">正确</Radio>
              <Radio value="false">错误</Radio>
            </Radio.Group>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}
export default JudgeList;
