import axios from "axios";

export const fetchData = async () => {
    try {
        const res = await axios({
            url: 'https://q6zv39.laf.run/get_list',
            method: 'GET'
        });
        return res.data.list; // 返回数据列表
    } catch (error) {
        console.log(error);
    }
};


export const fetchChangeData = async (paras) => {
    try {
        await axios({
            url: "https://q6zv39.laf.run/add-todo",
            method: "POST",
            data: paras,
        })
    } catch (error) {
        console.log(error)
    }
}

export const fetchUpdataData = async (id) => {
    try {
        await axios({
            url: "https://q6zv39.laf.run/update_todo",
            method: "POST",
            data: { id },
        })
    } catch (error) {
        console.log(error)
    }
}

export const fetchDelData = async (id) => {
    try {
        await axios({
            url: "https://q6zv39.laf.run/del_todo",
            method: "POST",
            data: { id },
        })
    } catch (error) {
        console.log(error)
    }
}