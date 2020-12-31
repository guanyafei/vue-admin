<template>
  <div class="container">
    <section class="search">
      <component :is="pageConfig['form']" :xmlConfigObj="xmlConfig.root.search[0]" ></component>
    </section>
    <section class="list">
      <component :is="pageConfig['table']" :xmlConfigObj="xmlConfig.root.table[0]" :tableList="baseData" ></component>
    </section>
    <section class="list" v-for="(item,idx) in xmlConfig.root.dialog" :key="idx">
      <component :ref="item.$.id" :is="pageConfig['dialog']" :dialogVisibleFlag='`${item.$.id}DialogVisible`' :xmlConfigObj="xmlConfig.root" >
        <component :is="pageConfig['form']" :updateDate="updateDate" :xmlConfigObj="item" ></component>
        <component v-if="item.table" :is="pageConfig['table']" :xmlConfigObj="item.table[0]" :tableList="baseData"></component>
      </component>
    </section>
  </div>
</template>

<script>
import xmlConfig from './demo.xml'
import pageConfig from 'pageConfig'
import request from '@/utils/request'
import { isEmptyObj } from '@/utils/validate'

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
      baseData: [{
        id:'1',
        date: '2016-05-02',
        name: '王1虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id:'21',
        date: '2017-05-04',
        name: '王2虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id:'3',
        date: '2018-05-01',
        name: '王3虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id:'4',
        date: '2019-05-03',
        name: '王4虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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
          root[tagItem].map(item=>{
            if(isEmptyObj(item.$) && isEmptyObj(item.$.id)){
              let tempObj = {};
              item.$.handleType = tagItem;
              tempObj[item.$.id] = item.$;
              this.handleMapping = Object.assign(this.handleMapping,tempObj);
            } 
          });
        });
      });
    },
    // id to fun
    idToFun (){
      Object.keys(this.handleMapping).map(itemKey=>{
        if(isEmptyObj(this.handleMapping[itemKey].id)){
          this.handle[this.handleMapping[itemKey].id] = (data)=>{
            this.updateDate = data;
            if(this.handleMapping[itemKey].handleType === 'alert'){
              this.$confirm(`${this.handleMapping[itemKey].tip?this.handleMapping[itemKey].tip:this.alertTip}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消操作' 
                });          
              });
            }else{
              this.$refs[itemKey][0].dialogVisibleObj[`${itemKey}DialogVisible`]=true;
            }
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
     margin: 10px 20px 0;
     .search{
       margin-top: 20px;
       border-bottom: 1px solid #DCDFE6;
     }
  }
</style>
