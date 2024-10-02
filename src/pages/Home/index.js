import React, { useEffect, useState } from 'react';
import './index.css'
import {
    DesktopOutlined,
    SmileOutlined,
    ContainerOutlined,
    MenuFoldOutlined,
    DeleteOutlined,
    // 心情图标
    FrownOutlined, MehOutlined

} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme, Input, Button, Checkbox, Flex, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';

import { fetchChangeData, fetchUpdataData, fetchDelData } from '../../apis/Daily';
import { fetchQuotes } from '../../apis/quotes';
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
const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};
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
    // 计划数据的状态
    const [daily, setDaily] = useState([]);
    const [change, setChange] = useState(0);
    // 引入useEffect获取计划数据
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    url: 'https://q6zv39.laf.run/get_list',
                    method: 'GET',
                });
                setDaily(res.data.list); // 只在首次渲染时获取数据
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [change]); // 确保只在组件挂载时执行


    // 获取输入框内容·
    const onSearch = (searchValue) => {
        if (searchValue !== '') {
            addDaily(searchValue);
            searchValue = ''
            // console.log(searchValue)
        } else {
            return;
        }

    };
    const addDaily = (value) => {
        // console.log(value);
        const newData = {
            value: value,
            isCompleted: false,
        };
        fetchChangeData(newData)
        setChange(change + 1)
    };

    // 完成/删除事件的逻辑
    const update = (id) => {
        fetchUpdataData(id)
        setChange(change + 1)
    };
    const del = (id) => {
        fetchDelData(id)
        setChange(change + 1)
    };
    // console.log(change)

    // 引入每日励志语句的逻辑
    const [quote, setQuote] = useState();
    useEffect(() => {
        const fetchQuoteData = async () => {
            try {
                const quoteData = await fetchQuotes();
                setQuote(quoteData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchQuoteData();
    }, []); // 空依赖数组，确保只在组件挂载时运行一次

    console.log(quote);


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
                        {/* 心情图标 */}
                        <div className='emotion'>
                            <p>当前心情</p>
                            <Flex gap="middle" vertical>
                                <Rate defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]}
                                    style={{
                                        fontSize: 36,
                                    }} />
                            </Flex>
                        </div>
                        <div className='quotes'>
                            <div className='head'>
                                <span>One sentence a Day</span>
                            </div>
                            <div className='text'>
                                <span>
                                    you are good
                                </span>
                                <Button type="primary" autoInsertSpace={false}
                                    style={{
                                        backgroundColor: '#FF9500', // 修改按钮背景色
                                        borderColor: '#FF9500' // 修改按钮边框颜色
                                    }}>
                                    <p>Next</p>
                                </Button>
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

