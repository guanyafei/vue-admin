<template>
  <el-radio-group v-model="formItemVal" :placeholder="itemConfig.placeholder || placeholder" @input="handleModelInput">
    <el-radio
      v-for="item in itemConfig.options || options"
      :key="item.label"
      :label="item.value"
      >
      {{item.label}}
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'MRadio',
  props: {
    itemConfig:{
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    options: []
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
