
import { Flex, Progress, Tooltip, InputNumber } from 'antd';
import { useState } from 'react';
export const StudyPercent = (params) => {
    // 控制输入框的显示与否 
    const [showInput, setShowInput] = useState(false);

    const handleProgressClick = () => {
        setShowInput(!showInput);
    };
    // 实现将数字框与百分比联动
    const [number, setNumber] = useState(0);

    // 更改number
    const changeNumber = (value) => {
        setNumber(value);
        console.log(value);
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

            <a href={params.url}>{params.name}</a>
        </>
    );
};
