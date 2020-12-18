export default {
    input: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    maxlength: {
        type: String,
        default: '6'
    },
    clearable: {
        type: Boolean,
        default: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: '请输入'
    },
    xmlConfigObj: {
        default: () => {
            return {}
        }
    }
}