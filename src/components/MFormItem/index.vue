<template>
  <div class="form-item">
    <template v-if="Object.keys(formItems).length>0 &&formItems[keyItem]&& formItems[keyItem].tag">
      <template v-if="formItems[keyItem].tag === 'text' || formItems[keyItem].tag === 'textarea'">
        <m-input v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" :isDisbled="isDisbled"/>
      </template>
      <template v-else-if="formItems[keyItem].tag === 'select'">
        <m-select v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" :isDisbled="isDisbled" />
      </template>
      <template v-else-if="formItems[keyItem].tag === 'date'">
        <m-date v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" :isDisbled="isDisbled" />
      </template>
      <template v-else-if="formItems[keyItem].tag === 'radio'">
        <m-radio v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" :isDisbled="isDisbled" />
      </template>
      <template v-else-if="formItems[keyItem].tag === 'checkbox'">
        <m-checkbox v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" :isDisbled="isDisbled" />
      </template>
      <template v-else-if="formItems[keyItem].tag === 'cascader'">
        <m-cascader v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" :isDisbled="isDisbled" />
      </template>
      <template v-else-if="formItems[keyItem].tag === 'daterange'">
        <m-daterange v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" :isDisbled="isDisbled" />
      </template>
      <template v-else-if="formItems[keyItem].tag === 'zoom'">
        <m-zoom v-model="forms[formKey][keyItem]" :item-config="formItems[keyItem]" :isDisbled="isDisbled" />
      </template>
    </template>
  </div>
</template>

<script>
import MInput from '@/components/MInput'
import MSelect from '@/components/MSelect'
import MDate from '@/components/MDate'
import MDaterange from '@/components/MDateRange'
import MRadio from '@/components/MRadio'
import MCheckbox from '@/components/MCheckbox'
import MCascader from '@/components/MCascader'
import MZoom from '@/components/MZoom'
export default {
  name: 'MFormItem',
  components: { MInput, MSelect, MDate, MRadio, MCheckbox, MCascader, MZoom, MDaterange },
  props: {
    formKey:{
      type: String,
      default: ''
    },
    forms:{
      type: Object,
      default: () => ({})
    },
    formItems:{
      type: Object,
      default: () => ({})
    },
    keyItem:{
      type: String,
      default: ''
    },
    isDisbled: {
      type: String,
      default: 'false'
    }
  },
  data() {
    return {
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
