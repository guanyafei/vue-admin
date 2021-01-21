<template>
  <div>
    <el-form :ref="`${formKey}Ref`" class="form-box" inline :model="forms[formKey]" label-width="100px" label-position="right">
      <el-form-item v-for="(keyItem) in Object.keys(forms[formKey]).sort()" :key="keyItem" :label="(formItems[keyItem]&&formItems[keyItem].lable) || ''" :prop="keyItem">
        <template v-if="Object.keys(formItems).length>0 &&formItems[keyItem]&& formItems[keyItem].tag">
          <template v-if="formItems[keyItem].tag === 'text'">
            <m-input v-model="forms[formKey][keyItem]" :itemConfig="formItems[keyItem]" ></m-input>
          </template>
          <template v-else-if="formItems[keyItem].tag === 'textarea'">
            <m-input v-model="forms[formKey][keyItem]" :itemConfig="formItems[keyItem]" ></m-input>
          </template>
          <template v-else-if="formItems[keyItem].tag === 'select'">
            <m-select v-model="forms[formKey][keyItem]" :itemConfig="formItems[keyItem]" ></m-select>
          </template>
          <template v-else-if="formItems[keyItem].tag === 'date'">
            <m-date v-model="forms[formKey][keyItem]" :itemConfig="formItems[keyItem]" ></m-date>
          </template>
          <template v-else-if="formItems[keyItem].tag === 'radio'">
            <m-radio v-model="forms[formKey][keyItem]" :itemConfig="formItems[keyItem]" ></m-radio>
          </template>
          <template v-else-if="formItems[keyItem].tag === 'checkbox'">
            <m-checkbox v-model="forms[formKey][keyItem]" :itemConfig="formItems[keyItem]" ></m-checkbox>
          </template>
          <template v-else-if="formItems[keyItem].tag === 'cascader'">
            <m-cascader v-model="forms[formKey][keyItem]" :itemConfig="formItems[keyItem]" ></m-cascader>
          </template>
          <template v-else-if="formItems[keyItem].tag === 'zoom'">
            <m-zoom v-model="forms[formKey][keyItem]" :itemConfig="formItems[keyItem]" ></m-zoom>
          </template>
        </template>
      </el-form-item>
      <el-form-item v-for="(item,index) in buttonItems" :key="index">
        <template>
          <m-button :itemConfig="item" :formData="forms" :formKey="formKey"></m-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
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
export default {
  name: 'MForm',
  components: { MInput, MButton, MDialog, MSelect, MDate, MRadio, MCheckbox, MCascader, MZoom},
  inject: {
    $app: {
      default: () => ({})
    }
  },
  props:{
    xmlConfigObj:{},
    updateDate:{},
    formKey:''
  },
  data() {
    return {
      forms: {},
      formItems:{},
      buttonItems:[]
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
    const searchConfig = this.xmlConfigObj;
    this.formKey && this.$set(this.forms, this.formKey, {});
    this.initForm(searchConfig);
    isEmptyObj(this.updateDate) && this.$set(this.forms, this.formKey, this.updateDate);
    this.$nextTick(()=>{
      this.$set(this.$app.forms, this.formKey, this.forms[this.formKey]);
      this.$set(this.$app.formRefs, this.formKey, this.$refs[`${this.formKey}Ref`]);
    });
  },
  mounted() {
  },
  methods: {
    // xml to json表单数据组装  初始化
    initForm(searchConfig) {
      let tempKey = '', itemObj = {};
      Object.keys(searchConfig).map(key => {
        if(key === '$'){

        }else if( key === 'button'){
          searchConfig[key].map(item => {
            itemObj = item.$;
            this.buttonItems.push(itemObj);
          });
        }else if( key === 'select' || key === 'radio'){
          searchConfig[key].map(item => {
            itemObj = item.$;
            this.$set(this.forms[this.formKey], itemObj.prop, '');
            itemObj.tag = key;
            itemObj.options && !isArray(itemObj.options) && (itemObj = Object.assign(itemObj,{'options':JSON.parse(itemObj.options)}));
            this.formItems[itemObj.prop] = itemObj;
          });
        }else if(key === 'checkbox'){
          searchConfig[key].map(item => {
            itemObj = item.$;
            this.$set(this.forms[this.formKey], itemObj.prop, []);
            itemObj.tag = key;
            itemObj.options && !isArray(itemObj.options) && (itemObj = Object.assign(itemObj,{'options':JSON.parse(itemObj.options)}));
            this.formItems[itemObj.prop] = itemObj;
          });
        }else if(key === 'cascader'){
          searchConfig[key].map(item => {
            itemObj = item.$;
            this.$set(this.forms[this.formKey], itemObj.prop, []);
            itemObj.tag = key;
            itemObj.options && !isArray(itemObj.options) && (itemObj = Object.assign(itemObj,{'options':JSON.parse(itemObj.options)}));
            this.formItems[itemObj.prop] = itemObj;
          });
        }else{
          searchConfig[key].map(item => {
            itemObj = item.$;
            this.$set(this.forms[this.formKey], itemObj.prop, '');
            itemObj.tag = key;
            this.formItems[itemObj.prop] = itemObj;
          });
        }
      });
    },
    // rowData剔除ID
    removeDateId(row){
      let obj = {};
      for(let key in row){
        if(key !== 'id') obj[key] = row[key];
      }
      return obj;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
