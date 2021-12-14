import axios from "axios";
import store from './../store/store'
import { url } from './url'

const axiosInstance = axios.create({
    baseURL: `${url}/api/`, 
    headers: {
        'Authorization': "Token " + localStorage.getItem('key'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


export default axiosInstance;