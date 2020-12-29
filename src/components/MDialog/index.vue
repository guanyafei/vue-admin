<template>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleObj[dialogVisibleFlag]"
        >
        <slot></slot>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleObj[dialogVisibleFlag] = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleObj[dialogVisibleFlag] = false">确 定</el-button>
        </span>
      </el-dialog>
</template>

<script>
export default {
  name: 'MDialog',
  props: {
    dialogVisibleFlag:'',
    itemConfig:{
    },
  },
  data() {
    return {
      dialogVisibleObj:{
      }
    }
  },
  created() {
    this.$set(this.dialogVisibleObj,this.dialogVisibleFlag,false);
  },
  mounted() {
  },
  methods: {
  
  }
}
</script>

<style lang="scss" scoped>
</style>
