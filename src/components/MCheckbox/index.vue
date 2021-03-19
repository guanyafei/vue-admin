<template>
 <el-checkbox-group v-model="formItemVal" :style="widths" :placeholder="itemConfig.placeholder || placeholder" :disabled="disabled" @input="handleModelInput">
    <el-checkbox v-for="item in optionsVal"
      :key="item.label"
      :label="item.value"
      >
      {{item.label}}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import { fetch } from '@/utils/requestFn'
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MCheckbox',
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
        default: '请输入'
    },
    isDisbled: {
      type: String,
      default: 'false'
    },
    width: {
      type: String,
      default: 'auto'
    }
  },
  data() {
    return {
      formItemVal:this.value,
      optionsVal:this.$app.optionItems[this.itemConfig.optionId] || [],
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
    this.itemConfig && this.itemConfig.action && this.getOptions();
  },
  mounted() {},
  methods: {
    getOptions () {
      fetch(this.itemConfig.action,this.itemConfig.method,
        {
          Login_SessionId: 'SESSION_87792E4A0E3E44FEBFDC7A989AB160BB'
        }
      ).then(res=>{
        this.optionsVal = res.retdata || [];
      });
    },
    handleModelInput(value) {
      this.$emit('input', value)
      console.log("MCheckbox",value)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
