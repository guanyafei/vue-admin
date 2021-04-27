// 配置置灰按钮 key：字段  value：字段的哪些值置灰
const common = {
    ff: { 'key': 'status', 'value': '3' }
}
const options = {
    demo1: {
        a: { 'key': 'status', 'value': ['2', '3', '4'] },
    },
}

export default function getStatus(name) {
    return Object.assign({}, options[name] || {}, common)
}