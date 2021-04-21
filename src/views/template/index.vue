<template>
  <div class="container">
    <section class="main">
      <div class="form-box">
        <el-form
          :model="queryForm"
          ref="queryForm"
          label-width="100px"
          inline
          label-position="left"
        >
          <m-collapse :form-item-len="Object.keys(queryForm).length">
            <template v-slot:visible-form-slot>
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="queryForm.name" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="活动区域" prop="region">
                <el-select
                  v-model="queryForm.region"
                  placeholder="请选择活动区域"
                >
                  <el-option
                    v-for="item in optionItems['region']"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间" required>
                <el-form-item prop="date">
                  <el-date-picker
                    v-model="queryForm.date"
                    type="datetimerange"
                    placeholder="请选择日期"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    clearable
                  />
                </el-form-item>
              </el-form-item>
            </template>
            <template v-slot:visible-block-btn-slot>
              <el-form-item style="display: block">
                <el-button type="primary" @click="onAdd('updateForm')"
                  >新增</el-button
                >
              </el-form-item>
            </template>
            <template v-slot:visible-inline-btn-slot>
              <el-form-item>
                <el-button type="primary" @click="onQuery()">查询</el-button>
                <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
            </template>
            <el-form-item label="活动性质" prop="type">
              <el-checkbox-group v-model="queryForm.type">
                <el-checkbox
                  v-for="item in optionItems['types']"
                  :key="item.value"
                  :label="item.value"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源" prop="resource">
              <el-radio-group v-model="queryForm.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
              <el-input
                type="textarea"
                :rows="1"
                v-model="queryForm.desc"
              ></el-input>
            </el-form-item>
          </m-collapse>
        </el-form>
      </div>
    </section>
    <section class="list">
      <div v-loading="loading">
        <el-table :data="tableList || []" style="width: 100%" stripe border>
          <el-table-column fixed prop="date" label="日期"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="province" label="省份"> </el-table-column>
          <el-table-column prop="city" label="市区"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column prop="zip" label="邮编"> </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <div class="btnWrap">
                <el-button @click="onUpdate(scope.row)" type="text" size="small"
                  >编辑</el-button
                >
                <el-divider direction="vertical"></el-divider>
              </div>
              <el-dropdown>
                <span class="el-dropdown-link">
                  更多<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button
                      @click="onDel(scope.row)"
                      type="text"
                      size="small"
                      >删除</el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
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
    </section>
    <!-- 新增&修改 -->
    <m-update
      :show-update-visible="updateVisible"
      @onHideUpdate="onCloseUpdate"
      @onShowZoom="onOpenZoom"
    />
    <!-- 放大镜 -->
    <m-zoom
      :show-visible="zoomVisible"
      @onHideZoom="onCloseZoom"
      @doubleClick="onSelectedRow"
    />
    <el-backtop>
      <div class="back">UP</div>
    </el-backtop>
  </div>
</template>
<script>
import getOptions from "@/common/options.js";
import MCollapse from "@/components/MCollapse";
import MZoom from "./components/zoom";
import MUpdate from "./components/update";
export default {
  name: "tempalte",
  components: { MCollapse, MZoom, MUpdate },
  props: {},
  data() {
    return {
      optionItems: getOptions(this.$route.name) || {},
      updateVisible: false,
      zoomVisible: false,
      loading: false,
      pageSizes: [20, 30, 40, 50],
      pageSize: 20,
      region: [
        { label: "区域一", value: "shanghai" },
        { label: "区域二", value: "beijing" },
      ],
      types: [
        { label: "美食/餐厅线上活动", value: "1" },
        { label: "地推活动", value: "2" },
        { label: "线下主题活动", value: "3" },
        { label: "单纯品牌曝光", value: "4" },
      ],
      queryForm: {
        name: "",
        region: "",
        date: "",
        type: [],
        resource: "",
        desc: "",
      },
      updateForm: {},
      rules: {
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      tableList: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎1",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎2",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎3",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎4",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
      addressList: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 查询
    onQuery() {
      // 发请求
    },
    // 重置
    resetForm() {
      this.$refs["queryForm"].resetFields();
    },
    handleCurrentChange(val = 1) {
      console.log(`当前页: ${val}`);
      // 发请求
    },
    handleSizeChange(val = 20) {
      this.pageSize = val;
      // 发请求
    },
    // 打开放大镜
    onOpenZoom() {
      this.zoomVisible = true;
    },
    // 关闭放大镜
    onCloseZoom() {
      this.zoomVisible = false;
    },
    // 双击选中
    onSelectedRow(row) {
      this.onCloseZoom();
      this.$bus.$emit("zoomDate", row);
    },
    // 关闭更新弹窗
    onCloseUpdate() {
      this.updateVisible = false;
    },
    // 新增
    onAdd() {
      this.$bus.$emit("updateDate");
      this.updateVisible = true;
    },
    // 编辑
    onUpdate(row) {
      this.$bus.$emit("updateDate", row);
      this.updateVisible = true;
    },
    // 删除
    onDel(row) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发请求
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 重置表单数据
    onCloseDia(formName) {
      this.updateVisible = false;
      this.$refs["updateForm"].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 10px 20px 40px;
  .back {
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  }
  .btnWrap {
    display: inline;
  }
}
.dialog-footer {
  position: sticky;
}
</style>
