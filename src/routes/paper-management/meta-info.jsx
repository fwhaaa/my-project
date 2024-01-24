import { Form, Input, Button, InputNumber, Select } from '@arco-design/web-react';
const FormItem = Form.Item;

const PaperMetaInfo = (props) => {
    const {hasClickButton, setHasClickButton} = props;
    const [form] = Form.useForm();
    const postsState = Form.useFormState('posts', form) || {};
    console.log(postsState, '____');
    const {metaInfo,setMetaInfo} = props;
    const options = ['math', 'english'];
    const Option = Select.Option;

    return (
    <div>
        <Form form={form} style={ { width: 600 }} autoComplete='off' >
        <FormItem label='试卷科目' field='subject' rules={[{ required: true }]}>
        <Select
        placeholder='Please select'

      >
        {options.map((option) => (
          <Option key={option}  value={option}>
            {option}
          </Option>
        ))}
      </Select>
        </FormItem>
        <FormItem label='试卷名称' field='papername' rules={[{ required: true }]}>
            <Input placeholder='' />
        </FormItem>
        <FormItem label='单选题分值' field='singlescore' rules={[{ required: true }]}>
        <InputNumber
            placeholder='Please enter'
            min={1}
            max={5}
        />
        </FormItem>
        <FormItem label='多选题分值' field='multiplescore' rules={[{ required: true }]}>
        <InputNumber
            placeholder='Please enter'
            min={1}
            max={5}
        />
        </FormItem>
        <FormItem label='判断题分值' field='judgescore' rules={[{ required: true }]}>
        <InputNumber
            placeholder='Please enter'
            min={1}
            max={5}
        />
        </FormItem>
        <FormItem label='简答题分值' field='saqscore' rules={[{ required: true }]}>
        <InputNumber
            placeholder='Please enter'
            min={0}
            max={15}
        />
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
            <Button type='primary' onClick={()=>{
                form.validate().then(async () => {
                    const metainfo= form.getFieldsValue();
                    console.log('metainfo',metainfo);
                    setMetaInfo(metainfo)
                    setHasClickButton(true);
                })
            }}>确认</Button>
        </FormItem>
        </Form>
    </div>
    );
}
export default PaperMetaInfo;