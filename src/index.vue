<template>
  <div class="container">
    <section v-if="rootData.main" class="main">
      <m-form v-if="rootData.main[0].form&&rootData.main[0].form.length" :ref="`${rootData.main[0].$._id}Form`" main-box-flag="Y" :form-key="rootData.main[0].$._id" :xml-config-obj="rootData.main[0].form[0]"/>
      <m-table v-if="rootData.main[0].table&&rootData.main[0].table.length" :ref="`${rootData.main[0].table[0].$._id}Table`" :xml-config-obj="rootData.main[0].table[0]" :table-list="(handleMapping[`${rootData.main[0].table[0].$._id}`])[`${rootData.main[0].table[0].$._id}BaseDate`]"/>
    </section>
    <section v-if="rootData.dialog&&rootData.dialog.length" class="list">
      <m-dialog v-for="(item) in rootData.dialog" :ref="item.$._id" :key="item.$._id" :has-table="!!item.table" :dialog-visible-flag="`${item.$._id}DialogVisible`" :handle-id="item.$._id" :xml-config-obj="item">
        <m-form v-if="item.form" :ref="`${item.$._id}Form`" :isDisbled="item.$._isDisabledId" :form-key="item.$._id" :update-date="updateDateObj[item.$._id]" :xml-config-obj="item.form[0]" />
        <m-table v-if="item.table" :ref="`${item.table[0].$._id}Table`" :xml-config-obj="item.table[0]" :table-list="(handleMapping[`${item.table[0].$._id}`])[`${item.table[0].$._id}BaseDate`]" />
      </m-dialog>
    </section>
  </div>
</template>

<script>
import requestFn from '@/utils/requestFn'
import { isEmptyObj } from '@/utils/validate'
import MTable from "@/components/MTable"
import MForm from "@/components/MForm"
import MDialog from "@/components/MDialog"
import { deepClone } from '@/utils/index'
import { fetch } from '@/utils/requestFn'

export default {
  name: 'PageDemo',
  provide() {
    return {
      $app: this// 提供祖先组件的实例
    }
  },
  props: {
    xmlConfigObj: {
      type: Object,
      default: () => ({})
    }
  },
  components: { MDialog, MTable, MForm},
  data() {
    return {
      alertTip: '此操作将永久删除该数据, 是否继续?',
      xmlConfig: this.xmlConfigObj,
      handle: {},
      updateDateObj: {},
      handleMapping: {},
      forms: {},
      formRefs: {},
      tableId: '',
      rootData:{},
    }
  },
  created() {
    const root = this.xmlConfig.root || {}
    console.log('wwwwwwwwwww', this.xmlConfig.root, this.xmlConfig.root.main[0].table[0].$._id)
    if (this.xmlConfig === null || !isEmptyObj(this.xmlConfig.root)) return
    this.setPopups(root)
    this.idToHandle(root)
    this.rootData = Object.assign(this.rootData,root)
    this.idToFun()
    console.log("hhhhhhhhhh",this)
  },
  mounted() {
  },
  methods: {
    // id与handle映射
    idToHandle(root) {
      Object.keys(root).map(tagItem => {
        root[tagItem].map(() => {
          this.xmlToJson(root, tagItem)
        })
      })
    },
    // xml to json
    xmlToJson(root, tagItem) {
      root[tagItem].map(item => {
        if (isEmptyObj(item.$) && isEmptyObj(item.$._id)) {
          const tempObj = {}; const itemObj = deepClone(item.$)
          itemObj['handleType'] = tagItem
          itemObj[`${item.$._id}BaseDate`] = []
          tempObj[itemObj._id] = itemObj
          this.handleMapping = Object.assign({}, this.handleMapping, tempObj)
          if (item.table && isEmptyObj(item.$) && isEmptyObj(item.$._id)) {
            const tempObj = {}; const obj = deepClone(item.table[0].$)
            obj['handleType'] = 'table'
            obj[`${obj._id}BaseDate`] = []
            tempObj[obj._id] = obj
            this.handleMapping = Object.assign({}, this.handleMapping, tempObj)
          }
        }
      })
      return root;
    },
    // 弹窗处理--多个按钮操作一个弹窗  dialog
    setPopups(root) {
      if (root.dialog && root.dialog.length > 0) {
        let ids = []; const tempDia = []; let temp = []; let tempId = 0; let actions = []; let tempAction = '';
        let methods = []; let tempMethod = ''; let isDisabledId = ''; let item = null;
        for(let i=root.dialog.length-1;i >= 0; i--){
          item = root.dialog[i];
          tempId = item.$._id
          tempAction = item.$.action
          tempMethod = item.$.method
          item.$._isDisabledId && (isDisabledId = item.$._isDisabledId)
          if (!tempId || !tempId.includes('|')) return
          tempAction && (actions = tempAction.split('|'))
          tempMethod && (methods = tempMethod.split('|'))
          ids = tempId.split('|')
          for (let i = 0; i < ids.length; i++) {
            temp = []
            temp = deepClone(item)
            temp.$._isDisabledId && ids[i] !== isDisabledId && delete temp.$._isDisabledId
            temp.$._isDisabledId && (ids[i] === isDisabledId) && this.$set(temp.$,'_isDisabledId','true')
            temp.$._id = ids[i]
            if(actions.length === 1)  this.$set(temp.$,'action',actions[0])
            if(actions.length === ids.length) this.$set(temp.$,'action',actions[i])
            if(methods.length === 1)  this.$set(temp.$,'method',methods[0])
            if(methods.length === ids.length) this.$set(temp.$,'method',methods[i])
            tempDia.push(temp)
          }
          root.dialog.splice(i, 1)
        }
        root.dialog = root.dialog.concat(tempDia)
      }
    },
    // id to fun params查询参数
    idToFun() {
      Object.keys(this.handleMapping).map(itemKey => {
        if (isEmptyObj(this.handleMapping[itemKey]._id)) {
          // btnConfig 用于主页面查询  新增
          // tableId 用于表格内操作栏按钮
          this.handle[this.handleMapping[itemKey]._id] = (data = {}, tableId = '', btnConfig = {}) => {
            Object.keys(data).length ? this.$set(this.updateDateObj, itemKey, data) : this.$set(this.updateDateObj, itemKey, {})
            if (this.handleMapping[itemKey].handleType === 'alert') {
              console.log(' this.tableId', this, tableId, itemKey)
              this.$confirm(`${this.handleMapping[itemKey].tip ? this.handleMapping[itemKey].tip : this.alertTip}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                return
                fetch(this.handleMapping[itemKey].action, this.handleMapping[itemKey].method,
                  {
                    id: this.updateDateObj[itemKey].id,
                    Login_SessionId: 'SESSION_E153B681174B4940927E62F412C49D04'
                  }).then(res=>{
                  (this.$refs[`${tableId}Table`]).length ? (this.$refs[`${tableId}Table`])[0].handleCurrentChange() : (this.$refs[`${tableId}Table`]).handleCurrentChange()
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消操作'
                })
              })
            } else if (this.handleMapping[itemKey].handleType === 'table') {
              console.log('itemKey...', itemKey)
              console.log('tableId....', tableId)
              console.log('this.$refs...', this.$refs)
              console.log('this.handleMapping....',this.handleMapping,tableId)
              console.log('tableId....',tableId)
              console.log('this.formRefs`].....',this.formRefs)
              console.log('this.forms.....',this.forms)
              this.formRefs[`${tableId}`].validate((valid) => {
                if (valid) {
                  return
                  fetch(this.handleMapping[itemKey].action, this.handleMapping[itemKey].method,
                    {
                      ...this.froms[`${tableId}`],
                      Login_SessionId: 'SESSION_E153B681174B4940927E62F412C49D04'
                    }).then(res=>{
                     (this.$refs[`${itemKey}Table`]).length ? (this.$refs[`${itemKey}Table`])[0].handleCurrentChange() : (this.$refs[`${itemKey}Table`]).handleCurrentChange()
                  })
                } else {
                  console.log('error submit!!')
                  return false
                }
              })
            } else {
              console.log("hhhhhhhhhh",this)
              this.$refs[itemKey][0].dialogVisibleObj[`${itemKey}DialogVisible`] = true
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
     margin: 10px 20px 40px;
     .search{
       margin-top: 20px;
       border-bottom: 1px solid #DCDFE6;
     }
  }
</style>
