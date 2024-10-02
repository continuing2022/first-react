import React, { useEffect, useState } from 'react';
import './index.css'
import {
    DesktopOutlined,
    SmileOutlined,
    ContainerOutlined,
    MenuFoldOutlined,
    DeleteOutlined,

} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

import { fetchChangeData, fetchUpdataData, fetchDelData } from '../../apis/Daily';
import axios from 'axios';

// 输入框
const { Search } = Input;
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
const Home = () => {
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

    // 完成每日计划的渲染 开始
    const [daily, setDaily] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    url: 'https://q6zv39.laf.run/get_list',
                    method: 'GET',
                });
                setDaily(res.data.list);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [daily]);


    // 获取输入框内容·
    const onSearch = (searchValue) => {
        if (searchValue !== '') {
            addDaily(searchValue);
            searchValue = ''
            console.log(searchValue)
        } else {
            return;
        }

    };
    const addDaily = (value) => {
        console.log(value);
        const newData = {
            value: value,
            isCompleted: false,
        };
        fetchChangeData(newData)
    };

    //添加完成事件的效果

    const update = (id) => {
        fetchUpdataData(id)

    };


    const del = (id) => {
        fetchDelData(id)

    };
    // 完成每日计划的渲染 结束  

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                {/* 这是导航窗口 */}
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
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
                    <div className='content'
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div className='plan'>
                            <div className='head'>
                                <div className='num'>
                                    <span>{daily?.length}</span>
                                    <p>提醒</p>
                                </div>
                                <MenuFoldOutlined style={{ fontSize: '20px', color: '#FF9500' }} />
                            </div>

                            <div className='search'>
                                <Search
                                    placeholder="添加每日计划"
                                    allowClear
                                    size="large"
                                    //点击搜索图标、清除图标，或按下    的回调
                                    onSearch={onSearch}
                                    style={{

                                        width: 270,
                                        // hoverBorderColor: '#FF9500',
                                        // activeBorderColor: '#FF9500',
                                        // hoverBg: '#FF9500',
                                    }}
                                    // 改变按钮的颜色
                                    enterButton={<Button type="primary" style={{ backgroundColor: '#FF9500', borderColor: '#FF9500' }}
                                    >Add</Button>}

                                />

                            </div>
                            <div className='Daily-plan'>
                                {/* 渲染组件 */}
                                {
                                    daily?.map((data) => {
                                        return (
                                            <div className='plans'
                                                key={data._id}>
                                                <Checkbox
                                                    onClick={() => update(data._id)}>
                                                    {data.value}
                                                </Checkbox>
                                                <DeleteOutlined onClick={() => del(data._id)}
                                                    style={{ fontSize: '16px', color: '#FF9500' }} />

                                            </div>
                                        )
                                    })
                                }

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
export default Home;

