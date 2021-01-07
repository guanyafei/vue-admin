<template>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleObj[dialogVisibleFlag]"
        width="80%"
        :closed="closeDia"
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
      let tempId = (this.$app.updateDate && this.$app.updateDate.id) ? this.$app.updateDate.id : null;
      tempId && (this.$app.forms.id = tempId);
      let headers = { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      request({
        method: this.$app.handleMapping[this.handleId].method,
        url: this.$app.handleMapping[this.handleId].action,
        headers,
         ...this.$app.forms
      }).then(res=>{
          this.$app.$refs.tableComp.handleCurrentChange();
          this.dialogVisibleObj[dialogVisibleFlag] = false;
      });
      // axios({        
      //   url:this.$app.handleMapping[this.handleId].action,    // 设置请求的地址
      //   method:this.$app.handleMapping[this.handleId].method, // 设置请求方法
      //   data:{      // get请求使用params进行参数凭借,如果是post请求用data
      //    Login_SessionId: 'SESSION_87792E4A0E3E44FEBFDC7A989AB160BB',
      //    ...this.$app.forms
      //   },
      //   transformRequest: [function (data) {
      //     let ret = ''
      //     for (let it in data) {
      //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      //     }
      //     ret=ret.substring(0,ret.length-1)
      //     console.log("ret",typeof ret);
      //     return ret
      //   }],
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Cookie':'JSESSIONID=4A4141EA843977ACE855AE39085590A7'
      //   }
      // }).then(res => {  
      //   // res为后端返回的数据
      //   console.log(res);   
      // })
    },
    // 重置表单数据
    closeDia(){
      this.dialogVisibleObj[this.dialogVisibleFlag] = false;
      this.$app['formRefs'].resetFields();
      this.$app.forms={};
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
