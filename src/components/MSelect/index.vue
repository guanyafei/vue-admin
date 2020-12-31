<template>
  <el-select v-model="formItemVal" :placeholder="itemConfig.placeholder || placeholder" @input="handleModelInput">
    <el-option
      v-for="item in itemConfig.options || options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MSelect',
  props: {
    itemConfig:{
    },
    value: {
      type: String,
      default: ''
    },
    maxlength: {
      type: String,
      default: '6'
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
      default: '请选择'
    },
    options: [],
    dada:''
  },
  data() {
    return {
      formItemVal:this.value
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
    handleModelInput(val) {
      this.$emit('input', val)
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
