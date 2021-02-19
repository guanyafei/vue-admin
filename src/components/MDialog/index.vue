<template>
  <el-dialog
    v-if="dialogVisibleObj[dialogVisibleFlag]"
    title="提示"
    :visible.sync="dialogVisibleObj[dialogVisibleFlag]"
    :width="widths"
    :closed="closeDia"
  >
    <slot />
    <span slot="footer" class="dialog-footer">
      <el-button v-if="!hasTable" size="mini" @click="closeDia">取 消</el-button>
      <el-button v-if="hasTable" size="mini" @click="closeDia">关 闭</el-button>
      <el-button v-if="!hasTable" size="mini" type="primary" :loading="loading" @click="requestHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { fetch } from '@/utils/requestFn'
export default {
  name: 'MDialog',
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props: {
    dialogVisibleFlag: {
      type: String,
      default: ''
    },
    xmlConfigObj: {
      type: Object,
      default: () => ({})
    },
    handleId: {
      type: String,
      default: ''
    },
    hasTable: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '1000px'
    }
  },
  data() {
    return {
      dialogVisibleObj: {
      },
      loading: false
    }
  },
  created() {
    this.$set(this.dialogVisibleObj, this.dialogVisibleFlag, false)
  },
  computed:{
    widths:function (){
      return this.xmlConfigObj.$.width?`${this.xmlConfigObj.$.width}px`:`${this.width}`
    }
  },
  mounted() {
  },
  methods: {
    // 点击确定 发送请求
    requestHandle() {
      console.log('MDialog', this.$app, this.handleId, this.$app.tableId,this.$app.mainFlag,this.$app._mainTableId)
      this.$app['formRefs'][`${this.handleId}`].validate((valid) => {
        return
        fetch(this.$app.handleMapping[this.handleId].action,this.$app.handleMapping[this.handleId].method,
        {
          ...this.$app.forms[this.handleId]
        }).then(res=>{
          this.closeDia()
          if(this.$app.mainFlag === 'Y'){
            const tableId = this.$app._mainTableId;
          }else if (this.$app.tableId) {
            const tableId = this.$app.tableId;
          }
          (this.$app.$refs[`${tableId}Table`]).length ? (this.$app.$refs[`${tableId}Table`])[0].handleCurrentChange() : (this.$app.$refs[`${tableId}Table`]).handleCurrentChange()
        })
      })
    },
    // 重置表单数据
    closeDia() {
      console.log('MDialog', this.handleId)
      this.$app.tableId = ''
      this.dialogVisibleObj[this.dialogVisibleFlag] = false
      this.$app['formRefs'][this.handleId].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
