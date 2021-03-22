<template>
  <div class="form-item">
    <el-form v-if="mainBoxFlag === 'N'" :ref="`${formKey}Ref`" :model="forms[formKey]" inline class="form-box" label-position="right">
      <el-form-item  v-show="formItems[keyItem]&&formItems[keyItem].hidden !=='true'" v-for="(keyItem) in Object.keys(forms[formKey])" :key="keyItem" :label-width="setLabelWidth(formItems[keyItem])" :label="(formItems[keyItem]&&formItems[keyItem].lable) || ''" :prop="keyItem"  :rules="setRules(formItems[keyItem])">
        <m-form-item :forms="forms" :formKey="formKey" :formItems="formItems" :keyItem="keyItem" :isDisbled="isDisbled"/>
      </el-form-item>
      <el-form-item v-for="(item,index) in buttonItems" :key="index">
        <m-button :itemConfig="item" :formData="forms" mainFlag ='N' :formKey="formKey" />
      </el-form-item>
    </el-form>
    <el-form v-if="mainBoxFlag === 'Y'" :ref="`${formKey}Ref`" class="form-box" inline :model="forms[formKey]" label-width="100px" label-position="right">
      <m-collapse :formItemLen="Object.keys(forms[formKey]).length">
        <template v-slot:visible-slot>
          <template  v-for="(keyItem,idx) in Object.keys(forms[formKey])" >
            <el-form-item v-show="formItems[keyItem]&&formItems[keyItem].hidden !=='true'" :key="keyItem" :label-width="setLabelWidth(formItems[keyItem])" :label="(formItems[keyItem]&&formItems[keyItem].lable) || ''" :prop="keyItem" v-if="idx<3" :rules="setRules(formItems[keyItem])">
              <m-form-item :forms="forms" :formKey="formKey" :formItems="formItems" :keyItem="keyItem" :isDisbled="isDisbled"/>
            </el-form-item>
          </template>
          <el-form-item v-for="(item,index) in buttonItems" :key="index">
            <m-button :itemConfig="item" :mainTableId="mainTableId" :formData="forms" mainFlag ='Y' :formKey="formKey" />
          </el-form-item>
        </template>
        <template v-for="(keyItem,idx) in Object.keys(forms[formKey])" >
          <el-form-item  v-show="formItems[keyItem]&&formItems[keyItem].hidden !=='true'" :key="keyItem" :label-width="setLabelWidth(formItems[keyItem])"  :label="(formItems[keyItem]&&formItems[keyItem].lable) || ''" :prop="keyItem" v-if="idx>=3" :rules="setRules(formItems[keyItem])">
            <m-form-item :forms="forms" :formKey="formKey" :formItems="formItems" :keyItem="keyItem" :isDisbled="isDisbled"/>
          </el-form-item>
        </template>
      </m-collapse>
    </el-form>
  </div>
</template>

<script>
import { isArray, isEmptyObj, setRules} from '@/utils/validate'
import MFormItem from '@/components/MFormItem'
import MCollapse from '@/components/MCollapse'
import MButton from '@/components/MButton'
export default {
  name: 'MForm',
  components: { MFormItem, MButton, MCollapse },
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props: {
    xmlConfigObj: {
      type: Object,
      default: () => ({})
    },
    updateDate: {
      type: Object,
      default: () => ({})
    },
    formKey: {
      type: String,
      default: ''
    },
    mainBoxFlag: {
      type: String,
      default: 'N'
    },
    isDisbled: {
      type: String,
      default: 'false'
    },
    mainTableId: {
      type: String,
      default: ''
    },
    labelWidth:{
      type: String,
      default: '100px'
    }
  },
  data() {
    return {
      forms: {},
      formItems: {},
      buttonItems: []
    }
  },
  created() {
    const searchConfig = this.xmlConfigObj
    this.formKey && this.$set(this.forms, this.formKey, {})
    this.xmlToJson(searchConfig)
    isEmptyObj(this.updateDate) && this.initForm(this.forms[this.formKey])
    this.$nextTick(() => {
      this.$set(this.$app.forms, this.formKey, this.forms[this.formKey])
      this.$set(this.$app.formRefs, this.formKey, this.$refs[`${this.formKey}Ref`])
    });
  },
  mounted() {
  },
  methods: {
    // 设置表单项规则 tel number email data 需特殊处理
    setRules,
    // 更新  rowDate 赋值给 form表单
    initForm(formOgj) {
      Object.keys(formOgj).map(keyItem => {
        this.updateDate.hasOwnProperty(keyItem) && (formOgj[keyItem] = this.updateDate[keyItem])
      })
    },
    // xml to json表单数据组装  初始化
    xmlToJson(searchConfig) {
      let itemObj = {}
      Object.keys(searchConfig).map(key => {
        if (key === 'button') {
          searchConfig[key].map(item => {
            itemObj = item.$
            this.buttonItems.push(itemObj)
          })
        } else if (key === 'formItem'){
          searchConfig[key].map(item=>{
            if(!item.$) return
            itemObj = item.$
            switch (item.$.tag){
              case 'select':
              case 'radio':
                this.$set(this.forms[this.formKey], itemObj.prop, '')
                itemObj.options && !isArray(itemObj.options) && (itemObj = Object.assign(itemObj, { 'options': JSON.parse(itemObj.options) }))
                break;
              case 'checkbox':
              case 'cascader':
              case 'daterange':
                this.$set(this.forms[this.formKey], itemObj.prop, [])
                itemObj.options && !isArray(itemObj.options) && (itemObj = Object.assign(itemObj, { 'options': JSON.parse(itemObj.options) }))
                break;
              default:
                itemObj = item.$
                this.$set(this.forms[this.formKey], itemObj.prop, '')
            }
            this.formItems[itemObj.prop] = itemObj
          })
        }
      })
    },
    // 设置表单标签宽度
    setLabelWidth(obj={}){
       return obj['labelWidth'] ? `${obj['labelWidth']}px`:this.labelWidth
    },
    // rowData剔除ID
    // removeDateId(row) {
    //   const obj = {}
    //   for (const key in row) {
    //     if (key !== 'id') obj[key] = row[key]
    //   }
    //   return obj
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
