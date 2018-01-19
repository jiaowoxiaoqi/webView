import configuration from '@/common/configuration'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = configuration.uriGateway
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
// interceptor
axios.interceptors.request.use(request => {
    var requestUrl = request.url
    // console.log('requestUrl->' + requestUrl)
    showPreloader(requestUrl)
    if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        request.data = qs.stringify(request.data);
    }
    var token = localStorage.getItem('token');
    if (token && token != null) {
        request.headers["Authorization"] = 'Bearer ' + token;
    }
    return request
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    // console.log(JSON.stringify(response)+'<<<===response')
    // if (response.data&&response.data.success == false && !response.data.access_token) {
       
    // }
    return response.data;
}, error => {
    if (error.response) {
        var result = error.response.data || { error_description: "未知错误" };
        switch (error.response.status) {
            case 400:

                break;
            case 401:

                break;
            case 404:

                break;    
            case 500:

                break;
        }
    }
    return Promise.reject(error.response)
})

export default axios