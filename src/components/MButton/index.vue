<template>
      <el-button :type="itemConfig.type || type"  :disabled="disabled">{{itemConfig.placeholder || placeholder}}</el-button>
</template>

<script>
export default {
  name: 'MButton',
  props: {
    type: {
        type: String,
        default: 'success'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: '查询'
    },
    disabled:{
      type: Boolean,
      default: false
    },
    itemConfig:{
    },
  },
  data() {
    return {
      
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  
  }
}
</script>

<style lang="scss" scoped>
</style>
