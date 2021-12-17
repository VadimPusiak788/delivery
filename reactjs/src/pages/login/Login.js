import { React } from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./css/index.css";
import { Link, useHistory } from 'react-router-dom'
import axiosInstance from './../../common/axios'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from './../../common/url'

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    axios.post(`${url}api/login/`, { //TODO: before prod change this link
      username: values.username,
      // email: values.email,
      password: values.password
    }).then(response => {
      axiosInstance.defaults.headers['Authorization'] = "Token " + response.data.key;
      localStorage.setItem('key', response.data.key);
      localStorage.setItem("isLogged", true)
      dispatch({ type: "SET_LOGIN", payload: true })
      history.push("/");
    }).catch(err => {
      message.error(err.response.data.detail)
      console.log(err.response.data)
    });


  };

  return (
    <Row className="login-row" justify={"space-between"}>
      <Col className="image-background" span={14}>
      </Col>
      <Col className="login-col" span={10}>
        <Card title="Welcome back !" style={{ width: "35rem" }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
{/* 
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item> */}

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <Link to="/registration">&nbsp;Or register now</Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
