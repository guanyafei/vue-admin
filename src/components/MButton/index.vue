<template>
  <el-button :type="itemConfig.type || type" @click="submitHandle"  :disabled="disabled" size="mini">{{itemConfig.placeholder || placeholder}}</el-button>
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
    formData:{
      type: Object,
      default: ()=>{}
    },
    xmlConfigObj:{}
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
      if(!this.itemConfig._id) return;
      this.$app.handle[this.itemConfig._id](this.rowObj,this.formData);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
