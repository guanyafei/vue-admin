<template>
  <div>
    <el-table
      :data="tableList.rows"
      :stripe="stripe"
    >
      <el-table-column
        v-if="tableConfig.$.type"
        :type="tableConfig.$.type"
      />
      <template v-for="(item,index) in tableConfig.tableCol" >
        <el-table-column
          v-if="item.button"
          :key="index"
          :label="item.$.lable"
          :align="item.$.align || align"
        >
          <template v-slot:default="scope">
              <m-button :itemConfig="item.$" :rowObj="scope.row" v-for="(item,index) in item.button"  :key="index"></m-button>
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
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import MButton from '@/components/MButton'
import request from '@/utils/request'
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
    this.tableConfig = this.xmlConfigObj;
  },
  mounted() {
    this.handleCurrentChange();
  },
  methods: {
    handleCurrentChange(val=1) {
      console.log(`当前页: ${val}`);
      request({
        method: this.tableConfig.$.method,
        url: this.tableConfig.$.action,
        params:{
          date: encodeURIComponent('Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)'),
          conditions: '',
          currentDCId: 'FB68C5CEEC1640C3B1D09BEBCD99FD5E',
          Login_SessionId: 'SESSION_E53DB5BA6B7F4B1DA95DA6C018AA1B96',
          readOnly: 'YES',
          page: 1,
          rows: 20
        }
      }).then(res=>{
          this.$app.baseData = res;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
