import React, { useState } from 'react';
import './index.css'
import {
    DesktopOutlined,
    SmileOutlined,
    ContainerOutlined,


} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';


// 导入封装好的组件
import { StudyPercent } from '../../component'

// const onSearch = (value, _e, info) => console.log(info?.source, value);
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    // 这是左边框
    getItem('Daily', '1', <ContainerOutlined />),
    getItem('Sport', '2', <SmileOutlined />),
    getItem('Study', '3', <DesktopOutlined />),
];
const Study = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // 点击不同的窗口跳转到不同页面
    const navigate = useNavigate()
    const onJump = (key) => {
        console.log(key)
        if (key === '1') {
            navigate('/')
        } else {
            navigate(`/${key}`)
        }
        // navigate(`/{value}`)
    }


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                {/* 这是导航窗口 */}
                <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline"
                    items={items}
                    onClick={({ key }) => onJump(key)} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >

                        <Breadcrumb.Item>My-Daily-Life</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* 内容书写 */}
                    <div className='content2'
                        style={{
                            padding: 24,
                            minHeight: 500,
                            background: '#FFFFFF',
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div className='body'>

                            <p>Study-Skills</p>
                            <div className='course'>
                                <ul>
                                    <li>
                                        <StudyPercent pages={100} name="HTML" url="https://www.bilibili.com/video/BV14J4114768?p=2" />
                                    </li>
                                    <li>
                                        <StudyPercent pages={100} name="CSS" url="https://www.bilibili.com/video/BV14J4114768?p=2" />
                                    </li>
                                    <li>
                                        <StudyPercent pages={100} name="JavaSrcipt" url="https://www.bilibili.com/video/BV1Y84y1L7Nn?p=3" />
                                    </li>
                                    <li>
                                        <StudyPercent pages={100} name="算法设计与分析" url="https://www.bilibili.com/video/BV18X4y1k74c?p=3" />
                                    </li>
                                    <li>
                                        <StudyPercent pages={100} name="Node.js" url="https://www.bilibili.com/video/BV1a34y167AZ?p=2" />
                                    </li>
                                    <li>
                                        <StudyPercent pages={100} name="C++" url="https://www.bilibili.com/video/BV1et411b73Z?p=4" />
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    ©{new Date().getFullYear()} Created by Zhang
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Study;

