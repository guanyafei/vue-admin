<template>
  <el-cascader v-model="formItemVal" :style="widths" :options="options" :placeholder="itemConfig.placeholder || placeholder" :disabled="disabled" @focus="getOptions()" @change="handleChange" filterable clearable />
</template>

<script>
import { fetch } from '@/utils/requestFn'
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MCascader',
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
      default: '请选择地区'
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
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }]
      }]
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
    this.itemConfig && this.itemConfig.action && this.itemConfig.lazyLoad && (this.itemConfig.lazyLoad !=="true") && this.getOptions();
  },
  mounted() {
  },
  methods: {
    getOptions () {
      if(this.options.length>0) return
      fetch(this.itemConfig.action,this.itemConfig.method,
        {
          Login_SessionId: 'SESSION_87792E4A0E3E44FEBFDC7A989AB160BB'
        }
      ).then(res=>{
        this.options = res.retdata || [];
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
