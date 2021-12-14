import { Form, Input, Image, Select, Row, Col, Button, message } from "antd";
import ImageUpload from "./../../../common/ImageUpload";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../common/axios";
import { url } from "../../../common/url";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const CustomerSettings = () => {
  const data = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onFinish = (values) => {
    axiosInstance.patch('/users/me', {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
    })
      .then(response => {
        dispatch({ type: "SET_USER", payload: { ...response.data, role: data.role, username: data.username, on_site: data.on_site } });
        localStorage.setItem('user', JSON.stringify({ ...response.data, role: data.role, username: data.username, on_site: data.on_site }));
        message.success("Data is update")
      })
      .catch(err => {
        var keys = Object.keys(err.response.data);
        const errors = []
        keys.forEach(function (key) {
          errors.push(err.response.data[key])
        });
        message.error(errors.map(item => <span style={{ color: 'red' }}>{item[0]}<br /></span>))
      });
  };



  return (
    <>
      <ChangePasswordModal visible={visible} setVisible={setVisible} />
      <Row>
        <h1>Settings</h1>
      </Row>
      <Row justify={"space-around"}>
        <Col col={18}>
          <Form
            {...formItemLayout}
            form={form}
            name="settings"
            onFinish={onFinish}
            initialValues={{ ...data, prefix: "38" }}
            scrollToFirstError
            style={{ width: "100%" }}
          >
            <Form.Item
              name="first_name"
              label="First name"
              rules={[
                {
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Last name"
              rules={[
                {
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>


            <Row justify={"center"}>
              <Col col={12}>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="text" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
              <Col col={12}>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="link" onClick={() => setVisible(true)}>
                    Change password
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CustomerSettings;
