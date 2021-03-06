<template>
  <div class="form-box">
    <el-form
      v-if="mainBoxFlag === 'N'"
      :ref="`${formKey}Ref`"
      :model="forms[formKey]"
      inline
      label-position="right"
      v-loading="isLoading"
    >
      <el-form-item
        v-for="keyItem in Object.keys(forms[formKey])"
        v-show="formItems[keyItem] && formItems[keyItem].hidden !== 'true'"
        :key="keyItem"
        :label-width="setLabelWidth(formItems[keyItem])"
        :label="(formItems[keyItem] && formItems[keyItem].lable) || ''"
        :prop="keyItem"
        :rules="setRules(formItems[keyItem])"
        :style="setStyle(formItems[keyItem])"
      >
        <m-form-item
          :forms="forms"
          :form-key="formKey"
          :form-items="formItems"
          :key-item="keyItem"
          :is-disbled="isDisbled"
        />
      </el-form-item>
      <el-form-item
        v-for="item in blockButtonItems"
        style="display: block; text-align: right"
        :key="item._id"
      >
        <m-button
          :item-config="item"
          :form-data="forms"
          main-flag="N"
          :form-key="formKey"
        />
      </el-form-item>
      <el-form-item v-for="item in inlineButtonItems" :key="item._id">
        <m-button
          :item-config="item"
          :form-data="forms"
          main-flag="N"
          :form-key="formKey"
        />
      </el-form-item>
    </el-form>
    <el-form
      v-if="mainBoxFlag === 'Y'"
      :ref="`${formKey}Ref`"
      inline
      :model="forms[formKey]"
      label-position="left"
    >
      <m-collapse :form-item-len="Object.keys(forms[formKey]).length">
        <template v-slot:visible-form-slot>
          <template v-for="(keyItem, idx) in Object.keys(forms[formKey])">
            <el-form-item
              v-show="
                formItems[keyItem] && formItems[keyItem].hidden !== 'true'
              "
              v-if="idx < 3"
              :key="keyItem"
              :label-width="setLabelWidth(formItems[keyItem])"
              :label="(formItems[keyItem] && formItems[keyItem].lable) || ''"
              :prop="keyItem"
              :rules="setRules(formItems[keyItem])"
              :style="setStyle(formItems[keyItem])"
            >
              <m-form-item
                :forms="forms"
                :form-key="formKey"
                :form-items="formItems"
                :key-item="keyItem"
                :is-disbled="isDisbled"
              />
            </el-form-item>
          </template>
        </template>
        <template v-slot:visible-block-btn-slot>
          <el-form-item
            :key="item._id"
            v-for="item in blockButtonItems"
            style="display: block"
          >
            <m-button
              :item-config="item"
              :main-table-id="mainTableId"
              :form-data="forms"
              main-flag="Y"
              :form-key="formKey"
            />
          </el-form-item>
        </template>
        <template v-slot:visible-inline-btn-slot>
          <el-form-item :key="item._id" v-for="item in inlineButtonItems">
            <m-button
              :item-config="item"
              :main-table-id="mainTableId"
              :form-data="forms"
              main-flag="Y"
              :form-key="formKey"
            />
          </el-form-item>
        </template>
        <template v-for="(keyItem, idx) in Object.keys(forms[formKey])">
          <el-form-item
            v-show="formItems[keyItem] && formItems[keyItem].hidden !== 'true'"
            v-if="idx >= 3"
            :key="keyItem"
            :label-width="setLabelWidth(formItems[keyItem])"
            :label="(formItems[keyItem] && formItems[keyItem].lable) || ''"
            :prop="keyItem"
            :rules="setRules(formItems[keyItem])"
            :style="setStyle(formItems[keyItem])"
          >
            <m-form-item
              :forms="forms"
              :form-key="formKey"
              :form-items="formItems"
              :key-item="keyItem"
              :is-disbled="isDisbled"
            />
          </el-form-item>
        </template>
      </m-collapse>
    </el-form>
  </div>
</template>

<script>
import { isArray, isEmptyObj } from "@/utils/validate";
import setRules from "@/common/validate";
import { onIsCanUse } from "@/utils/index";
import MFormItem from "@/components/MFormItem";
import MCollapse from "@/components/MCollapse";
import MButton from "@/components/MButton";
export default {
  name: "MForm",
  components: { MFormItem, MButton, MCollapse },
  inject: {
    $app: {
      default: () => ({}),
    },
  },
  props: {
    xmlConfigObj: {
      type: Object,
      default: () => ({}),
    },
    updateDate: {
      type: Object,
      default: () => ({}),
    },
    formKey: {
      type: String,
      default: "",
    },
    mainBoxFlag: {
      type: String,
      default: "N",
    },
    isDisbled: {
      type: String,
      default: "false",
    },
    mainTableId: {
      type: String,
      default: "",
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      forms: {},
      formItems: {},
      blockButtonItems: [],
      inlineButtonItems: [],
      canUseBtns: this.$app.canUseBtns,
    };
  },
  created() {
    const searchConfig = this.xmlConfigObj;
    this.formKey && this.$set(this.forms, this.formKey, {});
    this.xmlToJson(searchConfig);
    this.$nextTick(() => {
      isEmptyObj(this.updateDate) && this.initForm(this.forms[this.formKey]);
      this.$set(this.$app.forms, this.formKey, this.forms[this.formKey]);
      this.$set(
        this.$app.formRefs,
        this.formKey,
        this.$refs[`${this.formKey}Ref`]
      );
    });
  },
  mounted() {},
  methods: {
    // 设置样式
    setStyle(param) {
      return param && param.block === "true" ? "display:block" : "";
    },
    // 设置表单项规则 tel number email data 需特殊处理
    setRules,
    // 更新  rowDate 赋值给 form表单
    initForm(formObj) {
      Object.keys(formObj).map((keyItem) => {
        formObj[keyItem] = this.updateDate[keyItem];
      });
    },
    // xml to json表单数据组装  初始化
    xmlToJson(searchConfig) {
      let itemObj = {};
      Object.keys(searchConfig).map((key) => {
        if (key === "button") {
          searchConfig[key].map((item) => {
            itemObj = item.$;
            if (itemObj.block && itemObj.block === "true") {
              onIsCanUse(this.canUseBtns, itemObj._id) &&
                this.blockButtonItems.push(itemObj);
            } else {
              onIsCanUse(this.canUseBtns, itemObj._id) &&
                this.inlineButtonItems.push(itemObj);
            }
          });
        } else if (key === "formItem") {
          searchConfig[key].map((item) => {
            if (!item.$) return;
            itemObj = item.$;
            switch (item.$.tag) {
              case "select":
              case "radio":
                this.$set(this.forms[this.formKey], itemObj.prop, null);
                itemObj.options &&
                  !isArray(itemObj.options) &&
                  (itemObj = Object.assign(itemObj, {
                    options: JSON.parse(itemObj.options),
                  }));
                break;
              case "checkbox":
              case "cascader":
              case "daterange":
                this.$set(this.forms[this.formKey], itemObj.prop, []);
                itemObj.options &&
                  !isArray(itemObj.options) &&
                  (itemObj = Object.assign(itemObj, {
                    options: JSON.parse(itemObj.options),
                  }));
                break;
              default:
                itemObj = item.$;
                this.$set(this.forms[this.formKey], itemObj.prop, null);
            }
            this.formItems[itemObj.prop] = itemObj;
          });
        }
      });
    },
    // 设置表单标签宽度
    setLabelWidth(obj = {}) {
      return obj["labelWidth"] ? `${obj["labelWidth"]}px` : this.labelWidth;
    },
    // rowData剔除ID
    // removeDateId(row) {
    //   const obj = {}
    //   for (const key in row) {
    //     if (key !== 'id') obj[key] = row[key]
    //   }
    //   return obj
    // }
  },
};
</script>

<style lang="scss" scoped>
</style>
