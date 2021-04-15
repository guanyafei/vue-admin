<template>
  <el-dialog
    title="放大镜"
    :visible.sync="showVisible"
    width="40%"
    append-to-body
    :before-close="onCloseZoom"
    destroy-on-close
  >
    <el-form ref="zoomForm" :model="zoomForm" :inline="true">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="zoomForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item align="center">
        <el-button size="mini" type="primary" @click="onQuery()"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item align="center">
        <el-button size="mini" type="primary" @click="resetForm()"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <div v-loading="loading">
      <el-table
        :data="tableList || []"
        style="width: 100%"
        stripe
        border
        @row-dblclick="onRowSelected"
      >
        <el-table-column fixed prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="province" label="省份"> </el-table-column>
        <el-table-column prop="city" label="市区"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="zip" label="邮编"> </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableList.length || 0"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onCloseZoom()">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "MZoom",
  components: {},
  props: {
    showVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      pageSizes: [20, 30, 40, 50],
      pageSize: 20,
      tableList: [
        {
          date: "2016-05-02",
          name: "王小虎1",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎2",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎3",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎4",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
      zoomForm: {},
    };
  },
  computed: {},
  created() {
    this.onQuery();
  },
  mounted() {},
  methods: {
    // 查询
    onQuery() {
      // 发请求
      console.log(this.queryForm);
    },
    // 重置
    resetForm() {
      this.$refs["zoomForm"].resetFields();
    },
    handleCurrentChange(val = 1) {
      console.log(`当前页: ${val}`);
      // 发请求
    },
    handleSizeChange(val = 20) {
      this.pageSize = val;
      // 发请求
    },
    // 关闭放大镜
    onCloseZoom() {
      this.$emit("onHideZoom");
    },
    onRowSelected(row) {
      this.$emit("doubleClick", row);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  position: sticky;
}
.el-table ::v-deep.el-table__row {
  cursor: pointer;
}
</style>
