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
            case 'region':
                rulesArr = [
                    { required: true, message: "请选择活动区域", trigger: "change" },
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