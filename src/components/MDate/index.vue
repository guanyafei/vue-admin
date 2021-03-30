<template>
  <el-date-picker
    v-model="formItemVal"
    :style="widths"
    :type="itemConfig.type || type"
    :placeholder="itemConfig.placeholder || placeholder"
    range-separator="至"
    value-format="yyyy-MM-dd"
    :disabled="disabled"
    clearable
    @change="handleModelInput"
  />
</template>

<script>
import { isDisabledFn } from "@/utils/index";
export default {
  name: "MDate",
  props: {
    itemConfig: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "date",
    },
    placeholder: {
      type: String,
      default: "选择日期",
    },
    isDisbled: {
      type: String,
      default: "false",
    },
    width: {
      type: String,
      default: "250px",
    },
  },
  data() {
    return {
      formItemVal: this.value,
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
  },
  watch: {
    value: {
      handler: function (val) {
        this.formItemVal = val;
      },
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleModelInput(val) {
      console.log("xxxxxxxxxxx", val);
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
