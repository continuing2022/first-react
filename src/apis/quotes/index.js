import axios from "axios";


export const fetchQuotes = async () => {
    try {

        const res = await axios({
            url: 'https://dummyjson.com/quotes',
            method: "GET"
        })
        return res.data.quotes
    } catch (error) {
        console.log(error)
    }
}