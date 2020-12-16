export default {
  tableList: {
    default: () => {
      return []
    }
  },
  xmlConfigObj: {
    default: () => {
      return {}
    }
  },
  align: {
    type: String,
    default: 'center'
  },
  stripe: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'index'
  }
}
