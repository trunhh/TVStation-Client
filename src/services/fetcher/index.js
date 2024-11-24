import axios from 'axios';

const defaultOtions = {
    baseUrl:process.env.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

const fetcher = axios.create(defaultOtions);

fetcher.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config;
})

fetcher.interceptors.response.use(
    function(response) {
        return response
    },
    function(error) {
        return error;
    }
)

export default fetcher;



