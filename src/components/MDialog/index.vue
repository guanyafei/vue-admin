<template>
  <el-dialog
    v-if="dialogVisibleObj[dialogVisibleFlag]"
    title="提示"
    :visible.sync="dialogVisibleObj[dialogVisibleFlag]"
    width="80%"
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
import { get as getReq, post as postReq } from '@/utils/requestFn'
export default {
  name: 'MDialog',
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props: {
    dialogVisibleFlag: '',
    xmlConfigObj: {
    },
    handleId: '',
    hasTable: false
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
  mounted() {
  },
  methods: {
    // 点击确定 发送请求
    requestHandle() {
      console.log('MDialog', this.$app, this.handleId, this.$app.tableId)
      this.$app['formRefs'][`${this.handleId}`].validate((valid) => {
        return
        if (this.$app.handleMapping[this.handleId].method === 'post') {
          const headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
          postReq().then(res => {
            this.closeDia()
            if (this.$app.tableId) {
              const tableId = this.$app.tableId;
              (this.$app.$refs[`${tableId}Table`]).length ? (this.$app.$refs[`${tableId}Table`])[0].handleCurrentChange() : (this.$app.$refs[`${tableId}Table`]).handleCurrentChange()
            }
          })
        } else {
          getReq(this.$app.handleMapping[this.handleId].action, {
            ...this.$app.forms[this.handleId]
          }).then(res => {
            this.closeDia()
            if (this.$app.tableId) {
              const tableId = this.$app.tableId;
              (this.$app.$refs[`${tableId}Table`]).length ? (this.$app.$refs[`${tableId}Table`])[0].handleCurrentChange() : (this.$app.$refs[`${tableId}Table`]).handleCurrentChange()
            }
          })
        }

        // request({
        //   method: this.$app.handleMapping[this.handleId].method || 'Get',
        //   url: this.$app.handleMapping[this.handleId].action || '',
        //   headers,
        //   ...this.$app.forms[this.handleId]
        // }).then(res => {
        //   this.closeDia()
        //   if (this.$app.tableId) {
        //     const tableId = this.$app.tableId;
        //     (this.$app.$refs[`${tableId}Table`]).length ? (this.$app.$refs[`${tableId}Table`])[0].handleCurrentChange() : (this.$app.$refs[`${tableId}Table`]).handleCurrentChange()
        //   }
        // });
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
