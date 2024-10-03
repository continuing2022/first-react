import React, { useState } from 'react';
import './index.css'
import {
    DesktopOutlined,
    SmileOutlined,
    ContainerOutlined,


} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme, Flex, Progress, Tooltip, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';


// 输入框

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
    // 控制输入框的显示与否 
    const [showInput, setShowInput] = useState(false); // State to control visibility of InputNumber

    const handleProgressClick = () => {
        setShowInput(!showInput); // Toggle the visibility on click
    };


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
                                        <Flex gap="small" wrap>
                                            {/* 添加提示词 */}
                                            <Tooltip title="3 done / 3 in progress / 4 to do">
                                                <div onClick={handleProgressClick}>
                                                    <Progress type="circle" percent={100}
                                                        // 改变颜色
                                                        strokeColor='#FF9500'
                                                    />
                                                </div>
                                            </Tooltip>
                                        </Flex>
                                        {showInput && ( // Conditionally render InputNumber
                                            <InputNumber min={1} max={10} defaultValue={3} changeOnWheel />
                                        )}

                                        <a href='https://www.bilibili.com/video/BV14J4114768?p=6'>HTML</a>
                                    </li>
                                    <li>
                                        <Flex gap="small" wrap>
                                            <Tooltip title="3 done / 3 in progress / 4 to do">
                                                <Progress type="circle" percent={75}
                                                    strokeColor='#FF9500' />
                                            </Tooltip>
                                        </Flex>
                                        <InputNumber min={1} max={10} defaultValue={3} changeOnWheel />
                                        <a href='https://www.bilibili.com/video/BV14J4114768?p=6'>CSS</a>
                                    </li>
                                    <li>
                                        <Flex gap="small" wrap>
                                            <Tooltip title="3 done / 3 in progress / 4 to do">
                                                <Progress type="circle" percent={75}
                                                    strokeColor='#FF9500' />
                                            </Tooltip>
                                        </Flex>
                                        <a href='https://www.bilibili.com/video/BV1Y84y1L7Nn?p=8'>JavaScript</a>
                                    </li>
                                    <li>
                                        <Flex gap="small" wrap>
                                            <Tooltip title="3 done / 3 in progress / 4 to do">
                                                <Progress type="circle" percent={75}
                                                    strokeColor='#FF9500' />
                                            </Tooltip>
                                        </Flex>
                                        <a href='https://www.bilibili.com/video/BV1a34y167AZ?p=5'>Node.js</a>
                                    </li>
                                    <li>
                                        <Flex gap="small" wrap>
                                            <Tooltip title="3 done / 3 in progress / 4 to do">
                                                <Progress type="circle" percent={75}
                                                    strokeColor='#FF9500' />
                                            </Tooltip>
                                        </Flex>
                                        <a href='https://www.bilibili.com/video/BV18X4y1k74c?p=6'>算法分析与设计</a>
                                    </li>
                                    <li>
                                        <Flex gap="small" wrap>
                                            <Tooltip title="3 done / 3 in progress / 4 to do">
                                                <Progress type="circle" percent={75}
                                                    strokeColor='#FF9500' />
                                            </Tooltip>
                                        </Flex>
                                        <a href='https://www.bilibili.com/video/BV1et411b73Z?p=7'>C++</a>
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

