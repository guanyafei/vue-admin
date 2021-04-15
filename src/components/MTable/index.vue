<template>
  <div v-loading="loading">
    <el-table :data="tableList.rows || []" stripe border style="width: 100%">
      <el-table-column
        v-if="tableConfig.$.type || type"
        :type="tableConfig.$.type || type"
      />
      <template v-for="(item, index) in tableConfig.tableCol">
        <el-table-column
          v-if="item.button"
          :key="index"
          :label="item.$.lable"
          :align="item.$.align || align"
          :width="item.$.width || width"
          fixed="right"
        >
          <template slot="header"> 操作 </template>
          <template v-slot:default="scope">
            <div :key="i" class="btnWrap" v-for="(itm, i) in item.button">
              <m-button
                :table-id="tableConfig.$._id"
                :item-config="itm.$"
                :row-obj="scope.row"
                :key="i"
                v-if="!itm.$.addToMore"
              />
              <el-divider
                direction="vertical"
                :key="i"
                v-if="
                  (!hasAddToMore(item.button) &&
                    i !== item.button.length - 1) ||
                  (hasAddToMore(item.button) && !itm.$.addToMore)
                "
              ></el-divider>
            </div>
            <el-dropdown v-if="hasAddToMore(item.button)">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(itm, idx) in item.button" :key="idx">
                  <m-button
                    :table-id="tableConfig.$._id"
                    :item-config="itm.$"
                    :row-obj="scope.row"
                    v-if="itm.$.addToMore === 'true'"
                  />
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
          :width="item.$.width || width"
        />
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableList.total || 0"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :hide-on-single-page="isHideSinglePage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script>
import MButton from "@/components/MButton";
import { fetch } from "@/utils/requestFn";
export default {
  name: "MTable",
  components: { MButton },
  inject: {
    $app: {
      default: () => ({}),
    },
  },
  props: {
    xmlConfigObj: {
      type: Object,
      default: () => ({}),
    },
    tableList: {
      type: Object,
      default: () => ({}),
    },
    align: {
      type: String,
      default: "center",
    },
    width: {
      type: String,
      default: "auto",
    },
    type: {
      type: String,
      default: "index",
    },
  },
  data() {
    return {
      tableConfig: {},
      loading: false,
    };
  },
  computed: {
    pageSize: {
      get: function () {
        return this.tableConfig.$.size ? Number(this.tableConfig.$.size) : 20;
      },
      set: function (newValue) {
        this.tableConfig.$.size = newValue;
      },
    },
    pageSizes: function () {
      return this.tableConfig.$.sizeList
        ? JSON.parse(this.tableConfig.$.sizeList)
        : [20, 30, 40, 50];
    },
    isHideSinglePage: function () {
      return !!(
        !this.tableList.total ||
        this.tableList.total === this.pageSize ||
        this.tableList.total < this.pageSize
      );
    },
  },
  created() {
    this.tableConfig = this.xmlConfigObj;
  },
  mounted() {
    console.log("********table********", this.xmlConfigObj);
    // loading
    this.loading = this.$app.handleMapping[this.tableConfig.$._id]["loading"];
    this.tableConfig.$ &&
      this.tableConfig.$.lazyLoad !== "true" &&
      this.handleCurrentChange();
  },
  methods: {
    handleSizeChange(val = 20) {
      this.pageSize = val;
      this.getTablelist(1);
    },
    handleCurrentChange(val = 1) {
      console.log(`当前页: ${val}`);
      this.getTablelist(val);
    },
    getTablelist(val) {
      this.$app.handleMapping[this.tableConfig.$._id]["loading"] = true;
      this.loading = this.$app.handleMapping[this.tableConfig.$._id]["loading"];
      console.log(
        this.$app.handleMapping[this.tableConfig.$._id],
        this.loading
      );
      fetch(this.tableConfig.$.action, this.tableConfig.$.method, {
        date: encodeURIComponent(
          "Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)"
        ),
        conditions: "",
        currentDCId: "FB68C5CEEC1640C3B1D09BEBCD99FD5E",
        Login_SessionId: "SESSION_B56E8716BA234A5A89EBD776DE501EB1",
        readOnly: "YES",
        page: val,
        rows: this.pageSize,
      }).then((res) => {
        this.$app.handleMapping[this.tableConfig.$._id]["loading"] = false;
        this.loading = this.$app.handleMapping[this.tableConfig.$._id][
          "loading"
        ];
        this.$app.handleMapping[this.tableConfig.$._id][
          `${this.tableConfig.$._id}BaseDate`
        ] = res;
        this.$app._mainTableId = "";
        this.$app.mainFlag = "N";
      });
    },
    // 按钮分类  是否加入到drop-down
    hasAddToMore(items = []) {
      return items.some(function (currentValue) {
        return currentValue.$.addToMore && currentValue.$.addToMore === "true";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btnWrap {
  display: inline;
}
</style>
