import { Card, Grid, Radio, Checkbox} from '@arco-design/web-react';
const { Row, Col } = Grid;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;




const QuestionCard = ({question, index}) => {
    console.log('question in card',question);
    const options = [
        {
            label: `A、${question.selectA}` 

        },
        {
            label: `B、${question.selectB}` 

        },
        {
            label: `C、${question.selectC}` 
        },
        {
            label: `D、${question.selectD}` 
        },
      ];
  return (
    <Row gutter={20}>
        <Col span={24}>
            <Card
            title={ `${index}、${question.stem}` }
            bordered={false}
            style={{ width: '100%' }}
            >
            {
                question.type === 'single' ?
                    <RadioGroup direction='vertical' >
                        <Radio value='a'>A、{question.selectA}</Radio>
                        <Radio value='b'>B、{question.selectB}</Radio>
                        <Radio value='c'>C、{question.selectC}</Radio>
                        <Radio value='d'>D、{question.selectD}</Radio>
                    </RadioGroup>
                :
                <CheckboxGroup direction='vertical' options={options} />



            }
        
            </Card>
        </Col>
    </Row>
  );
};

export default QuestionCard;
