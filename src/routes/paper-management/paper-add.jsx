import { useRef, useState } from 'react';
import { Form, Input, Button, Grid, Space } from '@arco-design/web-react';
import { IconArrowRise, IconArrowFall, IconDelete } from '@arco-design/web-react/icon';


  const  PaperAdd = () => {
  const [form] = Form.useForm();
  const postsState = Form.useFormState('posts', form) || {};
  console.log(postsState, '____');


  return (
    <div>
    <Form
      form={form}
      style={{ width: 600 }}
      autoComplete='off'
      initialValues={{
        users: ['Username'],
        posts: ['post1'],
      }}
      onSubmit={(v) => {
        console.log(v);
      }}
      onValuesChange={(_, v) => {
        console.log(_, v);
      }}
    >
      <Form.Item label='papername' field='papername' >
        <Input />
      </Form.Item>
      <Form.Item>
        <Form.List
          rules={[
            {
              validator(v, cb) {
                if (v?.length < 2) {
                  return cb('必须超过两条');
                }
                return cb();
              },
            },
          ]}
          field='posts'
        >
          {(fields, { add, remove, move }) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <Grid.Row key={item.key}>
                      <Form.Item
                        field={item.field}
                        label={'题目' + index}
                        style={{
                          width: 370,
                        }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Button
                        icon={<IconDelete />}
                        shape='circle'
                        status='danger'
                        style={{
                          margin: '0 20px',
                        }}
                        onClick={() => remove(index)}
                      ></Button>
                    </Grid.Row>
                  );
                })}
                <Space size={20}>
                  <Button
                    onClick={() => {
                      add();
                    }}
                  >
                    添加题目
                  </Button>
                </Space>
              </div>
            );
          }}
        </Form.List>
      </Form.Item>
      <Form.Item style={{ marginTop: 20 }}>
        <Space size={20}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button
            onClick={() => {
              form.resetFields()
            }}
          >
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </div>
  );
}
export default PaperAdd;