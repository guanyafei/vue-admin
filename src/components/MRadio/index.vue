<template>
  <el-radio-group v-model="formItemVal" :placeholder="itemConfig.placeholder || placeholder" :disabled="disabled" @input="handleModelInput">
    <el-radio
      v-for="item in optionsVal"
      :key="item.label"
      :label="item.value"
      >
      {{item.label}}
    </el-radio>
  </el-radio-group>
</template>

<script>
import { fetch } from '@/utils/requestFn'
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MRadio',
  props: {
    itemConfig:{
      type: Object,
      default: () => ({})
    },
    value: {
      type: String,
      default: ''
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
    handleModelInput(val) {
      this.$emit('input', val)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
