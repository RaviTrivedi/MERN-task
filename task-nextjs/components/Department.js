"use client"

import axios from "axios";
import "../app/assets/css/department.css"
import { Button, Flex, Form, Input, Modal, notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
const { confirm } = Modal;

export default function Department() {

    const [form] = Form.useForm()
    const [editForm] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModel, setIsEditModel] = useState(false);
    const [allDepartments, setAllDepartments] = useState([]);
    const [currEditData, setCurrEditData] = useState({});


    const getAllDepartments = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/department`)
        if (response && response.status === 200) {
            setAllDepartments(response.data)
        }
    }

    useEffect(() => {
        getAllDepartments()
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEditModel(false)
    };
    const onEditFinish = async (values) => {
        console.log('Success:', values);
        console.log('currEditData:', currEditData);
        debugger
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/department/${currEditData._id}`, values)
        if (response && response.status === 200) {
            editForm.resetFields()
            setIsEditModel(false);
            getAllDepartments()
            notification.success({
                message: "Successfully Edited Department"
            })
        } else {
            notification.error({
                message: "Error while Edit Department"
            })
        }

    };
    const onAddFinish = async (values) => {
        console.log('Success:', values);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/department`, values)
        if (response && response.status === 200) {
            form.resetFields()
            setIsModalOpen(false);
            setAllDepartments((prev) => [...prev, values])
            notification.success({
                message: "Successfully Added Department"
            })
        } else {
            notification.error({
                message: "Error while Adding Department"
            })
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleEditModel = (data) => {
        editForm.setFieldsValue({
            name: data.name
        })
        setIsEditModel(true)
        setCurrEditData(data)
    }


    const handleDeleteModel = (data) => {
        confirm({
            title: 'Are you sure delete this department?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                debugger
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/department/${data._id}`)
                if (response && response.status === 200) {
                    // setIsModalOpen(false);
                    const filteredDeparts = allDepartments.filter((depart) => depart._id !== data._id)
                    setAllDepartments(filteredDeparts)
                    notification.success({
                        message: "Successfully Deleted Department"
                    })
                } else {
                    notification.error({
                        message: "Error while Adding Department"
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
            title: '',
            dataIndex: '',
            key: '',
            render: () => <></>
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            render: (data) => {
                console.log("data ---", data);
                return <>
                    <Flex gap="small" wrap="wrap">
                        <Button type="primary" onClick={() => handleEditModel(data)}>Edit</Button>
                        <Button danger onClick={() => handleDeleteModel(data)}>Delete</Button>
                    </Flex>
                </>
            },
        },

    ];

    return (
        <>
            <Button type="primary" onClick={showModal} size="large">
                Add Department
            </Button>
            <Modal title="Add Department" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <br />
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={onAddFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Department"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Department!',
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
            <TableComponent dataSource={allDepartments} columns={columns} />
            <Modal title="Edit Department" open={isEditModel} onCancel={handleCancel} footer={null}>
                <br />
                <Form
                    layout='vertical'
                    form={editForm}
                    onFinish={onEditFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Department"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Department!',
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
