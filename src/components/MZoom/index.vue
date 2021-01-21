<template>
  <div>
    <el-input v-model="formItemVal" :placeholder="itemConfig.placeholder || placeholder" readonly>
      <el-button slot="append" icon="el-icon-search" @click="openDia()"/>
    </el-input>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" append-to-body :closed="closeDia" destroy-on-close>
      <el-form ref="zoomForm" :model="zoom" :inline="true">
        <el-form-item label="活动名称" prop="searchKey">
          <el-input v-model="zoom.searchKey" placeholder="请输入"/>
        </el-form-item>
        <el-form-item align="center">
          <el-button  @click="zoomQuery()" size="mini" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list.rows" stripe @row-dblclick="rowSelected">
        <el-table-column type="index"/>
        <el-table-column prop="accountNo" label="客户账号" align="center"/>
        <el-table-column prop="company" label="客户名称" align="center"/>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :total="list.total"
          @current-change="handleCurrentChange"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  size="mini" @click="closeDia">取 消</el-button>
        <el-button  size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'MZoom',
  props: {
    itemConfig:{
    },
    value: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: '请输入'
    }
  },
  data() {
    return {
      formItemVal:this.value,
      dialogVisible:false,
      list:[],
      zoom:{
        searchKey:''
      }
    }
  },
  watch:{
   'value':{
      handler: function(val, oldVal){
        this.formItemVal = val;
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    openDia(){
      this.dialogVisible = true;
      this.handleCurrentChange();
    },
    handleCurrentChange(val=1) {
      request({
        method: this.itemConfig.method || 'GET',
        url: this.itemConfig.action,
        params:{
          date: encodeURIComponent('Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)'),
          conditions: '',
          currentDCId: 'FB68C5CEEC1640C3B1D09BEBCD99FD5E',
          Login_SessionId: 'SESSION_CB8EE988F4024590954129D5B612429F',
          readOnly: 'YES',
          page: val,
          rows: 20
        }
      }).then(res=>{
          this.list = res || [];
      });
    },
    zoomQuery(){
      console.log("yyyyyyyyyyy");
    },
    rowSelected(row, column){
      this.dialogVisible = false;
      this.formItemVal = row.company;
    },
    closeDia (){
      this.dialogVisible = false;
      this.$refs['zoomForm'].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
