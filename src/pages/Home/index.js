import React, { useEffect, useState } from 'react';
import './index.css'
import {
    DesktopOutlined,
    SmileOutlined,
    ContainerOutlined,
    // 每日head图标
    MenuFoldOutlined,
    // 删除图标
    DeleteOutlined,
    // 心情图标
    FrownOutlined,
    MehOutlined,
    // 联系图标
    GithubOutlined,
    WeiboCircleOutlined,
    WechatOutlined,
    YoutubeOutlined,
    QqOutlined

} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme, Input, Button, Checkbox, Flex, Rate, Popconfirm } from 'antd';
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
// 心情
const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};

// 边框菜单
const items = [
    // 这是左边框
    getItem('Daily', '1', <ContainerOutlined />),
    getItem('Amuse', '2', <SmileOutlined />),
    getItem('Study', '3', <DesktopOutlined />),
];
// 心情表达
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
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
    // 添加日常计划
    const addDaily = (value) => {
        // console.log(value);
        const newData = {
            value: value,
            isCompleted: false,
        };
        fetchChangeData(newData)
        setChange(change + 1)
    };

    // 更新事件的逻辑
    // 使用对象存储 accomplish 状态，每个 _id 作为键
    const [accomplishStates, setAccomplishStates] = useState({});
    const update = (id) => {
        fetchUpdataData(id)
        setChange(change + 1)
        // 切换对应 id 的 accomplish 状态
        setAccomplishStates((prev) => ({
            ...prev,
            [id]: !prev[id], // 切换指定项的状态
        }));
    };
    // 删除事件的逻辑
    const del = (id) => {
        fetchDelData(id)
        setChange(change + 1)
    };
    // console.log(change)

    // 心情表达 默认
    const [value, setValue] = useState(3);
    // 引入每日励志语句的逻辑
    const [quotes, setQuotes] = useState();
    useEffect(() => {
        const fetchQuoteData = async () => {
            try {
                const quoteData = await fetchQuotes();
                setQuotes(quoteData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchQuoteData();
    }, []); // 空依赖数组，确保只在组件挂载时运行一次

    // console.log(quotes);
    // 实现句子自动跳转
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        // 设置定时器 每五秒切换图片
        const interval = setInterval(() => {
            setCurrent((prevIndex) => {
                return (prevIndex + 1) % quotes?.length;
            });
        }, 10000);
        // 清除定时器
        return () => {
            clearInterval(interval);
        };
    }, [quotes?.length])
    // console.log(quotes[current])
    console.log(current)
    // 点击next按钮实现跳转 
    const NextQuotes = () => {
        setCurrent((prevIndex) =>
            (prevIndex + 1) % quotes?.length);
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
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
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
                    <span>Home Pages</span>
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
                    <div className='content'
                        style={{
                            padding: 24,
                            minHeight: 600,
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
                                        const isAccomplished = accomplishStates[data._id] || false; // 默认状态为 false
                                        return (
                                            // className = {`plans ${!accomplish ? 'updateColor' : ' '}`
                                            <div className={`plans`}

                                                key={data._id}
                                                style={{
                                                    backgroundColor: isAccomplished ? '#F0F0F0' : 'transparent', // 设置背景色为灰色
                                                }}>
                                                <Checkbox
                                                    onClick={() => update(data._id)}
                                                    checked={isAccomplished} // 控制 Checkbox 的选中状态
                                                >
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
                            <Flex gap="middle" vertical className='emo'>
                                <Rate tooltips={desc} onChange={setValue} value={value} defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]}
                                    style={{
                                        fontSize: 36,
                                    }} />
                                {value ? <span className='span'>{desc[value - 1]}</span> : null}
                            </Flex>
                        </div>
                        <div className='quotes'>
                            <div className='head'>
                                <span>One sentence a Day</span>
                            </div>
                            <div className='text'>
                                <div className='text-quotes'>
                                    <span>
                                        {quotes && quotes[current] ? quotes[current].quote : 'No quote available'}
                                    </span>
                                    <p>————{quotes && quotes[current] ? quotes[current].author : 'No quote available'}</p>
                                </div>


                                <Button type="primary" autoInsertSpace={false}
                                    style={{
                                        backgroundColor: '#FF9500', // 修改按钮背景色
                                        borderColor: '#FF9500' // 修改按钮边框颜色
                                    }}
                                    onClick={NextQuotes}>
                                    <p>Next</p>
                                </Button>
                            </div>
                        </div>
                        <div className='look'>
                            {/* 渲染 customIcons 中所有的图标 */}
                            <Popconfirm
                                title="Prompt"
                                // 这个是描述
                                description="GitHub:continuing2022"
                                // onConfirm={confirm}
                                onOpenChange={() => console.log('open change')}
                            >
                                <div className='Icon'>

                                    <GithubOutlined
                                        style={{
                                            fontSize: 50,
                                        }} />
                                    <p>GitHub</p>
                                </div>
                            </Popconfirm>

                            <Popconfirm
                                title="Prompt"
                                // 这个是描述
                                description="Weibo:顾小姐喜欢我"
                                // onConfirm={confirm}
                                onOpenChange={() => console.log('open change')}
                            >
                                <div className='Icon'>

                                    <WeiboCircleOutlined
                                        style={{
                                            fontSize: 50,
                                        }} />
                                    <p>WeiBo</p>
                                </div>
                            </Popconfirm>

                            <Popconfirm
                                title="Prompt"
                                // 这个是描述
                                description="WeChat:Continue0503"
                                // onConfirm={confirm}
                                onOpenChange={() => console.log('open change')}
                            >
                                <div className='Icon'>

                                    <WechatOutlined
                                        style={{
                                            fontSize: 50,
                                        }} />
                                    <p>WeChat</p>
                                </div>
                            </Popconfirm>

                            <Popconfirm
                                title="Prompt"
                                // 这个是描述
                                description="YouTube:kainengzhang35@gmail.com"
                                // onConfirm={confirm}
                                onOpenChange={() => console.log('open change')}
                            >
                                <div className='Icon'>

                                    <YoutubeOutlined
                                        style={{
                                            fontSize: 50,
                                        }} />
                                    <p>YouTube</p>
                                </div>
                            </Popconfirm>


                            <Popconfirm
                                title="Prompt"
                                // 这个是描述
                                description="QQ:154560489"
                                // onConfirm={confirm}
                                onOpenChange={() => console.log('open change')}
                            >
                                <div className='Icon' >

                                    <QqOutlined
                                        style={{
                                            fontSize: 50,
                                        }} />
                                    <p>QQ</p>

                                </div>
                            </Popconfirm>
                        </div>
                    </div>

                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    ©{new Date().getFullYear()} Created by zhang
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Home;

