<template>
  <el-form ref="form" class="form-box" inline :model="forms" label-width="60px">
    <el-form-item v-for="(keyItem) in Object.keys(forms)" :key="keyItem" :label="lables[keyItem]" :prop="forms[keyItem]">
      <el-select v-if="types[keyItem] =='select'" v-model="forms[keyItem]" :placeholder="placeholders[keyItem]">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
      <el-radio-group v-else-if="types[keyItem] =='radio'" v-model="forms[keyItem]" size="small">
        <el-radio label="3" border>1</el-radio>
        <el-radio label="6" border>2</el-radio>
        <el-radio label="9" border>3</el-radio>
      </el-radio-group>
      <el-input v-else v-model="forms[keyItem]" :type="types[keyItem]" :placeholder="placeholders[keyItem]" />
    </el-form-item>
    <el-form-item v-if="buttons.length>0">
      <el-button v-for="item in buttons" :key="item.placeholder" type="primary">{{ item.placeholder }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import defalutProps from './prop'
import request from '@/utils/request'
export default {
  name: 'GmInput',
  props: defalutProps,
  data() {
    return {
      forms: {}, // 表单
      lables: {}, // 表单名
      placeholders: {}, // 占位文本
      types: {}, // 表单类型
      buttons: [], // 提交类型
      urls: '', // 搜索url
      dataArr: []
    }
  },
  created() {
    const searchConfig = this.xmlConfigObj.root.searchForm[0]
    this.urls = searchConfig.$.action
    this.initForm(searchConfig)
    this.queryData(this.urls)
  },
  mounted() {
  },
  methods: {
    // xml to json表单数据组装  初始化
    initForm(searchConfig) {
      let tempKey = ''; let itemObj = {}
      Object.keys(searchConfig).map((key) => {
        if (key === '$') return
        searchConfig[key].map(item => {
          tempKey = key == 'input' ? 'forms' : 'buttons'
          itemObj = item.$
          if (tempKey === 'buttons') {
            this.buttons.push(itemObj)
          } else {
            this.$set(this[tempKey], itemObj.prop, '')
            this.$set(this.lables, itemObj.prop, itemObj.lable)
            this.$set(this.placeholders, itemObj.prop, itemObj.placeholder)
            this.$set(this.types, itemObj.prop, itemObj.type)
          }
        })
      })
    },
    // 查询
    async queryData(urls) {
      // this.dataArr = await request({
      //   url: urls,
      //   method: 'get',
      //   params: this.forms
      // })
      this.dataArr = [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
      this.$parent.baseData = this.dataArr
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
