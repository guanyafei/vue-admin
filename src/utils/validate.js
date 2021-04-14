/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
    if (typeof str === 'string' || str instanceof String) {
        return true
    }
    return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isEmptyObj(arg) {
    if (typeof arg === 'undefined') return 0
    return Object.keys(arg).length > 0
}

/**
 * @param {Object} arg
 * @returns {Array}
 */
// 设置表单项规则 tel number email data 需特殊处理
export function setRules(item) {
    let rulesArr = []
    if (item['validator'] || item['required']) {
        switch (item.validator) {
            case 'tel':
                rulesArr = [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {
                        trigger: ['blur', 'change'],
                        validator: (rule, value, callback) => {
                            if (/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(value) === false) {
                                callback(new Error('请输入正确的手机号'))
                            } else {
                                callback()
                            }
                        }
                    }
                ]
                break
            case 'date':
                rulesArr = [,
                    { required: true, message: '请选择时间', trigger: ['blur', 'change'] }
                ]
                break
            case 'email':
                rulesArr = [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
                break
            case 'number':
                rulesArr = [
                    { required: true, message: '此项为必输项', trigger: 'blur' },
                    {
                        type: 'number',
                        trigger: ['blur', 'change'],
                        validator: (rule, value, callback) => {
                            if (/^[1-9]\d*$/.test(value) === false) {
                                callback(new Error(`${item.lable}必须为数字`))
                            } else {
                                callback()
                            }
                        }
                    }
                ]
                break
            default:
                rulesArr = [
                    { required: true, message: '此项为必输项', trigger: ['blur', 'change'] }
                ]
        }
        return rulesArr
    }
}