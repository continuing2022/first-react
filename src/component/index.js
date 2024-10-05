
import { Flex, Progress, Tooltip, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
export const StudyPercent = (params) => {
    // 控制输入框的显示与否 
    const [showInput, setShowInput] = useState(false);
    useEffect(() => {
        // 读取 localStorage 中的保存值
        const savedNumber = localStorage.getItem(`${params.name}`);
        if (savedNumber) {
            setNumber(Number(savedNumber));
        }
    }, [params.name]);


    const handleProgressClick = () => {
        setShowInput(!showInput);
    };
    // 实现将数字框与百分比联动
    const [number, setNumber] = useState(0);

    // 更改number
    const changeNumber = (value) => {
        setNumber(value);
        console.log(value);
        // 修改number的值
        localStorage.setItem(`${params.name}`, value);
    }

    return (
        < >
            <Flex gap="small">
                {/* 添加提示词 */}
                <Tooltip title={`当前${params.name}课程看到第${number}集`}>
                    <div onClick={handleProgressClick}>
                        <Progress
                            type="circle"
                            percent={(number * 100 / params.pages).toFixed(2)}
                            // 改变颜色
                            strokeColor="#FF9500"
                        />
                    </div>
                </Tooltip>
            </Flex>

            {showInput && (
                <InputNumber
                    min={0}
                    max={params.pages}
                    value={number}
                    changeOnWheel
                    onChange={changeNumber}
                />
            )}

            <a href={params.url + number}>{params.name}</a>
        </>
    );
};
