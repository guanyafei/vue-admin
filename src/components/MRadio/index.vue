<template>
  <el-radio-group v-model="formItemVal" :placeholder="itemConfig.placeholder || placeholder" :disabled="disabled" @input="handleModelInput">
    <el-radio
      v-for="item in itemConfig.options || options"
      :key="item.label"
      :label="item.value"
      >
      {{item.label}}
    </el-radio>
  </el-radio-group>
</template>

<script>
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
    options: {
      type: Array,
      default: () => ([])
    },
    isDisbled: {
      type: String,
      default: 'false'
    }
  },
  data() {
    return {
      formItemVal:this.value
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
  },
  mounted() {
  },
  methods: {
    handleModelInput(val) {
      this.$emit('input', val)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
