const common = {
    ff: [{ 'label': 'dd', 'value': '0' }, { 'label': 'nn', 'value': '1' }]
}
const options = {
    demo1: {
        a: [{ 'label': '黄金糕', 'value': '0' }, { 'label': '双皮奶', 'value': '1' }],
        b: [{ 'label': 'aa', 'value': '0' }, { 'label': 'bb', 'value': '1' }],
        c: [{ 'label': 'cc', 'value': '0' }, { 'label': 'dd', 'value': '1' }],
        d: [{ 'label': 'ee', 'value': '0' }, { 'label': 'ff', 'value': '1' }],
        e: [{ 'label': 'e', 'value': '0' }, { 'label': '双皮奶', 'value': '1' }],
        f: [{ 'label': '黄金糕', 'value': '0' }, { 'label': '双皮奶', 'value': '1' }],
        g: [{ 'label': '黄金糕', 'value': '0' }, { 'label': '双皮奶', 'value': '1' }],
        h: [{ 'label': '黄金糕', 'value': '0' }, { 'label': '双皮奶', 'value': '1' }],
        i: [{ 'label': '黄金糕', 'value': '0' }, { 'label': '双皮奶', 'value': '1' }],
        j: [{
            value: 'zhinan',
            label: '指南',
            children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                    value: 'yizhi',
                    label: '一致'
                }, {
                    value: 'fankui',
                    label: '反馈'
                }, {
                    value: 'xiaolv',
                    label: '效率'
                }, {
                    value: 'kekong',
                    label: '可控'
                }]
            }]
        }]
    },
    demo2: {
        a: [{ 'label': '黄金糕', 'value': '0' }, { 'label': '双皮奶', 'value': '1' }]
    },
    demo3: {
        a: [{ 'label': '男', 'value': 0 }, { 'label': '女', 'value': 1 }]
    },
    tempalte: {
        region: [
            { label: "区域一", value: "shanghai" },
            { label: "区域二", value: "beijing" },
        ],
        types: [
            { label: "美食/餐厅线上活动", value: "1" },
            { label: "地推活动", value: "2" },
            { label: "线下主题活动", value: "3" },
            { label: "单纯品牌曝光", value: "4" },
        ],
    }
}

export default function getOptions(name) {
    return Object.assign({}, options[name] || {}, common)
}