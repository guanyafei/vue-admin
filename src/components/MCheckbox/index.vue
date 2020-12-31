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
    value: [],
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
      formItemVal:this.value
    }
  },
  // watch:{
  //  'value':{
  //     handler: function(val, oldVal){
  //       this.formItemVal = val;
  //     },
  //     deep: true
  //   }
  // },
  created() {
    console.log("MCheckbox",this.value)
  },
  mounted() {
  },
  methods: {
    handleModelInput(value) {
      this.$emit('input', value)
      // if (this.$parent.$options.componentName === 'ElFormItem') {
      //   if (this.validateEvent) {
      //     this.$parent.$emit('el.form.change', [value])
      //   }
      // }
      this.$emit('change', value)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
