import { Form, Input, InputNumber, Checkbox, Button, Select, message } from "antd";
import axiosInstance from "../../../common/axios";
import { useHistory } from 'react-router-dom'
import { formItemLayout, tailFormItemLayout, prefixSelector } from './layout'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { Option } = Select;

const PerformerForm = (props) => {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    const [form] = Form.useForm();
    const history = useHistory()



    const onFinish = (values) => {

        axiosInstance.post('users/registration/courier/', {
            username: values.username,
            password1: values.password,
            password2: values.password,
            city: values.city,
            email: values.email,
            street: values.street,
        }).then(res => {
            message.success("User created, please login")
            history.push('/login')
        }).catch(err => {
            var keys = Object.keys(err.response.data);
            const errors = []
            keys.forEach(function (key) {
                errors.push(err.response.data[key])
            });
            message.error(errors.map(item => <span style={{ color: 'red' }}>{item[0]}<br /></span>))
        })
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                prefix: "38",
            }}
            scrollToFirstError
        >
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

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(
                                new Error(
                                    "The two passwords that you entered do not match!"
                                )
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="username"
                label="Username"
                tooltip="What do you want others to call you?"
                rules={[
                    {
                        required: true,
                        message: "Please input your nickname!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="city"
                label="City"
                rules={[
                    {
                        required: true,
                        message: "Please input your city!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="street"
                label="Street"
                rules={[
                    {
                        required: true,
                        message: "Please input your street!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(new Error("Should accept agreement")),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <Link to="agreement" target="_blank" rel="noopener noreferrer">Agreement</Link>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PerformerForm;