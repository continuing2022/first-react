import React, { useState } from 'react';
import './index.css'
import {
    DesktopOutlined,
    SmileOutlined,
    ContainerOutlined,
} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
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
    getItem('Amuse', '2', <SmileOutlined />, [
        getItem('Sport', '4'),
        getItem('Game', '5'),

    ]),
    getItem('Study', '3', <DesktopOutlined />),

];
const Amuse = () => {
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
        } if (key === '3') {
            navigate(`/3`)
        } else {
            navigate('/2')
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
                <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline"
                    items={items}
                    onClick={({ key }) => onJump(key)} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        color: 'white',
                        fontSize: '24px'
                    }}
                >
                    <span>Amuse Pages</span>
                </Header>
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
                    <div className='content3'
                        style={{
                            padding: 24,
                            minHeight: 700,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div className='basketabll'>
                            <img src='./assets/img/篮球.png' alt='' />
                            <div className='text'>
                                <span>The Enlightenment Sport</span>
                                <h2>basketabll</h2>
                                <p>这是我接触的第一个运动，也是我最喜欢的运动。它能给我带来流汗的快感，以及压力的释放。</p>
                            </div>

                        </div>


                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Amuse;

