"use client"

import { Inter } from 'next/font/google'
import { useState } from 'react';
import "../assets/css/dashboard.css"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import Department from '../../components/Department';
import Employee from '@/components/Employee';
const { Header, Sider, Content } = Layout;

const inter = Inter({ subsets: ['latin'] })

const routes = [
    {
        id: "1",
        route: "departments",
        component: <Department />
    },
    {
        id: "2",
        route: "employees",
        component: <Employee />
    }
]

export default function RootLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [currActiveTab, setCurrActiveTab] = useState()

    return (
        <>
            <Layout className='layout_container' hasSider={true}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'Departments',
                                onClick: ({ item, key, keyPath, domEvent }) => {
                                    setCurrActiveTab(key)
                                }
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'Employees',
                                onClick: ({ item, key, keyPath, domEvent }) => {
                                    setCurrActiveTab(key)
                                }
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: "#fff",
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {
                            routes.map((route) => {
                                if (route.id === currActiveTab) {
                                    return route.component
                                } else {
                                    <div>{children}</div>
                                }
                            })
                        }
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
