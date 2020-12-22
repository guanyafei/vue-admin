<template>
  <el-date-picker
    v-model="formItemVal"
    :type="itemConfig.type || type"
    :placeholder="itemConfig.placeholder || placeholder"
    range-separator="至"
    :clearable="clearable"
    >
  </el-date-picker>
</template>

<script>
export default {
  name: 'MDate',
  props: {
    itemConfig:{
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '选择日期'
    },
    clearable:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formItemVal:this.value
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleModelInput(val) {
      this.$emit('input', val)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
