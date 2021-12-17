import { List, Typography, Divider, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { whichRole } from "../../../common/auth";


const data_header = ["Username",  "Location"];

const MyDataList = () => {
  const data = useSelector((state) => state.userReducer)
  return (
    <Row gutter={[24, 16]} justify={"center"}>
      <Col col={12}>
        <List
          dataSource={data_header}
          size="large"
          renderItem={(item) => (
            <List.Item>
              <b>{item}</b>
            </List.Item>
          )}
        />
      </Col>

      <Col col={12}>
        <List size="large">
          <List.Item>{data.user.username}</List.Item>
          <List.Item>{data.street || <b>Empty</b>}</List.Item>
        </List>
      </Col>
    </Row>
  );
};

export default MyDataList;
