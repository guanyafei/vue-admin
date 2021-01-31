<template>
  <el-button :type="itemConfig.type || type"  :disabled="disabled" size="mini" @click="submitHandle">{{ itemConfig.placeholder || placeholder }}</el-button>
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
      default: '查询'
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
  },
  methods: {
    submitHandle() {
      if (!this.itemConfig._id) return
      console.log("MButton",this.tableId ,"rrrrrrrrrrrr", this.formKey)
      console.log("this.tableId",this.tableId)
      this.$app.tableId = this.tableId ? this.tableId : this.formKey
      this.$app.handle[this.itemConfig._id](this.rowObj, this.$app.tableId, this.itemConfig)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
