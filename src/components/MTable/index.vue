<template>
  <div>
    <el-table
      :data="tableList"
      :stripe="stripe"
    >
      <el-table-column
        v-if="tableConfig.$.type"
        :type="tableConfig.$.type"
      />
      <el-table-column
        v-for="(item,index) in tableConfig.tableCol"
        :key="index"
        :prop="item.$.prop"
        :label="item.$.lable"
        :align="item.$.align || align"
      />
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :total="tableList.length"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import defalutProps from './prop'
export default {
  name: 'GmTable',
  props: defalutProps,
  data() {
    return {
      tableConfig: {}
    }
  },
  created() {
    this.tableConfig = this.xmlConfigObj.root.table[0]
    console.log('Config', this.xmlConfigObj.root)
  },
  mounted() {

  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination{
    float: right;
    margin-top: 15px;
}
</style>
