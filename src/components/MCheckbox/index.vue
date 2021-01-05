<template>
 <el-checkbox-group v-model="formItemVal" :placeholder="itemConfig.placeholder || placeholder" @input="handleModelInput">
    <el-checkbox v-for="item in itemConfig.options || options"
      :key="item"
      :label="item"
      >
      {{item}}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'MCheckbox',
  props: {
    itemConfig:{
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
        type: Boolean,
        default: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: '请输入'
    },
    options: []
  },
  data() {
    return {
      formItemVal:JSON.parse(this.value)
    }
  },
  watch:{
   'value':{
      handler: function(val, oldVal){
        this.formItemVal = val;
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleModelInput(value) {
      console.log("MCheckbox",value)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
