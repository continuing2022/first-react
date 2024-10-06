import React, { useState, useEffect } from 'react';
import './index.css'
import {
    // 测边框 图标
    DesktopOutlined,
    SmileOutlined,
    ContainerOutlined,
    DribbbleOutlined,
    DiscordOutlined
} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';


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
        getItem('Sport', '4', <DribbbleOutlined />),
        getItem('Game', '5', <DiscordOutlined />),
    ]),
    getItem('Study', '3', <DesktopOutlined />),

];
// 数据
const amuse = ([
    {
        title: 'The Favorite Sport',
        style: 'basketabll',
        text: '这是我接触的第一个运动，也是我最喜欢的运动。它能给我带来流汗的快感，以及压力的释放。我已经记不清有多少让我热血沸腾的画面了。'
    },
    {
        title: 'The Favorite Game',
        style: '王者荣耀',
        text: '直到现在玩这款游戏，已经六七年了。它是连接我和远方朋友的方式，也是消解压力的方式。如今这也是我和女朋友的娱乐方式啦 哈哈哈'

    }
])
const Amuse = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    // 获取传递的id
    const [searchParam] = useSearchParams()
    const param = searchParam.get('id')
    // console.log(param)
    // 使用变量接收
    const [data, setData] = useState(amuse[0]); // 使用 null 或适合的数据类型初始化
    // 点击不同的窗口跳转到不同页面
    const navigate = useNavigate()
    const onJump = (key) => {
        // console.log(key)
        if (key === '1') {
            navigate('/')
        } else if (key === '3') {
            navigate(`/3`)

        } else {
            navigate(`/2/?id=${key}`)
        }

    }
    // 图片url
    const [url, setUrl] = useState(4);
    useEffect(() => {
        // 检查 param 并根据条件设置数据
        if (param === '4') {
            setData(amuse[0]);
            setUrl(4)
        } else if (param === '5') {
            setData(amuse[1]);
            setUrl(5)
        }
    }, [param]); // 只有当 param 变化时才会触发 effect

    console.log(data);
    console.log(url)

    return (

        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                {/* 这是导航窗口 */}
                <Menu theme="dark" defaultSelectedKeys={['4']} mode="inline"
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

                        <Breadcrumb.Item>{data.title}</Breadcrumb.Item>
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
                            {data ? (
                                <>
                                    {url === 4 ?
                                        <img src={`/assets/img/篮球4.png`} alt='' /> :
                                        <img src={`/assets/img/篮球5.png`} alt='' />
                                    }
                                    {/* {(url === 4)?<img src={`./assets/img/篮球4.png`} alt='' />:<img src={`./assets/img/篮球5.png`} alt='' />} */}
                                    <div className='text'>
                                        <span>{data.title}</span>
                                        <h2>{data.style}</h2>
                                        <p>{data.text}</p>
                                    </div>
                                </>
                            ) : (
                                <p>Loading...</p> // 处理数据未准备好时的情况
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
export default Amuse;

