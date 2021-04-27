<template>
  <!-- 新增&修改 -->
  <el-dialog
    :title="dialogTitle"
    :visible.sync="showUpdateVisible"
    width="1050"
    :before-close="onCloseDia"
  >
    <el-form
      :model="updateForm"
      ref="updateForm"
      label-width="100px"
      inline
      label-position="left"
    >
      <el-form-item label="活动名称" prop="name" style="display: block">
        <el-input
          v-model="updateForm.name"
          maxlength="10"
          style="width: 800px"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="活动区域"
        prop="region"
        :rules="setRules({ validator: 'region' })"
      >
        <el-select v-model="updateForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" required>
        <el-form-item prop="date">
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
        <el-input
          v-model="updateForm.cus"
          placeholder=" 请选择"
          readonly
          :disabled="disabled"
        >
          <el-button
            :disabled="disabled"
            slot="append"
            icon="el-icon-search"
            @click="onOpenZoom()"
          />
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onCloseDia()">关 闭</el-button>
      <el-button size="mini" type="primary" @click="onSave()">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { setRules } from "@/utils/validate";
export default {
  name: "MUpdate",
  components: {},
  props: {
    showUpdateVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "新增",
      loading: false,
      disabled: false,
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
  created() {
    // 新增、更新初始化数据
    this.$bus.$on("updateDate", (data) => {
      if (data && !!data.id) {
        this.dialogTitle = "修改";
        this.disabled = true;
        this.updateForm = Object.assign({}, this.updateForm, data);
      } else {
        this.disabled = false;
        this.dialogTitle = "新增";
        this.$nextTick(() => {
          this.$refs["updateForm"].resetFields();
          this.updateForm = Object.assign(
            {},
            {
              name: "",
              region: "",
              date: "",
              type: [],
              resource: "",
              desc: "",
              cus: "",
              adr: [],
            }
          );
        });
      }
    });
    // 处理放大镜选中数据
    this.$bus.$on("zoomDate", (data) => {
      this.updateForm["cus"] = data["name"];
    });
  },
  mounted() {},
  methods: {
    // 设置规则
    setRules,
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
    // 保存
    onSave() {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
          //发请求
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 放大镜
    onOpenZoom() {
      this.$emit("onShowZoom");
    },
    // 重置表单数据
    onCloseDia() {
      this.$refs["updateForm"].resetFields();
      this.updateForm = Object.assign(
        {},
        {
          name: "",
          region: "",
          date: "",
          type: [],
          resource: "",
          desc: "",
          cus: "",
          adr: [],
        }
      );
      this.$emit("onHideUpdate");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button.is-disabled,
.el-button.is-disabled:hover {
  border-color: transparent;
  background-color: transparent;
}
</style>
