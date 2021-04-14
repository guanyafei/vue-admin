<template>
  <div class="container">
    <section class="main">
      <div class="form-box">
        <el-form
          :model="queryForm"
          ref="queryForm"
          label-width="100px"
          inline
          label-position="right"
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
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间" required>
                <el-form-item prop="date1">
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
                <el-button @click="resetForm('queryForm')">重置</el-button>
              </el-form-item>
            </template>
            <el-form-item label="活动性质" prop="type">
              <el-checkbox-group v-model="queryForm.type">
                <el-checkbox
                  label="美食/餐厅线上活动"
                  name="type"
                ></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
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
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="1050"
      :closed="onCloseDia"
    >
      <el-form
        :model="updateForm"
        :rules="rules"
        ref="updateForm"
        label-width="100px"
        inline
        label-position="right"
      >
        <el-form-item label="活动名称" prop="name" style="display: block">
          <el-input
            v-model="updateForm.name"
            maxlength="10"
            style="width: 800px"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="updateForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" required>
          <el-form-item prop="date1">
            <el-date-picker
              v-model="updateForm.date"
              type="datetimerange"
              placeholder="请选择日期"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
            />
          </el-form-item>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="updateForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="updateForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input
            type="textarea"
            :rows="1"
            v-model="updateForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item label="地点" prop="adr">
          <el-cascader
            v-model="updateForm.adr"
            style="width: 250px"
            :options="addressList"
            placeholder="请选择"
            filterable
            clearable
          />
        </el-form-item>
        <el-form-item label="客户" prop="cus">
          <el-input v-model="updateForm.cus" placeholder=" 请选择" readonly>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="onOpenZoom()"
            />
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="onCloseDia('updateForm')"
          >关 闭</el-button
        >
        <el-button size="mini" type="primary" @click="onSave('updateForm')"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <!-- 放大镜 -->
    <el-dialog
      title="放大镜"
      :visible.sync="zoomVisible"
      width="40%"
      append-to-body
      :closed="onCloseZoom"
      destroy-on-close
    >
      <div v-loading="zoomLoading">
        <el-table
          :data="tableList || []"
          style="width: 100%"
          stripe
          border
          @row-dblclick="rowSelected"
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
    <el-backtop>
      <div class="back">UP</div>
    </el-backtop>
  </div>
</template>
<script>
import MCollapse from "@/components/MCollapse";
export default {
  name: "tempalte",
  components: { MCollapse },
  props: {},
  data() {
    return {
      dialogVisible: false,
      zoomVisible: false,
      dialogTitle: "新增",
      loading: false,
      zoomLoading: false,
      pageSizes: [20, 30, 40, 50],
      pageSize: 20,
      queryForm: {
        name: "",
        region: "",
        date: "",
        type: [],
        resource: "",
        desc: "",
      },
      updateForm: {
        name: "",
        region: "",
        date: "",
        type: [],
        resource: "",
        desc: "",
        cus: "",
        adr: [],
      },
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
    onQuery(formName) {
      // 发请求
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      console.log(111);
      this.zoomVisible = true;
    },
    // guanbizoom
    onCloseZoom() {
      this.zoomVisible = false;
    },
    // 新增
    onAdd(formName) {
      this.updateForm = {
        name: "",
        region: "",
        date: "",
        type: [],
        resource: "",
        desc: "",
        cus: "",
        adr: [],
      };
      this.dialogTitle = "新增";
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    // 编辑
    onUpdate(row) {
      this.dialogTitle = "修改";
      this.dialogVisible = true;
      this.updateForm = Object.assign({}, this.updateForm, row);
    },
    // 保存
    onSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          //发请求
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    // 双击选中
    rowSelected(row) {
      console.log("row", row);
      this.zoomVisible = false;
      this.updateForm["cus"] = row["name"];
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
.el-table ::v-deep.el-table__row {
  cursor: pointer;
}
</style>
