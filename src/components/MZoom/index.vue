<template>
  <div>
    <el-input
      v-model="formItemVal"
      :style="widths"
      :placeholder="itemConfig.placeholder || placeholder"
      :disabled="disabled"
      readonly
    >
      <el-button
        slot="append"
        :disabled="disabled"
        icon="el-icon-search"
        @click="openDia()"
      />
    </el-input>
    <el-dialog
      :title="titles"
      :visible.sync="dialogVisible"
      :width="dialogWs"
      append-to-body
      :closed="closeDia"
      destroy-on-close
    >
      <el-form ref="zoomForm" :model="zoom" :inline="true">
        <el-form-item
          v-for="keyItm in Object.keys(zoom)"
          :key="keyItm"
          :label="zoomLable[keyItm] || ''"
          :prop="keyItm"
        >
          <el-input
            v-model="zoom[keyItm]"
            placeholder="请输入"
            :style="innerTextWs"
          />
        </el-form-item>
        <el-form-item align="center">
          <el-button size="mini" type="primary" @click="zoomQuery()"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item v-if="itemConfig.hasReset === 'true'" align="center">
          <el-button size="mini" type="primary" @click="reSetForms"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <div v-loading="loading">
        <el-table
          :data="list.rows"
          row-class-name="row-style"
          stripe
          border
          @row-dblclick="rowSelected"
        >
          <el-table-column type="index" />
          <template v-for="keyItm in tableCol">
            <el-table-column
              :key="keyItm"
              align="center"
              :prop="keyItm"
              :label="tableColLable[keyItm]"
            />
          </template>
        </el-table>
        <div class="pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="list.total"
            :page-size="10"
            :page-sizes="pageSizes"
            :hide-on-single-page="isHideSinglePage"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDia">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetch } from "@/utils/requestFn";
import { isDisabledFn } from "@/utils/index";
export default {
  name: "MZoom",
  inject: {
    $app: {
      default: () => ({}),
    },
  },
  props: {
    itemConfig: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    isDisbled: {
      type: String,
      default: "false",
    },
    hasReset: {
      type: String,
      default: "false",
    },
    width: {
      type: String,
      default: "250px",
    },
    innerTextW: {
      type: String,
      default: "250px",
    },
    zoomW: {
      type: String,
      default: "40%",
    },
    keyItem: {
      type: String,
      default: "",
    },
    formKey: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "提示",
    },
  },
  data() {
    return {
      formItemVal: this.value,
      dialogVisible: false,
      list: [],
      zoom: {},
      zoomLable: {},
      tableCol: [],
      tableColLable: {},
      loading: false,
    };
  },
  computed: {
    disabled: function () {
      return isDisabledFn(this.itemConfig, this.isDisbled);
    },
    widths: function () {
      return this.itemConfig.width
        ? `width:${this.itemConfig.width}px`
        : `width:${this.width}`;
    },
    dialogWs: function () {
      return this.itemConfig.zoomW
        ? `${this.itemConfig.zoomW}px`
        : `${this.zoomW}`;
    },
    innerTextWs: function () {
      return this.itemConfig.innerTextW
        ? `width:${this.itemConfig.innerTextW}px`
        : `width:${this.innerTextW}`;
    },
    pageSize: {
      get: function () {
        return this.itemConfig.size ? Number(this.itemConfig.size) : 20;
      },
      set: function (newValue) {
        this.itemConfig.size = newValue;
      },
    },
    pageSizes: function () {
      return this.itemConfig.sizeList
        ? JSON.parse(this.itemConfig.sizeList)
        : [20, 30, 40, 50];
    },
    isHideSinglePage: function () {
      return !!(
        !this.list.total ||
        this.list.total === this.pageSize ||
        this.list.total < this.pageSize
      );
    },
    titles: function () {
      return this.itemConfig.title ? this.itemConfig.title : this.title;
    },
  },
  watch: {
    value: {
      handler: function (val) {
        this.formItemVal = val;
      },
      deep: true,
    },
  },
  created() {
    // search 数据解析
    this.parseDate("search", this.itemConfig.search);
    // tableCol 数据解析
    this.parseDate("tableCol", this.itemConfig.tableCol);
  },
  mounted() {},
  methods: {
    // search tableCol 数据解析
    parseDate(wch, list = []) {
      let tempSearchList = [];
      let tempList = [];
      if (list.length && list.split("|") && list.split("|").length > 1) {
        tempList = list.split("|")[0].split(",");
        tempSearchList = list.split("|")[1].split(",");
        tempSearchList.map((item, idx) => {
          wch === "search"
            ? this.$set(this.zoom, item, "")
            : this.$set(this.tableCol, idx, item);
          wch === "search"
            ? this.$set(this.zoomLable, item, tempList[idx])
            : this.$set(this.tableColLable, item, tempList[idx]);
        });
      }
    },
    openDia() {
      this.dialogVisible = true;
      this.handleCurrentChange();
    },
    handleSizeChange(val = 20) {
      this.pageSize = val;
      this.getTablelist(1);
    },
    handleCurrentChange(val = 1) {
      console.log(`当前页: ${val}`, this.zoom);
      // return
      this.getTablelist(val);
    },
    getTablelist(val) {
      this.loading = true;
      fetch(this.itemConfig.action, this.itemConfig.method, {
        date: encodeURIComponent(
          "Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)"
        ),
        conditions: "",
        currentDCId: "FB68C5CEEC1640C3B1D09BEBCD99FD5E",
        Login_SessionId: "SESSION_0C7B5E705F0446B8A824D9FBEAD53BA4",
        readOnly: "YES",
        page: val,
        rows: this.pageSize,
      }).then((res) => {
        this.loading = false;
        this.list = res || [];
      });
    },
    zoomQuery() {
      this.handleCurrentChange();
    },
    rowSelected(row) {
      this.dialogVisible = false;
      this.formItemVal = row[this.keyItem];
      this.parseOtherProps(row);
      this.$emit("input", this.formItemVal);
    },
    parseOtherProps(row) {
      const otherProps = this.itemConfig.otherProps
        ? this.itemConfig.otherProps.split(",")
        : [];
      let propsKeys = null;
      if (otherProps.length > 0) {
        otherProps.forEach((item) => {
          item.includes("?") &&
            (propsKeys = item.split("?")) &&
            this.$set(
              this.$app.forms[this.formKey],
              propsKeys[0],
              row[propsKeys[1]]
            );
          !item.includes("?") &&
            this.$set(this.$app.forms[this.formKey], item, row[item]);
        });
      }
    },
    closeDia() {
      this.dialogVisible = false;
      this.reSetForms();
    },
    reSetForms() {
      this.$refs["zoomForm"].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table ::v-deep.row-style {
  cursor: pointer;
}
.el-button.is-disabled,
.el-button.is-disabled:hover {
  border-color: transparent;
  background-color: transparent;
}
</style>
