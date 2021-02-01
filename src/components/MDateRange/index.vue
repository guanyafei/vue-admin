<template>
  <el-date-picker
    v-model="formItemVal"
    :style="widths"
    :type="itemConfig.type || type"
    :placeholder="itemConfig.placeholder || placeholder"
    range-separator="至"
    :clearable="clearable"
    value-format="yyyy-MM-dd"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :disabled="disabled"
    @change="handleModelInput"
    >
  </el-date-picker>
</template>

<script>
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MDateRange',
  props: {
    itemConfig:{
      type: Object,
      default: () => ({})
    },
    value: {
      type: Array,
      default: () => ([])
    },
    type: {
      type: String,
      default: 'daterange'
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
    },
    width: {
      type: String,
      default: '200px'
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
     },
     widths:function (){
       return this.itemConfig.width?`width:${this.itemConfig.width}px`:`width:${this.width}`
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
