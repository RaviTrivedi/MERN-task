"use client"

import axios from "axios";
import "../app/assets/css/department.css"
import { Button, Flex, Form, Input, Modal, notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
const { confirm } = Modal;

export default function Employee() {

    const [form] = Form.useForm()
    const [editForm] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModel, setIsEditModel] = useState(false);
    const [allEmployee, setAllEmployee] = useState([]);
    const [currEditData, setCurrEditData] = useState({});
    const [searchString, setSearchString] = useState("");

    const getAllEmployee = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employee`)
        if (response && response.status === 200) {
            setAllEmployee(response.data)
        }
    }

    useEffect(() => {
        getAllEmployee()
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEditModel(false)
    };
    const onEditFinish = async (values) => {

        const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/${currEditData._id}`, values)
        if (response && response.status === 200) {
            editForm.resetFields()
            setIsEditModel(false);
            getAllEmployee()
            notification.success({
                message: "Successfully Edited employee"
            })
        } else {
            notification.error({
                message: "Error while Edit employee"
            })
        }

    };
    const onAddFinish = async (values) => {
        console.log('Success:', values);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employee`, values)
        if (response && response.status === 200) {
            form.resetFields()
            setIsModalOpen(false);
            setAllEmployee((prev) => [...prev, values])
            notification.success({
                message: "Successfully Added employee"
            })
        } else {
            notification.error({
                message: "Error while Adding employee"
            })
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleEditModel = (data) => {
        editForm.setFieldsValue({
            name: data.name,
            location: data.location
        })
        setIsEditModel(true)
        setCurrEditData(data)
    }


    const handleDeleteModel = (data) => {
        confirm({
            title: 'Are you sure delete this employee?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                debugger
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/${data._id}`)
                if (response && response.status === 200) {
                    const filteredDeparts = allEmployee.filter((depart) => depart._id !== data._id)
                    setAllEmployee(filteredDeparts)
                    notification.success({
                        message: "Successfully Deleted employee"
                    })
                } else {
                    notification.error({
                        message: "Error while Adding employee"
                    })
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            render: (data) => {
                return <>
                    <Flex gap="small" wrap="wrap">
                        <Button type="primary" onClick={() => handleEditModel(data)}>Edit</Button>
                        <Button danger onClick={() => handleDeleteModel(data)}>Delete</Button>
                    </Flex>
                </>
            },
        },

    ];


    const handleSearch = async () => {
        if (searchString) {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search/employee?title=${searchString}`)
            if (response && response.status === 200) {
                setAllEmployee(response.data)
            } else {
                notification.error({
                    message: "Error while Searching employee"
                })
            }
        }

    }

    return (
        <>
            <div>
                <div style={{
                    display: "inline-block"
                }}>
                    <Button type="primary" onClick={showModal} size="large">
                        Add Employee
                    </Button>
                </div>
                <div style={{
                    float: "right",
                }}>
                    <Input
                        size="large"
                        style={{
                            width: "300px",
                        }}
                        onChange={(e) => {
                            if (e.target.value) {
                                setSearchString(e.target.value)
                            } else {
                                getAllEmployee()
                            }
                        }
                        }
                    />
                    <Button type="primary" onClick={handleSearch} size="large">
                        Filter
                    </Button>
                </div>

            </div>

            <Modal title="Add Employee" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <br />
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={onAddFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[
                            {
                                required: true,
                                message: 'Please input location!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <TableComponent dataSource={allEmployee} columns={columns} />
            <Modal title="Edit Department" open={isEditModel} onCancel={handleCancel} footer={null}>
                <br />
                <Form
                    layout='vertical'
                    form={editForm}
                    onFinish={onEditFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[
                            {
                                required: true,
                                message: 'Please input location!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                            Edit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    )
}
