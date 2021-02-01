import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中....',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        startLoading()
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        endLoading()
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code && res.code !== 20000) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 3 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            endLoading()
            return res
        }
    },
    error => {
        endLoading()
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params: params
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
        service.post(url, qs.stringify(data), header).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}
export function fetch(url, method = 'get', params = {}) {
    if (method === 'get') {
        return get(url, params)
    } else {
        return post(url, params)
    }
}
// export default service