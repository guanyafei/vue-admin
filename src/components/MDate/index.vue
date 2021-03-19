<!--
 * @Author: your name
 * @Date: 2020-12-22 14:56:48
 * @LastEditTime: 2021-03-18 13:46:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\components\MDate\index.vue
-->
<template>
  <el-date-picker
    v-model="formItemVal"
    :style="widths"
    :type="itemConfig.type || type"
    :placeholder="itemConfig.placeholder || placeholder"
    range-separator="至"
    value-format="yyyy-MM-dd"
    :disabled="disabled"
    @change="handleModelInput"
    clearable
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
