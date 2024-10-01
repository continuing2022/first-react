import axios from "axios";

export const fetchData = async () => {
    try {
        const res = await axios({
            url: 'https://q6zv39.laf.run/get_list',
            method: 'get'
        })
        return res.data
    } catch (error) {
        console(error)
    }
}