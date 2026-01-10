import axios from "axios";
const axiosClient = axios.create({
    baseURL:"https://upskilling-egypt.com:3003/api/v1",
    timeout:5000,
    withCredentials:false,
    headers:{
        "Content-Type": "application/json"
    }
})
export default axiosClient;