<template>
  <el-button
    v-if="isReset"
    :type="itemConfig.type || type"
    :disabled="disabled"
    size="mini"
    @click="reSetForms"
    >{{ itemConfig.placeholder || placeholder }}</el-button
  >
  <el-button
    v-else
    :type="itemConfig.type || type"
    :disabled="disabled"
    size="mini"
    @click="submitHandle"
    >{{ itemConfig.placeholder || placeholder }}</el-button
  >
</template>

<script>
import { isDisabledFn, setBtnStatus } from "@/utils/index";
import getStatus from "@/common/status.js";
export default {
  name: "MButton",
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
    rowObj: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: "primary",
    },
    placeholder: {
      type: String,
      default: "",
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    tableId: {
      type: String,
      default: "",
    },
    formKey: {
      type: String,
      default: "",
    },
    isDisbled: {
      type: String,
      default: "false",
    },
    mainFlag: {
      type: String,
      default: "N",
    },
    mainTableId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      status:
        getStatus(this.$route.name)[this.itemConfig["statusValidateId"]] || {},
    };
  },
  computed: {
    disabled: function () {
      return setBtnStatus(this.status, this.rowObj) || this.itemConfig.disabled
        ? true
        : false;
    },
    isReset: function () {
      return this.itemConfig._id === "reset";
    },
  },
  created() {},
  mounted() {},
  methods: {
    submitHandle() {
      if (!this.itemConfig._id) return;
      this.$set(this.$app, "mainFlag", this.mainFlag);
      this.mainFlag === "Y" &&
        this.mainTableId.length &&
        (this.$app._mainTableId = this.mainTableId);
      this.$app.tableId = this.tableId ? this.tableId : this.formKey;
      // this.$app.handle[this.itemConfig._id](this.rowObj, this.$app.tableId, this.itemConfig, this.mainFlag)
      if (!this.$app.handle[this.itemConfig._id]) {
        this.$message({
          message: "请查看是否配置相应_id！",
          type: "error",
        });
        return;
      }
      this.$app.handle[this.itemConfig._id](
        this.rowObj,
        this.$app.tableId,
        this.mainFlag,
        this.itemConfig.isQueryBtn
      );
    },
    reSetForms() {
      this.$app["formRefs"][`${this.formKey}`].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
