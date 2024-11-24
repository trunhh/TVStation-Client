import axios from "axios"
import fetcher from "../../fetcher"

export const signin = async (username, password) => {
    try {
        const response = await axios.post('https://localhost:7031/api/Auth/SignIn', {
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