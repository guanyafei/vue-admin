<template>
  <el-form ref="form" class="form-box" inline :model="forms" label-width="60px">
    <el-form-item v-for="(keyItem) in Object.keys(forms)" :key="keyItem" :label="formItems[keyItem].lable || ''" :prop="forms[keyItem]">
      <template v-if="formItems[keyItem].type==='text' || formItems[keyItem].type==='textarea'">
      <m-input v-model="forms[keyItem]" :itemConfig="formItems[keyItem]" ></m-input>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import request from '@/utils/request'
import MInput from '@/components/MInput'
export default {
  name: 'MForm',
  components: { MInput },
  props:{
    xmlConfigObj:{}
  },
  data() {
    return {
      // pageConfig: pageConfig,
      forms: {},
      formItems:{}
    }
  },
  created() {
    const searchConfig = this.xmlConfigObj.root.searchForm[0];
    console.log("tetet",searchConfig)
    this.initForm(searchConfig)
  },
  mounted() {
  },
  methods: {
    // xml to json表单数据组装  初始化
    initForm(searchConfig) {
      let tempKey = '', itemObj = {};
      Object.keys(searchConfig).map(key => {
        if(key === '$' || key === 'button'){

        }else{
          searchConfig[key].map(item => {
            itemObj = item.$;
            console.log("adasdsd",itemObj)
            this.$set(this.forms, itemObj.prop, '');
            itemObj.type=key;
            this.formItems[itemObj.prop] = itemObj;
          })
        }
      })
      console.log("qqqqqtett",this.formItems)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
