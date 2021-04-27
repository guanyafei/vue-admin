<template>
  <div v-loading="$app.handleMapping[tableConfig.$._id]['loading']">
    <el-table :data="tableList.list || []" stripe border style="width: 100%">
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
            <div
              :key="i"
              class="btnWrap"
              v-for="(itm, i) in onFilterBtn(item.button)"
            >
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
                  (!hasAddToMore(onFilterBtn(item.button)) &&
                    i !== onFilterBtn(item.button).length - 1) ||
                  (hasAddToMore(onFilterBtn(item.button)) && !itm.$.addToMore)
                "
              ></el-divider>
            </div>
            <el-dropdown v-if="hasAddToMore(onFilterBtn(item.button))">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(itm, idx) in onFilterBtn(item.button)"
                  :key="idx"
                >
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
          v-else-if="item.$.transFormId"
          :key="index"
          :prop="item.$.prop"
          :label="item.$.lable"
          :align="item.$.align || align"
          :width="item.$.width || width"
        >
          <template v-slot:default="scope">
            {{
              scope.row[item.$.prop]
                | getDecs(item.$.transFormId, transFormOpts)
            }}
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
        :total="tableList.totalCount || 0"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script>
import getTransForm from "@/common/transForm";
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
      canUseBtns: this.$app.canUseBtns,
      transFormOpts: {},
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
    // isHideSinglePage: function () {
    //   return !!(
    //     !this.tableList.totalCount ||
    //     this.tableList.totalCount === this.pageSize ||
    //     this.tableList.totalCount < this.pageSize
    //   );
    // },
  },
  created() {
    this.tableConfig = this.xmlConfigObj;
    this.transFormOpts = getTransForm(this.$route.name) || {};
  },
  mounted() {
    this.tableConfig.$ &&
      this.tableConfig.$.lazyLoad !== "true" &&
      this.handleCurrentChange();
  },
  methods: {
    // 过滤当前用户无权限使用按钮
    onFilterBtn(btns) {
      let btnsArr = [];
      for (let i = 0; i < btns.length; i++) {
        if (this.canUseBtns.includes(btns[i].$._id)) {
          btnsArr.push(btns[i]);
        }
      }
      return btnsArr;
    },
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
      let fetchForm = {
        page: val,
        limit: this.pageSize,
      };
      this.tableConfig.$.methodName &&
        (fetchForm["methodName"] = this.tableConfig.$.methodName);
      this.tableConfig.$.serviceName &&
        (fetchForm["serviceName"] = this.tableConfig.$.serviceName);
      fetch(this.tableConfig.$.action, this.tableConfig.$.method, {
        ...fetchForm,
      })
        .then((res) => {
          this.$app.handleMapping[this.tableConfig.$._id]["loading"] = false;
          this.$app.handleMapping[this.tableConfig.$._id][
            `${this.tableConfig.$._id}BaseDate`
          ] = res.page;
          this.$app._mainTableId = "";
          this.$app.mainFlag = "N";
        })
        .catch(() => {
          this.$app.handleMapping[this.tableConfig.$._id]["loading"] = false;
        });
    },
    // 按钮分类  是否加入到drop-down
    hasAddToMore(items = []) {
      return items.some((currentValue) => {
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
