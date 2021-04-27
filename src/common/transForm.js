// 配置0、1状态转换成汉字描述
const common = {
    ff: [{ 'key': 0, 'value': '男' }, { 'key': 1, 'value': '女' }],
}
const options = {
    demo3: {
        a: [{ 'key': 0, 'value': '男' }, { 'key': 1, 'value': '女' }],
    },
}

export default function getTransForm(name) {
    return Object.assign({}, options[name] || {}, common)
}