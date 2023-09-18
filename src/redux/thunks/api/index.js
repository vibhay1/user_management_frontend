import axios from 'axios';
import { getToken, logout } from '../../../authentication';
axios.defaults.baseURL = 'http://localhost:8070/';
axios.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
},
    error => {
        Promise.reject(error)
    })
axios.interceptors.response.use(
    (response) => {
        if (response.status === 401) {
            window.location = window.location.origin + '/login';
        }
        return response;
    },
    error => {
        if (error?.response?.status === 401) {
            logout();
            window.location = window.location.origin + '/login';
        }

        return Promise.reject(error)
    })

export const handleResponse = (data, fun) => {
    if (data.success === true && data.code === 200) {
        return data.data || data.message;
    }
    return fun(data.message);
}
export const handleError = (data, fun) => {

    if (data?.response?.data?.success === false && data?.response?.data?.code === 401) {
        logout();
        return fun(data?.response?.data?.message);
    }
    return fun('Backend server down!!');
}

const API_ENDPOINT = {
    login: 'user/login',
    register: 'user/register',
    userList: 'user/list',
    userDelete: 'user/delete',
    userAdd: 'user/addUser',
    userFetch: 'user/get',
    userUpdate: 'user/update',
}

export { API_ENDPOINT, axios }