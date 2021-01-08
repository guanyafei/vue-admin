<template>
  <div class="container">
    <component formKey="query" :is="pageConfig['form']" :xmlConfigObj="xmlConfig.root.formBox[0]" v-if="xmlConfig.root.formBox&&xmlConfig.root.formBox.length"></component>
    <component tableKey="query" ref="queryTable" :is="pageConfig['table']" :xmlConfigObj="xmlConfig.root.table[0]" :tableList="(handleMapping['query'])['queryBaseDate']" v-if="xmlConfig.root.table&&xmlConfig.root.table.length"></component>
    <section class="list" v-if="xmlConfig.root.dialog&&xmlConfig.root.dialog.length">
      <component :ref="item.$._id" :is="pageConfig['dialog']" v-for="(item) in xmlConfig.root.dialog" :key="item.$._id" :dialogVisibleFlag='`${item.$._id}DialogVisible`' :handleId="item.$._id" :xmlConfigObj="item" >
        <component :ref="`${item.$._id}Form`" :formKey="item.$._id" :is="pageConfig['form']" :updateDate="updateDate" :xmlConfigObj="item.formBox[0]" ></component>
        <component :ref="`${item.$._id}Table`" :tableKey="item.$._id" :is="pageConfig['table']" v-if="item.table" :xmlConfigObj="item.table[0]" :tableList="(handleMapping[`${item.table[0].$._id}`])[`${item.table[0].$._id}BaseDate`]"></component>
      </component>
    </section>
  </div>
</template>

<script>
import xmlConfig from './demo.xml'
import pageConfig from 'pageConfig'
import request from '@/utils/request'
import { isEmptyObj } from '@/utils/validate'
import { objectMerge,deepClone } from '@/utils/index'

export default {
  name: 'PageDemo',
  provide() {
    return { 
      $app: this//提供祖先组件的实例
    };
  },
  data() {
    return {
      alertTip:'此操作将永久删除该数据, 是否继续?',
      pageConfig: pageConfig,
      xmlConfig: xmlConfig,
      handle:{},
      updateDate:{},
      handleMapping:{},
      queryBaseData: [],
      forms:{}
    }
  },
  created() {
    let root = this.xmlConfig.root || {};
    console.log("wwwwwwwwwww",this.xmlConfig.root)
    if(this.xmlConfig === null || !isEmptyObj(this.xmlConfig.root)) return;
    this.idToHandle(root);
    this.idToFun();
  },
  mounted() {
  },
  methods: {
    // id与handle映射
    idToHandle (root){
      Object.keys(root).map(tagItem=>{
        root[tagItem].map(tagObj=>{
          this.xmlToJson(root,tagItem);
        });
      });
    },
    // xml to json
    xmlToJson (root,tagItem){
      root[tagItem].map(item=>{
        if(isEmptyObj(item.$) && isEmptyObj(item.$._id)){
          let tempObj = {},itemObj = deepClone(item.$);
          itemObj['handleType'] = tagItem;
          itemObj['forms'] = {};
          itemObj[`${item.$._id}BaseDate`] = [];
          tempObj[itemObj._id] = itemObj;
          this.handleMapping = Object.assign({},this.handleMapping,tempObj);
          if(item.formBox && isEmptyObj(item.$) && isEmptyObj(item.$._id)){
            this.handleMapping[itemObj._id].forms = deepClone(item.formBox[0]);
          }
          if(item.table && isEmptyObj(item.$) && isEmptyObj(item.$._id)){
            this.handleMapping[itemObj._id].baseDate = deepClone(item.table[0]);
            console.log("qqqqqqq",item.table)
            let tempObj = {},obj = deepClone(item.table[0].$);
            obj['handleType'] = 'table';
            obj['forms'] = {};
            obj[`${obj._id}BaseDate`] = [];
            tempObj[obj._id] = obj;
            this.handleMapping = Object.assign({},this.handleMapping,tempObj);
          }
        } 
      });
    },
    // id to fun params查询参数
    idToFun (){
      Object.keys(this.handleMapping).map(itemKey=>{
        if(isEmptyObj(this.handleMapping[itemKey]._id)){
          this.handle[this.handleMapping[itemKey]._id] = (data={},params={})=>{
            console.log("this.handleMapping[itemKey]._id",this.$refs)
            this.updateDate = data;
            if(this.handleMapping[itemKey].handleType === 'alert'){
              this.$confirm(`${this.handleMapping[itemKey].tip?this.handleMapping[itemKey].tip:this.alertTip}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                request({
                  method: this.handleMapping[itemKey].method || 'GET',
                  url: this.handleMapping[itemKey].action,
                  params:{
                    id:this.updateDate.id,
                    Login_SessionId: 'SESSION_E153B681174B4940927E62F412C49D04',
                  }
                }).then(res=>{
                  if(res.retcode===0){
                     this.$message({
                      type: 'success',
                      message: '操作成功!'
                    })
                    (this.$refs[`${itemKey}Table`])[0].handleCurrentChange();
                  }else{
                    this.$message({
                      type: 'info',
                      message: res.retmesg
                    })
                  }
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消操作' 
                });          
              });
            }else if(this.handleMapping[itemKey].handleType === 'table'){
              request({
                method: this.handleMapping[itemKey].method,
                url: this.handleMapping[itemKey].action,
                params:{
                  date: encodeURIComponent('Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)'),
                  conditions: params.accountNo ? `{客户账号} = ${params.accountNo}` : '',
                  currentDCId: 'FB68C5CEEC1640C3B1D09BEBCD99FD5E',
                  Login_SessionId: 'SESSION_CB8EE988F4024590954129D5B612429F',
                  readOnly: 'YES',
                  page: 1,
                  rows: 20
                }
              }).then(res=>{
                  this.queryBaseData = res;
              });
            }else{
              this.$refs[itemKey][0].dialogVisibleObj[`${itemKey}DialogVisible`]=true;
            }
          }
        }
      });
    },
    // request 
    // fetch (params={}) {
    //  request({
    //     method: this.tableConfig.$.method,
    //     url: this.tableConfig.$.action,
    //     params:{
    //       date: encodeURIComponent('Mon Jan 04 2021 19:27:29 GMT 0800 (中国标准时间)'),
    //       conditions: '',
    //       currentDCId: 'FB68C5CEEC1640C3B1D09BEBCD99FD5E',
    //       Login_SessionId: 'SESSION_E53DB5BA6B7F4B1DA95DA6C018AA1B96',
    //       readOnly: 'YES',
    //       page: 1,
    //       rows: 20
    //     }
    //   }).then(res=>{
    //       this.baseData = res;
    //   });
    // }
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
