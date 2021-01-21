<template>
  <el-input v-model="formItemVal" :type="itemConfig.tag || tag" :placeholder="itemConfig.placeholder || placeholder" @input="handleModelInput"/>
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
    tag: {
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
      formItemVal:this.value
    }
  },
  // watch:{
  //  'value':{
  //     handler: function(val, oldVal){
  //       this.formItemVal = val;
  //     },
  //     deep: true
  //   }
  // },
  created() {
  },
  mounted() {
  },
  methods: {
    handleModelInput(value) {
      this.$emit('input', value)
      // if (this.$parent.$options.componentName === 'ElFormItem') {
      //   if (this.validateEvent) {
      //     this.$parent.$emit('el.form.change', [value])
      //   }
      // }
      // this.$emit('change', value)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
