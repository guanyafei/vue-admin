<template>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleObj[dialogVisibleFlag]"
        width="80%"
        :closed="closeDia"
        destroy-on-close
        >
        <slot></slot>
        <span slot="footer" class="dialog-footer">
          <el-button  size="mini" @click="closeDia">取 消</el-button>
          <el-button  size="mini" type="primary" :loading="loading" @click="requestHandle">确 定</el-button>
        </span>
      </el-dialog>
</template>

<script>
import request from '@/utils/request'
import axios from 'axios'
export default {
  name: 'MDialog',
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props: {
    dialogVisibleFlag:'',
    xmlConfigObj:{
    },
    handleId:''
  },
  data() {
    return {
      dialogVisibleObj:{
      },
      loading:false
    }
  },
  created() {
    this.$set(this.dialogVisibleObj,this.dialogVisibleFlag,false);
  },
  mounted() {
  },
  methods: {
    // 点击确定 发送请求
    requestHandle(){
      let headers = { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      request({
        method: this.$app.handleMapping[this.handleId].method || "Get",
        url: this.$app.handleMapping[this.handleId].action || '',
        headers,
         ...this.$app.forms[this.handleId]
      }).then(res=>{
          this.$app.$refs.tableComp.handleCurrentChange();
          this.closeDia();
      });
    },
    // 重置表单数据
    closeDia(){
      this.dialogVisibleObj[this.dialogVisibleFlag] = false;
      this.$app['formRefs'][this.handleId].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
