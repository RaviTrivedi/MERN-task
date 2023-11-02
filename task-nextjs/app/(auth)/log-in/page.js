"use client"

import axios from "axios";
import "../../assets/css/login.css"
import { Button, Form, Input } from 'antd';
import { useRouter } from "next/navigation";

export default function Login() {
    const { push } = useRouter();

    const [form] = Form.useForm()

    const onFinish = async (values) => {
        console.log('Success:', values);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, values)
        console.log("response ---", response);
        if (response && response.status === 200) {
            form.resetFields()
            push("/dashboard")
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login_form_container">
            <h1>
                Log In
            </h1>

            <Form
                layout='vertical'
                style={{
                    maxWidth: 600,
                }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your enail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
