<template>
  <div>
    <el-input v-model="formItemVal" :style="widths" :placeholder="itemConfig.placeholder || placeholder" :disabled="disabled" readonly>
      <el-button :disabled="disabled" slot="append" icon="el-icon-search" @click="openDia()" />
    </el-input>
    <el-dialog title="提示" :visible.sync="dialogVisible" :width="dialogWs" append-to-body :closed="closeDia" destroy-on-close>
      <el-form ref="zoomForm" :model="zoom" :inline="true">
        <el-form-item v-for="keyItem in Object.keys(zoom)" :key="keyItem" :label="zoomLable[keyItem] || ''" :prop="keyItem" >
          <el-input v-model="zoom[keyItem]" placeholder="请输入" :style="innerTextWs"/>
        </el-form-item>
        <el-form-item align="center">
          <el-button size="mini" type="primary" @click="zoomQuery()">查询</el-button>
        </el-form-item>
        <el-form-item align="center" v-if="itemConfig.hasReset==='true'">
          <el-button size="mini" type="primary" @click="reSetForms">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list.rows" @row-dblclick="rowSelected" row-class-name="row-style" stripe border>
        <el-table-column type="index"/>
        <template v-for="keyItem in tableCol">
          <el-table-column align="center"  :key="keyItem" :prop="keyItem" :label="tableColLable[keyItem]"/>
        </template>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.total"
          :page-size="10"
          :page-sizes="pageSizes"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDia">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetch } from '@/utils/requestFn'
import { isDisabledFn} from '@/utils/index'
export default {
  name: 'MZoom',
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props: {
    itemConfig: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    isDisbled: {
      type: String,
      default: 'false'
    },
    hasReset: {
      type: String,
      default: 'false'
    },
    width: {
      type: String,
      default: '200px'
    },
    innerTextW: {
      type: String,
      default: '200px'
    },
    dialogW: {
      type: String,
      default: '40%'
    },
    keyItem: {
      type: String,
      default: ''
    },
    formKey: {
      type: String,
      default: ''
    },

  },
  data() {
    return {
      formItemVal: this.value,
      dialogVisible: false,
      list: [],
      zoom: {},
      zoomLable:{},
      tableCol:[],
      tableColLable:{},
    }
  },
  watch: {
    'value': {
      handler: function(val) {
        this.formItemVal = val
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
     },
     dialogWs:function (){
       return this.itemConfig.dialogW?`${this.itemConfig.dialogW}px`:`${this.dialogW}`
     },
     innerTextWs:function (){
       return this.itemConfig.innerTextW?`width:${this.itemConfig.innerTextW}px`:`width:${this.innerTextW}`
     },
    pageSize:{
      get: function () {
        return this.itemConfig.size ? Number(this.itemConfig.size) : 20
      },
      set: function (newValue) {
        this.itemConfig.size = newValue
      },
    },
    pageSizes:function(){
      return this.itemConfig.sizeList ? JSON.parse(this.itemConfig.sizeList) : [20,30,40,50]
    }
  },
  created() {
    this.parseDate()
  },
  mounted() {
  },
  methods: {
    // search tableCol 数据解析
    parseDate(){
      let search = this.itemConfig.search || [],
          list = this.itemConfig.tableCol || [],
          tempSearchList = [],
          tempList = [];
      if(search.length && search.split('|') && search.split('|').length>1){
        tempList = search.split('|')[0].split(',');
        tempSearchList = search.split('|')[1].split(',');
        tempSearchList.map((item,idx)=>{
          this.$set(this.zoom,item,'');
          this.$set(this.zoomLable,item,tempList[idx]);
        });
      }
      if(list.length && list.split('|') && list.split('|').length>1){
        tempList = list.split('|')[0].split(',');
        tempSearchList = list.split('|')[1].split(',');
        tempSearchList.map((item,idx)=>{
          this.$set(this.tableCol,idx,item);
          this.$set(this.tableColLable,item,tempList[idx]);
        });
      }
    },
    openDia() {
      this.dialogVisible = true
      this.handleCurrentChange()
    },
    handleSizeChange(val=20){
      this.pageSize = val
      this.getTablelist(1)
    },
    handleCurrentChange(val = 1) {
      console.log(`当前页: ${val}`)
      this.getTablelist(val)
    },
    getTablelist(val){
      fetch(this.itemConfig.action,this.itemConfig.method,
        {
          date: encodeURIComponent('Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)'),
          conditions: '',
          currentDCId: 'FB68C5CEEC1640C3B1D09BEBCD99FD5E',
          Login_SessionId: 'SESSION_CB8EE988F4024590954129D5B612429F',
          readOnly: 'YES',
          page: val,
          rows: this.pageSize
        }
      ).then(res=>{
        this.list = res || []
      })
    },
    zoomQuery() {
      this.handleCurrentChange();
    },
    rowSelected(row) {
      this.dialogVisible = false
      this.formItemVal = row[this.keyItem]
      this.parseOtherProps(row)
      this.$emit('input', this.formItemVal)
    },
    parseOtherProps(row){
      let otherProps = this.itemConfig.otherProps ? this.itemConfig.otherProps.split(','):[], propsKeys=null
      if(otherProps.length > 0){
        otherProps.forEach(item => {
          item.includes("?") && (propsKeys = item.split('?')) && this.$set(this.$app.forms[this.formKey],propsKeys[0],row[propsKeys[1]])
          !item.includes("?") && this.$set(this.$app.forms[this.formKey],item,row[item])
        })
      }
    },
    closeDia() {
      this.dialogVisible = false
      this.reSetForms()
    },
    reSetForms(){
      this.$refs['zoomForm'].resetFields()
    },
  }
}
</script>

<style lang="scss" scoped>
.el-table ::v-deep.row-style {
    cursor: pointer;
  }
</style>
