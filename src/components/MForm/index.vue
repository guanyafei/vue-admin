<template>
  <div class="form-item">
    <el-form v-if="mainBoxFlag === 'N'" :ref="`${formKey}Ref`" :model="forms[formKey]" inline label-width="100px" class="form-box" label-position="right">
      <el-form-item v-for="(keyItem) in Object.keys(forms[formKey]).sort()" :key="keyItem" :label="(formItems[keyItem]&&formItems[keyItem].lable) || ''" :prop="keyItem"  :rules="setRules(formItems[keyItem])">
        <template v-if="Object.keys(formItems).length>0 &&formItems[keyItem]&& formItems[keyItem].tag">
          <template v-if="formItems[keyItem].tag === 'text'">
            <m-input v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
          </template>
          <template v-else-if="formItems[keyItem].tag === 'textarea'">
            <m-input v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
          </template>
          <template v-else-if="formItems[keyItem].tag === 'select'">
            <m-select v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
          </template>
          <template v-else-if="formItems[keyItem].tag === 'date'">
            <m-date v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
          </template>
          <template v-else-if="formItems[keyItem].tag === 'radio'">
            <m-radio v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
          </template>
          <template v-else-if="formItems[keyItem].tag === 'checkbox'">
            <m-checkbox v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
          </template>
          <template v-else-if="formItems[keyItem].tag === 'cascader'">
            <m-cascader v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
          </template>
          <template v-else-if="formItems[keyItem].tag === 'zoom'">
            <m-zoom v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
          </template>
        </template>
      </el-form-item>
      <el-form-item v-for="(item,index) in buttonItems" :key="index">
        <m-button :item-config="item" :form-data="forms" :form-key="formKey" />
      </el-form-item>
    </el-form>
    <el-form v-if="mainBoxFlag === 'Y'" :ref="`${formKey}Ref`" class="form-box" inline :model="forms[formKey]" label-width="100px" label-position="right">
      <m-collapse>
        <template v-slot:visible-slot>
          <template  v-for="(keyItem,idx) in Object.keys(forms[formKey]).sort()" >
            <el-form-item :key="keyItem"  :label="(formItems[keyItem]&&formItems[keyItem].lable) || ''" :prop="keyItem" v-if="idx<3">
              <template v-if="Object.keys(formItems).length>0 &&formItems[keyItem]&& formItems[keyItem].tag">
                <template v-if="formItems[keyItem].tag === 'text'">
                  <m-input v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
                </template>
                <template v-else-if="formItems[keyItem].tag === 'textarea'">
                  <m-input v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
                </template>
                <template v-else-if="formItems[keyItem].tag === 'select'">
                  <m-select v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
                </template>
                <template v-else-if="formItems[keyItem].tag === 'date'">
                  <m-date v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
                </template>
                <template v-else-if="formItems[keyItem].tag === 'radio'">
                  <m-radio v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
                </template>
                <template v-else-if="formItems[keyItem].tag === 'checkbox'">
                  <m-checkbox v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
                </template>
                <template v-else-if="formItems[keyItem].tag === 'cascader'">
                  <m-cascader v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
                </template>
                <template v-else-if="formItems[keyItem].tag === 'zoom'">
                  <m-zoom v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
                </template>
              </template>
            </el-form-item>
          </template>
          <el-form-item v-for="(item,index) in buttonItems" :key="index">
            <m-button :item-config="item" :form-data="forms" :form-key="formKey" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  size="mini" @click="reSetForms()">重置</el-button>
          </el-form-item>
        </template>
        <template v-for="(keyItem,idx) in Object.keys(forms[formKey]).sort()" >
          <el-form-item :key="keyItem"  :label="(formItems[keyItem]&&formItems[keyItem].lable) || ''" :prop="keyItem" v-if="idx>=3">
            <template v-if="Object.keys(formItems).length>0 &&formItems[keyItem]&& formItems[keyItem].tag">
              <template v-if="formItems[keyItem].tag === 'text'">
                <m-input v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
              </template>
              <template v-else-if="formItems[keyItem].tag === 'textarea'">
                <m-input v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
              </template>
              <template v-else-if="formItems[keyItem].tag === 'select'">
                <m-select v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
              </template>
              <template v-else-if="formItems[keyItem].tag === 'date'">
                <m-date v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
              </template>
              <template v-else-if="formItems[keyItem].tag === 'radio'">
                <m-radio v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
              </template>
              <template v-else-if="formItems[keyItem].tag === 'checkbox'">
                <m-checkbox v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
              </template>
              <template v-else-if="formItems[keyItem].tag === 'cascader'">
                <m-cascader v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
              </template>
              <template v-else-if="formItems[keyItem].tag === 'zoom'">
                <m-zoom v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" />
              </template>
            </template>
          </el-form-item>
        </template>
      </m-collapse>
    </el-form>
  </div>
</template>

<script>
import { isArray, isEmptyObj } from '@/utils/validate'
import MInput from '@/components/MInput'
import MButton from '@/components/MButton'
import MDialog from '@/components/MDialog'
import MSelect from '@/components/MSelect'
import MDate from '@/components/MDate'
import MRadio from '@/components/MRadio'
import MCheckbox from '@/components/MCheckbox'
import MCascader from '@/components/MCascader'
import MZoom from '@/components/MZoom'
import MCollapse from '@/components/MCollapse'
export default {
  name: 'MForm',
  components: { MInput, MButton, MDialog, MSelect, MDate, MRadio, MCheckbox, MCascader, MZoom, MCollapse },
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props: {
    xmlConfigObj: {},
    updateDate: {},
    formKey: '',
    mainBoxFlag: {
      type: String,
      default: 'N'
    }
  },
  data() {
    return {
      forms: {},
      formItems: {},
      buttonItems: []
    }
  },
  // watch:{
  //  'updateDate':{
  //     handler: function(val, oldVal){
  //       this.forms[this.formKey] = Object.assign(this.forms[this.formKey],this.removeDateId(val));
  //     },
  //     deep: true
  //   }
  // },
  created() {
    const searchConfig = this.xmlConfigObj
    this.formKey && this.$set(this.forms, this.formKey, {})
    this.xmlToJson(searchConfig)
    isEmptyObj(this.updateDate) && this.initForm(this.forms[this.formKey])
    this.$nextTick(() => {
      this.$set(this.$app.forms, this.formKey, this.forms[this.formKey])
      this.$set(this.$app.formRefs, this.formKey, this.$refs[`${this.formKey}Ref`])
    });
    console.log("this.formItems",this.formItems)
  },
  mounted() {
  },
  methods: {
    // 设置表单项规则 tel number email data 需特殊处理
    setRules(item){
      let rulesArr = [];
      if(item.hasOwnProperty('required')){
        switch (item.type){
          case 'tel':
            rulesArr = [
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { trigger: ['blur', 'change'] , validator: (rule, value, callback) => {
                if (/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(value) == false) {
                  callback(new Error('请输入正确的手机号'));
                } else {
                  callback();
                }
              }}
            ];
          break;
          case 'date':
            rulesArr = [,
              { required: true, message: '请选择时间', trigger: ['blur', 'change'] }
            ];
          break; 
          case 'email':
            rulesArr = [
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ];
          break;
          case 'number':
            rulesArr = [
              { required: true, message: '此项为必输项', trigger: 'blur' },
              { type: 'number', trigger: ['blur', 'change'] ,validator: (rule, value, callback) => {
                if (/^[1-9]\d*$/.test(value) == false) {
                  callback(new Error(`${item.prop}必须为数字`));
                } else {
                  callback();
                }
              }}
            ];
          break;
          default:
            rulesArr = [
              { required: true, message: '此项为必输项', trigger: ['blur', 'change'] }
            ];
        };
        return rulesArr;
      }
    },
    reSetForms(){
      this.$app['formRefs'][`${this.formKey}`].resetFields();
    },
    /**
     * @name: initForm
     * @msg: 更新  rowDate 赋值给 form表单
     * @param {row}
     * @return {form}
     */
    initForm(formOgj) {
      Object.keys(formOgj).map(keyItem => {
        this.updateDate.hasOwnProperty(keyItem) && (formOgj[keyItem] = this.updateDate[keyItem])
      })
    },
    // xml to json表单数据组装  初始化
    xmlToJson(searchConfig) {
      let itemObj = {}
      Object.keys(searchConfig).map(key => {
        if (key === '$') {

        } else if (key === 'button') {
          searchConfig[key].map(item => {
            itemObj = item.$
            this.buttonItems.push(itemObj)
          })
        } else if (key === 'select' || key === 'radio') {
          searchConfig[key].map(item => {
            itemObj = item.$
            this.$set(this.forms[this.formKey], itemObj.prop, '')
            itemObj.tag = key
            itemObj.options && !isArray(itemObj.options) && (itemObj = Object.assign(itemObj, { 'options': JSON.parse(itemObj.options) }))
            this.formItems[itemObj.prop] = itemObj
          })
        } else if (key === 'checkbox') {
          searchConfig[key].map(item => {
            itemObj = item.$
            this.$set(this.forms[this.formKey], itemObj.prop, [])
            itemObj.tag = key
            itemObj.options && !isArray(itemObj.options) && (itemObj = Object.assign(itemObj, { 'options': JSON.parse(itemObj.options) }))
            this.formItems[itemObj.prop] = itemObj
          })
        } else if (key === 'cascader') {
          searchConfig[key].map(item => {
            itemObj = item.$
            this.$set(this.forms[this.formKey], itemObj.prop, [])
            itemObj.tag = key
            itemObj.options && !isArray(itemObj.options) && (itemObj = Object.assign(itemObj, { 'options': JSON.parse(itemObj.options) }))
            this.formItems[itemObj.prop] = itemObj
          })
        } else {
          searchConfig[key].map(item => {
            itemObj = item.$
            this.$set(this.forms[this.formKey], itemObj.prop, '')
            itemObj.tag = key
            this.formItems[itemObj.prop] = itemObj
          })
        }
      })
    },
    // rowData剔除ID
    removeDateId(row) {
      const obj = {}
      for (const key in row) {
        if (key !== 'id') obj[key] = row[key]
      }
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
