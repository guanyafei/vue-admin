<template>
  <el-select v-model="formItemVal" :style="widths" :placeholder="itemConfig.placeholder || placeholder" :disabled="disabled" @focus="getOptions()" @input="handleModelInput">
    <el-option
      v-for="item in optionsVal"
      :key="item.label"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { fetch } from '@/utils/requestFn'
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MSelect',
  props: {
    itemConfig:{
      type: Object,
      default: () => ({})
    },
    value: {
      type: String,
      default: ''
    },
    maxlength: {
      type: String,
      default: '6'
    },
    clearable: {
      type: Boolean,
      default: true
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
      optionsVal:this.itemConfig.options || [],
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
  created() {
    this.itemConfig && this.itemConfig.action && this.itemConfig.lazyLoad && (this.itemConfig.lazyLoad !=="true") && this.getOptions();
  },
  mounted() {
  },
  methods: {
    // 获取select值
    getOptions () {
      if(this.options.length>0) return
      fetch(this.itemConfig.action,this.itemConfig.method,
        {
          Login_SessionId: 'SESSION_87792E4A0E3E44FEBFDC7A989AB160BB'
        }
      ).then(res=>{
        this.optionsVal = res.retdata || [];
      });
    },
    handleModelInput(val) {
      this.$emit('input', val)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
