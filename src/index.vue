<template>
  <div class="container">
    <section v-if="xmlConfig.root.main" class="main">
      <component :is="pageConfig['form']" v-if="xmlConfig.root.main[0].formBox&&xmlConfig.root.main[0].formBox.length" :ref="`${xmlConfig.root.main[0].$._id}Form`" main-box-flag="Y" :form-key="xmlConfig.root.main[0].$._id" :xml-config-obj="xmlConfig.root.main[0].formBox[0]" />
      <component :is="pageConfig['table']" v-if="xmlConfig.root.main[0].table&&xmlConfig.root.main[0].table.length" :ref="`${xmlConfig.root.main[0].table[0].$._id}Table`" :xml-config-obj="xmlConfig.root.main[0].table[0]" :table-list="(handleMapping[`${xmlConfig.root.main[0].table[0].$._id}`])[`${xmlConfig.root.main[0].table[0].$._id}BaseDate`]" />
    </section>
    <section v-if="xmlConfig.root.dialog&&xmlConfig.root.dialog.length" class="list">
      <component :is="pageConfig['dialog']" v-for="(item) in xmlConfig.root.dialog" :ref="item.$._id" :key="item.$._id" :has-table="!!item.table" :dialog-visible-flag="`${item.$._id}DialogVisible`" :handle-id="item.$._id" :xml-config-obj="item">
        <component :is="pageConfig['form']" v-if="item.formBox" :ref="`${item.$._id}Form`" :form-key="item.$._id" :update-date="updateDateObj[item.$._id]" :xml-config-obj="item.formBox[0]" />
        <component :is="pageConfig['table']" v-if="item.table" :ref="`${item.table[0].$._id}Table`" :xml-config-obj="item.table[0]" :table-list="(handleMapping[`${item.table[0].$._id}`])[`${item.table[0].$._id}BaseDate`]" />
      </component>
    </section>
  </div>
</template>

<script>
import pageConfig from 'pageConfig'
import requestFn from '@/utils/requestFn'
import { isEmptyObj } from '@/utils/validate'
import { deepClone } from '@/utils/index'
import { get as getReq, post as postReq } from '@/utils/requestFn'

export default {
  name: 'PageDemo',
  provide() {
    return {
      $app: this// 提供祖先组件的实例
    }
  },
  props: {
    xmlConfigObj: null
  },
  data() {
    return {
      alertTip: '此操作将永久删除该数据, 是否继续?',
      pageConfig: pageConfig,
      xmlConfig: this.xmlConfigObj,
      handle: {},
      updateDateObj: {},
      handleMapping: {},
      forms: {},
      formRefs: {},
      tableId: ''
    }
  },
  created() {
    const root = this.xmlConfig.root || {}
    console.log('wwwwwwwwwww', this.xmlConfig.root, this.xmlConfig.root.main[0].table[0].$._id)
    this.setPopups(root)
    if (this.xmlConfig === null || !isEmptyObj(this.xmlConfig.root)) return
    this.idToHandle(root)
    this.idToFun()
    console.log('this.handleMapping', this.handleMapping)
  },
  mounted() {
  },
  methods: {
    // getTableId(item){
    //   return (item.table && item.table[0].$._id) || '';
    // },
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
          // itemObj['forms'] = {}
          itemObj[`${item.$._id}BaseDate`] = []
          tempObj[itemObj._id] = itemObj
          this.handleMapping = Object.assign({}, this.handleMapping, tempObj)
          // if (item.formBox && isEmptyObj(item.$) && isEmptyObj(item.$._id)) {
          //   this.handleMapping[itemObj._id].forms = deepClone(item.formBox[0])
          // }
          if (item.table && isEmptyObj(item.$) && isEmptyObj(item.$._id)) {
            const tempObj = {}; const obj = deepClone(item.table[0].$)
            obj['handleType'] = 'table'
            // obj['forms'] = {}
            obj[`${obj._id}BaseDate`] = []
            tempObj[obj._id] = obj
            this.handleMapping = Object.assign({}, this.handleMapping, tempObj)
          }
        }
      })
    },
    // 弹窗处理--多个按钮操作一个弹窗  dialog
    setPopups(root) {
      if (root.dialog && root.dialog.length > 0) {
        let ids = []; const tempDia = []; let temp = []; let tempId = 0
        root.dialog.map((item, idx) => {
          tempId = item.$._id
          if (!tempId || !tempId.includes('|')) return
          ids = tempId.split('|')
          for (let i = 0; i < ids.length; i++) {
            temp = []
            temp = deepClone(item)
            temp.$._id = ids[i]
            tempDia.push(temp)
          }
          root.dialog.splice(idx, 1)
          root.dialog = root.dialog.concat(tempDia)
        })
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
              return
              this.$confirm(`${this.handleMapping[itemKey].tip ? this.handleMapping[itemKey].tip : this.alertTip}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                if (this.handleMapping[itemKey].method === 'post') {
                  postReq().then(res => {
                    if (res.retcode === 0) {
                      this.$message({
                        type: 'success',
                        message: '操作成功!'
                      })
                      if (tableId !== '') {
                        (this.$refs[`${tableId}Table`]).length ? (this.$refs[`${tableId}Table`])[0].handleCurrentChange() : (this.$refs[`${tableId}Table`]).handleCurrentChange()
                      }
                    } else {
                      this.$message({
                        type: 'info',
                        message: res.retmesg
                      })
                    }
                  })
                } else {
                  getReq(this.handleMapping[itemKey].action, {
                    id: this.updateDateObj[itemKey].id,
                    Login_SessionId: 'SESSION_E153B681174B4940927E62F412C49D04'
                  }).then(res => {
                    if (res.retcode === 0) {
                      this.$message({
                        type: 'success',
                        message: '操作成功!'
                      })
                      if (tableId !== '') {
                        (this.$refs[`${tableId}Table`]).length ? (this.$refs[`${tableId}Table`])[0].handleCurrentChange() : (this.$refs[`${tableId}Table`]).handleCurrentChange()
                      }
                    } else {
                      this.$message({
                        type: 'info',
                        message: res.retmesg
                      })
                    }
                  })
                }
                // request({
                //   method: this.handleMapping[itemKey].method || 'GET',
                //   url: this.handleMapping[itemKey].action,
                //   params: {
                //     id: this.updateDateObj[itemKey].id,
                //     Login_SessionId: 'SESSION_E153B681174B4940927E62F412C49D04'
                //   }
                // }).then(res => {
                //   if (res.retcode === 0) {
                //     this.$message({
                //       type: 'success',
                //       message: '操作成功!'
                //     })
                //     if (tableId !== '') {
                //       (this.$refs[`${tableId}Table`]).length ? (this.$refs[`${tableId}Table`])[0].handleCurrentChange() : (this.$refs[`${tableId}Table`]).handleCurrentChange()
                //     }
                //   } else {
                //     this.$message({
                //       type: 'info',
                //       message: res.retmesg
                //     })
                //   }
                // })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消操作'
                })
              })
            } else if (this.handleMapping[itemKey].handleType === 'table') {
              console.log('btnConfig.tableId', btnConfig.tableId, itemKey)
              console.log('this', this)
              this.formRefs[`${tableId}`].validate((valid) => {
                if (valid) {
                  return
                  if (this.handleMapping[itemKey].method === 'post') {
                    postReq().then(res => {
                      (this.$refs[`${btnConfig.tableId}Table`]).length ? (this.$refs[`${btnConfig.tableId}Table`])[0].handleCurrentChange() : (this.$refs[`${btnConfig.tableId}Table`]).handleCurrentChange()
                    })
                  } else {
                    getReq(this.handleMapping[itemKey].action, {
                      date: encodeURIComponent('Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)'),
                      currentDCId: 'FB68C5CEEC1640C3B1D09BEBCD99FD5E',
                      Login_SessionId: 'SESSION_CB8EE988F4024590954129D5B612429F',
                      readOnly: 'YES',
                      page: 1,
                      rows: 20,
                      ...this.forms[`${tableId}`]
                    }).then(res => {
                      (this.$refs[`${btnConfig.tableId}Table`]).length ? (this.$refs[`${btnConfig.tableId}Table`])[0].handleCurrentChange() : (this.$refs[`${btnConfig.tableId}Table`]).handleCurrentChange()
                    })
                  }
                  // request({
                  //   method: this.handleMapping[itemKey].method,
                  //   url: this.handleMapping[itemKey].action,
                  //   params: {
                  //     date: encodeURIComponent('Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)'),
                  //     currentDCId: 'FB68C5CEEC1640C3B1D09BEBCD99FD5E',
                  //     Login_SessionId: 'SESSION_CB8EE988F4024590954129D5B612429F',
                  //     readOnly: 'YES',
                  //     page: 1,
                  //     rows: 20,
                  //     ...this.forms[`${formKey}`]
                  //   }
                  // }).then(() => {
                  //   (this.$refs[`${btnConfig.tableId}Table`]).length ? (this.$refs[`${btnConfig.tableId}Table`])[0].handleCurrentChange() : (this.$refs[`${btnConfig.tableId}Table`]).handleCurrentChange()
                  // })
                } else {
                  console.log('error submit!!')
                  return false
                }
              })
            } else {
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
