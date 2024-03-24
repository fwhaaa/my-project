import { useState } from "react";
import { Form, Input, Button, Message, Select } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import useAddForm from "../../../global-hooks/use-add-form-hook";
import httpServer from "../../httpServer";
const options = ["math", "english"];
const Option = Select.Option;
const FormItem = Form.Item;
const SaqAdd = () => {
  const [form] = Form.useForm();
  const { isSending, handSubmit } = useAddForm({
    form,
    url: "/question/addQuestion/saq",
  });

  return (
    <div>
      <Form
        form={form}
        style={{ maxWidth: "600px", padding: "20px", minWidth: "280px" }}
        autoComplete="off"
      >
        <FormItem
          field={"subject"}
          disabled={isSending}
          label="科目"
          rules={[{ required: true }]}
        >
          <Select placeholder="Please select">
            {options.map((option) => (
              <Option key={option} disabled={isSending} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          field={"stem"}
          disabled={isSending}
          label="题干"
          rules={[{ required: true }]}
        >
          <Input />
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}></FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          <Button
            disabled={isSending}
            loading={isSending}
            type="primary"
            onClick={handSubmit}
            icon={<IconPlus />}
          >
            提交
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
export default SaqAdd;
