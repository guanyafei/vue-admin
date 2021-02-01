<template>
  <el-date-picker
    v-model="formItemVal"
    :type="itemConfig.type || type"
    :placeholder="itemConfig.placeholder || placeholder"
    range-separator="至"
    :clearable="clearable"
    value-format="yyyy-MM-dd"
    :disabled="disabled"
    @change="handleModelInput"
    >
  </el-date-picker>
</template>

<script>
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MDate',
  props: {
    itemConfig:{
      type: Object,
      default: () => ({})
    },
    value:  {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    },
    placeholder: {
      type: String,
      default: '选择日期'
    },
    clearable:{
      type: Boolean,
      default: true
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
      handler: function(val){
        this.formItemVal =  val;
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
      console.log("xxxxxxxxxxx",val)
      this.$emit('input', val);
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
