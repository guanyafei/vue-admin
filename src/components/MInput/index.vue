<template>
  <el-input v-model="formItemVal"  :type="itemConfig.tag || tag" :disabled="isDisabled(itemConfig)" :placeholder="itemConfig.placeholder || placeholder" :maxlength="itemConfig.maxlength || maxlength" @input="handleModelInput" />
</template>

<script>
export default {
  name: 'MInput',
  props: {
    itemConfig: {
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
      default: '10'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: String,
      default: '0'
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  data() {
    return {
      formItemVal: this.value
    }
  },
  watch:{
   'value':{
      handler: function(val){
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
    isDisabled(item){
      return item.disabled ? Boolean(item.disabled): Boolean(0);
    },
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

<style  scoped>
</style>
