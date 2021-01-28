<template>
  <el-button :type="itemConfig.type || type" :disabled="disabled" size="mini" @click="submitHandle">{{ itemConfig.placeholder || placeholder }}</el-button>
</template>

<script>
export default {
  name: 'MButton',
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props: {
    itemConfig: {
    },
    rowObj: {},
    type: {
      type: String,
      default: 'success'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '查询'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {}
    },
    tableId: '',
    formKey: ''
  },
  data() {
    return {

    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    submitHandle() {
      if (!this.itemConfig._id) return;
      this.$app.tableId = this.tableId ? this.tableId : this.formKey;
      this.$app.handle[this.itemConfig._id](this.rowObj, this.tableId, this.itemConfig);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
