<template>
  <el-input v-model="formItemVal"  :type="itemConfig.tag || tag" :disabled="disabled" :placeholder="itemConfig.placeholder || placeholder" :maxlength="itemConfig.maxlength || maxlength" @input="handleModelInput" />
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
      default: '50'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    isDisbled: {
      type: String,
      default: 'false'
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
     }
  },
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
    }

  }
}
</script>

<style  scoped>
</style>
