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
          fixed="right"
        >
          <template  slot="header" slot-scope="scope">
            <template  v-if="item.HButton">
              <m-button  v-for="(item,index) in item.HButton" :key="index"  :table-id="tableConfig.$._id" :item-config="item.$" :row-obj="scope.row" />
            </template>
            <template v-else>
              操作
            </template>
          </template>
          <template v-slot:default="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index) in item.button" :key="index">
                  <m-button :table-id="tableConfig.$._id" :item-config="item.$" :row-obj="scope.row" />
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
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import MButton from '@/components/MButton'
import { fetch } from '@/utils/requestFn'
export default {
  name: 'MTable',
  components: { MButton },
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props: {
    xmlConfigObj: {
      type: Object,
      default: () => ({})
    },
    tableList: {
      default: () => ([])
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
      tableConfig: {},
      // size:
    }
  },
  created() {
    this.tableConfig = this.xmlConfigObj
  },
  computed:{
    pageSize:function(){
      return this.tableConfig.$.size ? Number(this.tableConfig.$.size) : 20
    }
  },
  mounted() {
    this.tableConfig.$ && this.tableConfig.$.lazyLoad !=='true' && this.handleCurrentChange()
    console.log('MTable', this.tableConfig,this.$app)
  },
  methods: {
    handleCurrentChange(val = 1) {
      console.log(`当前页: ${val}`)
      fetch(this.tableConfig.$.action,this.tableConfig.$.method,
        {
          date: encodeURIComponent('Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)'),
          conditions: '',
          currentDCId: 'FB68C5CEEC1640C3B1D09BEBCD99FD5E',
          Login_SessionId: 'SESSION_CB8EE988F4024590954129D5B612429F',
          readOnly: 'YES',
          page: val,
          rows: this.pageSize
        }).then(res=>{
          this.$app.handleMapping[this.tableConfig.$._id][`${this.tableConfig.$._id}BaseDate`] = res
          this.$app._mainTableId = ""
          this.$app.mainFlag = "N"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
