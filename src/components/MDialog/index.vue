<template>
  <el-dialog
    v-if="dialogVisibleObj[dialogVisibleFlag]"
    title="提示"
    :visible.sync="dialogVisibleObj[dialogVisibleFlag]"
    :width="widths"
    :closed="closeDia"
  >
    <slot />
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeDia">关 闭</el-button>
      <!-- <el-button
        size="mini"
        type="primary"
        :disabled="isSaveDisable"
        @click="save"
        :loading="loading"
        >保 存</el-button
      > -->
    </span>
  </el-dialog>
</template>

<script>
// import { fetch } from "@/utils/requestFn";
export default {
  name: "MDialog",
  inject: {
    $app: {
      default: () => ({}),
    },
  },
  props: {
    dialogVisibleFlag: {
      type: String,
      default: "",
    },
    xmlConfigObj: {
      type: Object,
      default: () => ({}),
    },
    handleId: {
      type: String,
      default: "",
    },
    saveOnShow: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "1000px",
    },
  },
  data() {
    return {
      dialogVisibleObj: {},
      loading: false,
      isSaveDisable: false,
    };
  },
  computed: {
    widths: function () {
      return this.xmlConfigObj.$.width
        ? `${this.xmlConfigObj.$.width}px`
        : `${this.width}`;
    },
    isSaveOnShow: function () {
      return this.xmlConfigObj.$.saveOnShow === "true" ? true : this.saveOnShow;
    },
  },
  created() {
    this.$set(this.dialogVisibleObj, this.dialogVisibleFlag, false);
  },
  mounted() {
    // loading
    // this.loading = this.$app.handleMapping[this.handleId]["loading"];
  },
  methods: {
    // 点击确定 发送请求
    // save() {
    //   console.log(
    //     "MDialog",
    //     this.$app,
    //     this.handleId,
    //     this.$app.tableId,
    //     this.$app.mainFlag,
    //     this.$app._mainTableId
    //   );
    //   this.$app["formRefs"][`${this.handleId}`].validate((valid) => {
    //     this.$app.handleMapping[this.handleId]["loading"] = true;
    //     this.loading = this.$app.handleMapping[this.handleId]["loading"];
    //     return;
    //     if (valid) {
    //       this.$app.handleMapping[this.handleId]["loading"] = true;
    //       this.loading = this.$app.handleMapping[this.handleId]["loading"];
    //       fetch(
    //         this.$app.handleMapping[this.handleId].action,
    //         this.$app.handleMapping[this.handleId].method,
    //         {
    //           ...this.$app.forms[this.handleId],
    //         }
    //       ).then((res) => {
    //         this.onSaveOnShow();
    //         let tableId = null;
    //         if (this.$app.mainFlag === "Y") {
    //           tableId = this.$app._mainTableId;
    //         } else if (this.$app.tableId) {
    //           tableId = this.$app.tableId;
    //         }
    //         this.$app.$refs[`${tableId}Table`].length
    //           ? this.$app.$refs[`${tableId}Table`][0].handleCurrentChange()
    //           : this.$app.$refs[`${tableId}Table`].handleCurrentChange();
    //       });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    // 重置表单数据
    closeDia() {
      this.$app.tableId = "";
      this.dialogVisibleObj[this.dialogVisibleFlag] = false;
      this.isSaveDisable = false;
      this.$app["formRefs"][this.handleId].resetFields();
    },
    // saveOnShow 保存后是否立即关闭弹窗
    onSaveOnShow() {
      this.$app.handleMapping[this.handleId]["loading"] = true;
      this.loading = this.$app.handleMapping[this.handleId]["loading"];
      this.isSaveOnShow ? (this.isSaveDisable = true) : this.closeDia();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
