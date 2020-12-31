<template>
      <el-button :type="itemConfig.type || type" @click="submitHandle"  :disabled="disabled">{{itemConfig.placeholder || placeholder}}</el-button>
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
    itemConfig:{
    },
    rowObj:{},
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
    disabled:{
      type: Boolean,
      default: false
    },
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
    submitHandle(){
      if(!this.itemConfig.id) return;
      this.$app.handle[this.itemConfig.id](this.rowObj)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
