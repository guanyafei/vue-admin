<template>
  <div class="container">
    <section v-if="rootData.main" class="main">
      <m-form v-if="rootData.main[0].form&&rootData.main[0].form.length" :ref="`${rootData.main[0].$._id}Form`" :mainTableId="mainTableId" mainBoxFlag="Y" :formKey="rootData.main[0].$._id" :xmlConfigObj="rootData.main[0].form[0]"/>
      <m-table v-if="rootData.main[0].table&&rootData.main[0].table.length" :ref="`${rootData.main[0].table[0].$._id}Table`" :xmlConfigObj="rootData.main[0].table[0]" :tableList="(handleMapping[`${rootData.main[0].table[0].$._id}`])[`${rootData.main[0].table[0].$._id}BaseDate`]"/>
    </section>
    <section v-if="rootData.dialog&&rootData.dialog.length" class="list">
      <m-dialog v-for="(item) in rootData.dialog" :ref="item.$._id" :key="item.$._id" :dialogVisibleFlag="`${item.$._id}DialogVisible`" :handleId="item.$._id" :xmlConfigObj="item">
        <m-form v-if="item.form" :ref="`${item.$._id}Form`" :isDisbled="item.$.disabledId" :formKey="item.$._id" :updateDate="updateDateObj[item.$._id]" :xmlConfigObj="item.form[0]" />
        <section v-if="item.table">
          <el-divider/>
          <m-form v-if="item.table && item.table[0].form" :ref="`${item.table[0].$._id}Form`" mainBoxFlag="N" :formKey="item.table[0].$._id" :updateDate="updateDateObj[item.table[0].$._id]" :xmlConfigObj="item.table[0].form[0]" />
          <m-table v-if="item.table" :ref="`${item.table[0].$._id}Table`" :xmlConfigObj="item.table[0]" :tableList="(handleMapping[`${item.table[0].$._id}`])[`${item.table[0].$._id}BaseDate`]" />
        </section>
      </m-dialog>
    </section>
    <el-backtop>
      <div class="back">UP</div>
    </el-backtop>
  </div>
</template>

<script>
import options from '@/common/options.js'
import { isEmptyObj } from '@/utils/validate'
import MTable from "@/components/MTable"
import MForm from "@/components/MForm"
import MDialog from "@/components/MDialog"
import { deepClone } from '@/utils/index'
import { fetch } from '@/utils/requestFn'

export default {
  name: 'mainPage',
  provide() {
    return {
      $app: this// 提供祖先组件的实例
    }
  },
  props: {
    mainConfig: {
      type: Object,
      default: () => ({})
    },
    dialogConfig: {
      type: Array,
      default: () => []
    }
  },
  components: { MDialog, MTable, MForm},
  data() {
    return {
      alertTip: '此操作不可逆, 是否继续?',
      xmlConfig: this.mainConfig,
      handle: {},
      updateDateObj: {},
      handleMapping: {},
      forms: {},
      formRefs: {},
      tableId: '',
      rootData:{},
      mainFlag:'N',
      optionItems:{}
    }
  },
  created() {
    this.xmlConfig= deepClone(this.mainConfig)
    if (this.xmlConfig === null || !isEmptyObj(this.xmlConfig.root)) return
    let root = null
    root = this.xmlConfig.root || {}
    this.mergeXmlData(root)
    this.setPopupsConfig(root,['dialog','alert'])
    this.idToHandle(root)
    this.rootData = Object.assign(this.rootData,root)
    this.idToFun()
    this.optionItems = options[this.$route.name] || {}
  },
  computed:{
     mainTableId:function (){
       let _id = this.rootData.main[0].table&&this.rootData.main[0].table.length&&this.rootData.main[0].table[0].$._id
       return _id;
     }
  },
  mounted() {},
  methods: {
    // 数据合并
    mergeXmlData(root){
      let itemObj=null
      if(this.dialogConfig.length>0){
          for(let i=0;i<this.dialogConfig.length;i++){
            itemObj = this.dialogConfig[i].root
            Object.keys(itemObj).forEach(key=>{
              if(!root.hasOwnProperty(key)){
                root[key] = []
              }
               root[key].splice(0,0,...itemObj[key])
            })
          }
      }
    },
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
          tempObj[itemObj._id] = itemObj
          this.handleMapping = Object.assign({}, this.handleMapping, tempObj)
          if (item.table && isEmptyObj(item.$) && isEmptyObj(item.$._id)) {
            const tempObj = {}; const obj = deepClone(item.table[0].$)
            obj['handleType'] = 'table'
            obj[`${obj._id}BaseDate`] = {}
            tempObj[obj._id] = obj
            this.handleMapping = Object.assign({}, this.handleMapping, tempObj)
          }
        }
      })
      return root;
    },
    // 弹窗处理--多个按钮操作一个弹窗  dialog
    setPopupsConfig(root,keys=[]) {
      for(let j=0;j<keys.length;j++){
        let key = keys[j]
        if (root[key] && root[key].length > 0) {
          const tempArr = [];let tempId = 0;let item = null;
          for(let i=root[key].length-1;i >= 0; i--){
            item = root[key][i];
            tempId = item.$._id
            if (!tempId || !tempId.includes('|')) continue
            tempArr.push(...this.doubleIdReset(item,tempId))
          }
          root[key].splice(0,0,...tempArr)
        }
        this.delDoubleId(root,key)
      }
    },
    // 双_id配置项数据重组设置
    doubleIdReset(item={},tempId=''){
      let ids = []; const tempArr = []; let configs = [];let tempItem = [];
      ids = tempId.split('|')
      for (let i = 0; i < ids.length; i++) {
        tempItem = []
        tempItem = deepClone(item)
        Object.keys(item.$).forEach(key=>{
          if(key !== '_id'){
            configs = item.$[key].split('|')
            if(key==='disabledId'){
              ids[i] !== tempItem.$['disabledId'] && delete tempItem.$['disabledId']
              ids[i] === tempItem.$['disabledId'] && this.$set(tempItem.$,'disabledId','true')
            }else{
              if(configs.length === 1)  this.$set(tempItem.$,key,configs[0])
              if(configs.length === ids.length) this.$set(tempItem.$,key,configs[i])
            }
            tempItem.$._id = ids[i]
          }
        })
        tempArr.push(tempItem)
      }
      return tempArr
    },
    // 双_id配置项剔除
    delDoubleId(root,key){
      let item = null,tempId=''
      for(let i=root[key].length-1;i >= 0; i--){
        item = root[key][i]
        tempId = item.$._id
        if(tempId && tempId.includes('|')) root[key].splice(i, 1)
      }
    },
    // id to fun params查询参数
    idToFun() {
      Object.keys(this.handleMapping).map(itemKey => {
        if (isEmptyObj(this.handleMapping[itemKey]._id)) {
          // btnConfig 用于主页面查询  新增
          // tableId 用于表格内操作栏按钮
          // this.handle[this.handleMapping[itemKey]._id] = (data = {}, tableId = '', btnConfig = {}) => {
          this.handle[this.handleMapping[itemKey]._id] = (data = {}, tableId = '', mainFlag = 'N',isQueryBtn="false") => {
            Object.keys(data).length ? this.$set(this.updateDateObj, itemKey, data) : this.$set(this.updateDateObj, itemKey, {})
            if (this.handleMapping[itemKey].handleType === 'alert') {
              console.log(' this.tableId', this, tableId, itemKey)
              this.$confirm(`${this.handleMapping[itemKey].tip ? this.handleMapping[itemKey].tip : this.alertTip}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // return
                fetch(this.handleMapping[itemKey].action, this.handleMapping[itemKey].method,
                  {
                    id: this.updateDateObj[itemKey].id,
                    Login_SessionId: 'SESSION_DEF516B8598640B8804BFE30993BD0E6'
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
              console.log('mainFlag.....',mainFlag)
              console.log('this.handleMapping[mainFlag===tableId : itemKey].....',this.handleMapping[mainFlag==='N'?tableId : itemKey])
              this.formRefs[`${tableId}`].validate((valid) => {
                if (valid) {
                  let mapKey = mainFlag==='N'?tableId : itemKey
                  return
                  fetch(this.handleMapping[mapKey].action, this.handleMapping[mapKey].method,
                    {
                      ...this.forms[`${tableId}`],
                      Login_SessionId: 'SESSION_6ECC723CF4D6440CA5705C004A6665AC'
                    }).then(res=>{
                      if(isQueryBtn === "true"){
                        this.handleMapping[itemKey][`${itemKey}BaseDate`] = res
                      }else{
                        (this.$refs[`${itemKey}Table`]).length ? (this.$refs[`${itemKey}Table`])[0].handleCurrentChange() : (this.$refs[`${itemKey}Table`]).handleCurrentChange()
                      }
                  })
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
  .back{
    height: 100%; 
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
    }
</style>
