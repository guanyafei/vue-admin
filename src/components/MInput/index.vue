<template>
  <el-input v-model="formItemVal" :style="widths" :type="itemConfig.tag || tag" :disabled="disabled" :autosize="itemConfig.tag === 'textarea'" :placeholder="itemConfig.placeholder || placeholder" :maxlength="itemConfig.maxlength || maxlength" @input="handleModelInput" clearable/>
</template>

<script>
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MInput',
  props: {
    itemConfig:{
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
  computed:{
     disabled:function (){
       return isDisabledFn(this.itemConfig,this.isDisbled);
     },
     widths:function (){
       return this.itemConfig.width?`width:${this.itemConfig.width}px`:`width:${this.width}`
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

<style  scoped>
</style>
