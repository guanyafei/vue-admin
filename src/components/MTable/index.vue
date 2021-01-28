<template>
  <div>
    <el-table
      :data="tableList.rows"
      :stripe="stripe"
    >
      <el-table-column
        v-if="tableConfig.$.type || type"
        :type="tableConfig.$.type || type"
      />
      <template v-for="(item,index) in tableConfig.tableCol">
        <el-table-column
          v-if="item.button"
          :key="index"
          :label="item.$.lable"
          :align="item.$.align || align"
        >
          <template v-slot:default="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                下拉操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index) in item.button" :key="index">
                  <m-button :table-id="xmlConfigObj.$._id" :item-config="item.$" :row-obj="scope.row" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.$.prop"
          :label="item.$.lable"
          :align="item.$.align || align"
        />
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :total="tableList.total"
        :page-size="20"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import MButton from '@/components/MButton'
import {get as getReq,post as postReq} from '@/utils/requestFn'
export default {
  name: 'MTable',
  components: { MButton },
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props: {
    xmlConfigObj: {},
    tableList: {
      default: () => []
    },
    align: {
      type: String,
      default: 'center'
    },
    stripe: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'index'
    }
  },
  data() {
    return {
      tableConfig: {}
    }
  },
  created() {
    this.tableConfig = this.xmlConfigObj
  },
  mounted() {
    this.handleCurrentChange()
  },
  methods: {
    handleCurrentChange(val = 1) {
      console.log("MTable",this.tableConfig.$._id)
      console.log(`当前页: ${val}`);
      if(this.tableConfig.$.method === 'post'){
        postReq().then(res=>{
          this.$app.handleMapping[this.tableConfig.$._id][`${this.tableConfig.$._id}BaseDate`] = res
        });
      }else{
        getReq(this.tableConfig.$.action,{
          date: encodeURIComponent('Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)'),
          conditions: '',
          currentDCId: 'FB68C5CEEC1640C3B1D09BEBCD99FD5E',
          Login_SessionId: 'SESSION_CB8EE988F4024590954129D5B612429F',
          readOnly: 'YES',
          page: val,
          rows: 20
        }).then(res=>{
          this.$app.handleMapping[this.tableConfig.$._id][`${this.tableConfig.$._id}BaseDate`] = res
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
