<template>
  <el-cascader v-model="formItemVal" :options="options" :placeholder="itemConfig.placeholder || placeholder" @change="handleChange"/>
</template>

<script>
export default {
  name: 'MCascader',
  props: {
    itemConfig:{
    },
    value: {
      type: String,
      default: ''
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
      default: '请选择地区'
    },
    // options: [{
    //   value: 'zhinan',
    //   label: '指南',
    //   children: [{
    //     value: 'shejiyuanze',
    //     label: '设计原则',
    //     children: [{
    //       value: 'yizhi',
    //       label: '一致'
    //     }, {
    //       value: 'fankui',
    //       label: '反馈'
    //     }, {
    //       value: 'xiaolv',
    //       label: '效率'
    //     }, {
    //       value: 'kekong',
    //       label: '可控'
    //     }]
    //   }]
    // }]
  },
  data() {
    return {
      formItemVal:JSON.parse(this.value),
      options: [{
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
    }
  },
  watch:{
   'value':{
      handler: function(val, oldVal){
        this.formItemVal = val;
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleChange(value) {
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
