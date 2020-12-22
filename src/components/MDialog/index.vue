<template>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        >
        <slot></slot>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
</template>

<script>
export default {
  name: 'MDialog',
  props: {
    itemConfig:{
    },
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  
  }
}
</script>

<style lang="scss" scoped>
</style>
