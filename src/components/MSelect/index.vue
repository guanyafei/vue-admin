<template>
  <el-select v-model="formItemVal" :placeholder="itemConfig.placeholder || placeholder" :disabled="disabled" @input="handleModelInput">
    <el-option
      v-for="item in optionsVal"
      :key="item.label"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import request from '@/utils/request'
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
     }
  },
  created() {
    this.itemConfig && this.itemConfig.action && this.getOptions();
  },
  mounted() {
  },
  methods: {
    // 获取select值
    getOptions () {
      request({
        method: this.itemConfig.method,
        url: this.itemConfig.action,
        params:{
          Login_SessionId: 'SESSION_87792E4A0E3E44FEBFDC7A989AB160BB'
        }
      }).then(res=>{
        if(res.retcode===0){
          this.optionsVal = res.retdata || [];
        }
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
