import { Card } from '@arco-design/web-react';
import { Link } from "react-router-dom";
const { Grid } = Card;

const ScorePaperList = () => {
    console.log('enterscorepaperlist');
  return (
    <Card bordered={false} style={{ width: '100%' }}>
      {['math', 'english','art','sports','software'].map((value, index) => {
        const hoverable = index % 2 === 0;
        return (
          <Grid
            key={index}
            hoverable={hoverable}
            style={{
              width: '300px',
            }}
          >
              <Card
                    className='card-demo-in-grid'
                    title='科目'
                    extra={<Link  to={`/score/management/markingList/${value}`}>查看</Link>}
                    bordered={false}
                  >
                    {value}
                  </Card>
          </Grid>
        );
      })}
    </Card>

  );
};

export default ScorePaperList;