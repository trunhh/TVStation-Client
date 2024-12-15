import axios from "axios"
import fetcher from "../../fetcher"
import { SIGNIN_API } from "../../../constants/apiConstants"

export const signin = async (username, password) => {
    try {
        const response = await axios.post(SIGNIN_API, {
            username: username,
            password: password
        })
        console.log(response)
        return {success: true, data: response.data}
    }catch(err){
        console.log(err)
        return {success: false, error: err.response.data}
    }
}

export const getInfo = async username => {
    const response = await fetcher.get('/User', {
        params: {
            username: username
        }
    })
}