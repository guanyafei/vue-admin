<template>
  <el-cascader v-model="formItemVal" :style="widths" :options="optionsVal" :placeholder="itemConfig.placeholder || placeholder" :disabled="disabled" @focus="getOptions()" @change="handleChange" filterable clearable />
</template>

<script>
import { fetch } from '@/utils/requestFn'
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MCascader',
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props: {
    itemConfig:{
      type: Object,
      default: () => ({})
    },
    value: {
      type: Array,
      default: () => ([])
    },
    placeholder: {
      type: String,
      default: '请选择'
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
      formItemVal:this.value,
      optionsVal:this.$app.optionItems[this.itemConfig.optionId] || []
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
  computed:{
     disabled:function (){
       return isDisabledFn(this.itemConfig,this.isDisbled);
     },
     widths:function (){
       return this.itemConfig.width?`width:${this.itemConfig.width}px`:`width:${this.width}`
     }
  },
  created() {
    this.itemConfig && this.itemConfig.action && (this.itemConfig.lazyLoad !=="true") && this.getOptions();
  },
  mounted() {
  },
  methods: {
    getOptions () {
      if(this.optionsVal.length>0) return
      fetch(this.itemConfig.action,this.itemConfig.method,
        {
          Login_SessionId: 'SESSION_87792E4A0E3E44FEBFDC7A989AB160BB'
        }
      ).then(res=>{
        this.optionsVal = res.retdata || [];
      });
    },
    handleChange(value) {
      this.$emit('input', value)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
