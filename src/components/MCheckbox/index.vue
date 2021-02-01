<template>
 <el-checkbox-group v-model="formItemVal" :placeholder="itemConfig.placeholder || placeholder" :disabled="disabled" @input="handleModelInput">
    <el-checkbox v-for="item in itemConfig.options || options"
      :key="item"
      :label="item"
      >
      {{item}}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import { fetch } from '@/utils/requestFn'
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MCheckbox',
  props: {
    itemConfig:{
      type: Object,
      default: () => ({})
    },
    value: {
      type: Array,
      default: () => ([])
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
      formItemVal:this.value,
      optionsVal:this.itemConfig.options || [],
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
     }
  },
  created() {
    this.itemConfig && this.itemConfig.action && this.getOptions();
  },
  mounted() {
  },
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
