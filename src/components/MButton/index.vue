<template>
  <el-button :type="itemConfig.type || type" :disabled="disabled" size="mini" @click="submitHandle">{{ itemConfig.placeholder || placeholder }}</el-button>
</template>

<script>
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MButton',
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
    rowObj: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'success'
    },
    placeholder: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    tableId:  {
      type: String,
      default: ''
    },
    formKey:  {
      type: String,
      default: ''
    },
    isDisbled: {
      type: String,
      default: 'false'
    },
    mainFlag: {
      type: String,
      default: 'N'
    },
    mainTableId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  created() {
  },
  computed:{
     disabled:function (){
       return isDisabledFn(this.itemConfig,this.isDisbled);
     }
  },
  mounted() {
    console.log("uuuuuuuuuuu",this.mainFlag,this.mainTableId)
  },
  methods: {
    submitHandle() {
      if (!this.itemConfig._id) return
      console.log("MButton",this.tableId ,"rrrrrrrrrrrr", this.formKey,this.mainFlag)
      console.log("this.tableId",this.tableId)
      this.mainFlag==='Y' && (this.$app.mainFlag ='Y')
      this.mainFlag==='Y' && this.mainTableId.length && (this.$app._mainTableId = this.mainTableId)
      this.$app.tableId = this.tableId ? this.tableId : this.formKey
      // this.$app.handle[this.itemConfig._id](this.rowObj, this.$app.tableId, this.itemConfig, this.mainFlag)
      this.$app.handle[this.itemConfig._id](this.rowObj, this.$app.tableId, this.mainFlag)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
