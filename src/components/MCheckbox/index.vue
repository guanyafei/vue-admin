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
    options:  {
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
    handleModelInput(value) {
      console.log("MCheckbox",value)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
