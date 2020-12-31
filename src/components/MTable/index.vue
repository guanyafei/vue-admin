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
        :total="tableList.length"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import MButton from '@/components/MButton'
export default {
  name: 'MTable',
  components: { MButton },
  props: {
    xmlConfigObj: {},
    tableList: {
      default: () => {
        return 
      }
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
      // buttonItems:[]
    }
  },
  created() {
    this.tableConfig = this.xmlConfigObj;
    // this.handleOperatData(this.tableConfig.tableCol);
  },
  mounted() {
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 格式化table操作按钮
    // handleOperatData(tableCol=[]){
    //   let itemObj = {};
    //   tableCol.map(colItem=>{
    //     colItem.button && colItem.button.length && colItem.button.map(item=>{
    //       itemObj = item.$;
    //       this.buttonItems.push(itemObj);
    //     })
    //   });
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
