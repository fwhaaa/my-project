import { Card } from "@arco-design/web-react";
import { Link } from "react-router-dom";
const { Grid } = Card;

const Subject = () => {
  return (
    <Card bordered={false} style={{ width: "100%" }}>
      {["math", "english", "art", "sports", "software"].map((value, index) => {
        const hoverable = index % 2 === 0;
        return (
          <Grid
            key={index}
            hoverable={hoverable}
            style={{
              width: "300px",
            }}
          >
            <Card
              style={{
                margin: "12px",
                background: "pink",
                borderRadius: "4px",
              }}
              title="科目"
              extra={
                <Link to={`/score/management/examList/${value}`}>查看</Link>
              }
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

export default Subject;
