<template>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleObj[dialogVisibleFlag]"
        width="80%"
        >
        <slot></slot>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleObj[dialogVisibleFlag] = false">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="requestHandle()">确 定</el-button>
        </span>
      </el-dialog>
</template>

<script>
import request from '@/utils/request'
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
    console.log("$app",this.$app)
  },
  methods: {
    requestHandle(){
      let tempId = (this.$app.updateDate && this.$app.updateDate.id) ? this.$app.updateDate.id : null;
      tempId && (this.$app.forms.id = tempId);
      let headers = { headers: { "Content-Type": "multipart/form-data" } }
      request({
        method: this.$app.handleMapping[this.handleId].method,
        url: this.$app.handleMapping[this.handleId].action,
        headers,
         ...this.$app.forms
      }).then(res=>{
          this.$app.$refs.tableComp.handleCurrentChange();
          this.dialogVisibleObj[dialogVisibleFlag] = false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
