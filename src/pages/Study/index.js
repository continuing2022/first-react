import React, { useEffect, useState } from 'react';
import './index.css'
import {
    DesktopOutlined,
    SmileOutlined,
    ContainerOutlined,


} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme, Flex, Progress, Tooltip, InputNumber } from 'antd';
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

    // 实现每日进度的控制
    const [plan, setPlan] = useState(0);
    useEffect(() => {
        //读取localStorage中保存的值
        const savedPlan = localStorage.getItem('plan');
        if (savedPlan) {
            setPlan(Number(savedPlan));
        }
    }, [plan])
    // 需要使用localStorage存储value的值
    const changePlan = (value) => {
        setPlan(value)
        console.log(value)
        // 修改number的值
        localStorage.setItem('plan', value);
    }

    // 控制输入框的显示与否
    const [showInput, setShowInput] = useState(false);
    const handleProgressClick = () => {
        setShowInput(!showInput);
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
                            minHeight: 700,
                            background: '#FFFFFF',
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div className='body'>

                            <p>Study-Skills</p>
                            <div className='course'>
                                <ul>
                                    <li>
                                        <StudyPercent pages={540} name="HTML" url={`https://www.bilibili.com/video/BV14J4114768?p=`} />
                                    </li>
                                    <li>
                                        <StudyPercent pages={540} name="CSS" url="https://www.bilibili.com/video/BV14J4114768?p=" />
                                    </li>
                                    <li>
                                        <StudyPercent pages={200} name="JavaSrcipt" url="https://www.bilibili.com/video/BV1Y84y1L7Nn?p=" />
                                    </li>
                                    <li>
                                        <StudyPercent pages={74} name="算法设计与分析" url="https://www.bilibili.com/video/BV18X4y1k74c?p=" />
                                    </li>
                                    <li>
                                        <StudyPercent pages={96} name="Node.js" url="https://www.bilibili.com/video/BV1a34y167AZ?p=" />
                                    </li>
                                    <li>
                                        <StudyPercent pages={314} name="C++" url="https://www.bilibili.com/video/BV1et411b73Z?p=" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='DailyStudy' >


                            <Tooltip placement="top" title={`今天已经看了${plan}集`} >
                                <Flex vertical gap="small">
                                    <div onClick={handleProgressClick}>
                                        <Progress
                                            strokeLinecap="butt"
                                            percent={(plan * 100 / 30).toFixed(2)}
                                            // 改变颜色
                                            strokeColor="#FF9500" />

                                    </div>
                                </Flex>
                            </Tooltip>

                            {showInput && (
                                <InputNumber
                                    min={0}
                                    max={30}
                                    value={plan}
                                    changeOnWheel
                                    onChange={changePlan}
                                />
                            )}
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

