<template>
      <el-input v-model="modelVal" :type="itemConfig.type || type" :placeholder="itemConfig.placeholder || placeholder" @input="handleModelInput"/>
</template>

<script>
export default {
  name: 'MInput',
  props: {
    itemConfig:{
    },
    value: {
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
    }
  },
  data() {
    return {
      modelVal:this.value
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleModelInput(value) {
      this.$emit('input', value)
      if (this.$parent.$options.componentName === 'ElFormItem') {
        if (this.validateEvent) {
          this.$parent.$emit('el.form.change', [value])
        }
      }
      this.$emit('change', value)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
