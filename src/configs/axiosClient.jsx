import axios from "axios";


const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

axiosClient.interceptors.request.use((config) => {
    // const token = localStorage.getItem('token');
    // const rol = localStorage.getItem('rol'); 
    // config.headers.token = token;
    // config.headers.rol = rol; 
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
});

export default axiosClient;