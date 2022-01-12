import Axios from 'axios'
import qs from 'qs'



Axios.defaults.timeout = 30000
Axios.defaults.baseURL = 'http://localhost:8080'


Axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        let token = window.localStorage.getItem("accessToken")
        if (token) {
            config.headers.token = token;    //将token放到请求头发送给服务器          
            //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
            // config.headers['accessToken'] = Token;    
        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
)

Axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
)


const requestLogin = params => {//箭头函数，此时params为参数

    return Axios.get('/user/login', { params: params })//获取参数
        .then(res => res.data)
};
const checkUsername = params => {//箭头函数，此时params为参数

    return Axios.get('/user/register/check', { params: params })//获取参数
        .then(res => res.data)
};

const RegisterUser = params => {
    return Axios.post('/user/register/submit', params)
        .then(res => res.data)
};

const getAuthCode = params => {
    return Axios.get('/email/emailAccount/getAuthCode', { params: params })
        .then(res => res.data)
};

const authSendServer = params => {
    return Axios.get('/email/emailAccount/authSendServer', { params: params })
        .then(res => res.data)
};
const authReceiveServer = params => {
    return Axios.get('/email/emailAccount/authReceiveServer', { params: params })
        .then(res => res.data)
};

const getEmailAddressList = params => {
    return Axios.get('/user/reset/getEmailAddressList', { params: params })
        .then(res => res.data)
};

const getEmailAccounts = params => {
    return Axios.get('/email/emailAccount/getEmailAddressList', { params: params })
        .then(res => res.data)
};

const confirmResetPassword = params => {
    return Axios.post('/user/reset/password', params)
        .then(res => res.data)
};

const getEmailList = params => {
    return Axios.get('/email/receive/getEmailList', { params: params })
        .then(res => res.data)
};

const userEditPassword = params => {
    return Axios.post('/user/edit/password', params)
        .then(res => res.data)
};

export {
    requestLogin, RegisterUser, checkUsername, getAuthCode, authSendServer,
    authReceiveServer, getEmailList, confirmResetPassword, getEmailAddressList,
    getEmailAccounts, userEditPassword
};