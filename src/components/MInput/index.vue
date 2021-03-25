<template>
  <el-input v-model="formItemVal" :style="widths" :rows="rows" :type="itemConfig.tag || tag" :disabled="disabled" :placeholder="itemConfig.placeholder || placeholder" :maxlength="itemConfig.maxlength || maxlength" @input="handleModelInput" clearable />
</template>

<script>
  import { isDisabledFn } from '@/utils/index'
  export default {
    name: 'MInput',
    props: {
      itemConfig: {
        type: Object,
        default: () => ({})
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
        default: '200'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      isDisbled: {
        type: String,
        default: 'false'
      },
      width: {
        type: String,
        default: '200px'
      },
      row: {
        type: String,
        default: '1'
      }
    },
    data() {
      return {
        formItemVal: this.value
      }
    },
    watch: {
      'value': {
        handler: function (val) {
          this.formItemVal = val;
        },
        deep: true
      }
    },
    computed: {
      disabled: function () {
        return isDisabledFn(this.itemConfig, this.isDisbled);
      },
      widths: function () {
        return this.itemConfig.width ? `width:${this.itemConfig.width}px` : `width:${this.width}`
      },
      rows: function () {
        return (this.itemConfig.rows && this.itemConfig.tag === 'textarea') ? this.itemConfig.rows : this.row
      }
    },
    created() {},
    mounted() {},
    methods: {
      handleModelInput(value) {
        this.$emit('input', value)
        // if (this.$parent.$options.componentName === 'ElFormItem') {
        //   if (this.validateEvent) {
        //     this.$parent.$emit('el.form.change', [value])
        //   }
        // }
        // this.$emit('change', value)
      }

    }
  }
</script>

<style scoped>
</style>