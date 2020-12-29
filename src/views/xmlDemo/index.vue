<template>
  <div class="container">
    <section class="search">
      <component :is="pageConfig['form']" :xmlConfigObj="xmlConfig.root" ></component>
    </section>
    <section class="list">
      <component :is="pageConfig['table']" :xmlConfigObj="xmlConfig.root" :tableList="baseData" ></component>
    </section>
    <section class="list" v-for="(item,idx) in xmlConfig.root.dialog" :key="idx">
      <component :ref="item.$.id" :is="pageConfig['dialog']" :dialogVisibleFlag='`${item.$.id}DialogVisible`' :xmlConfigObj="xmlConfig.root" >
        <component :is="pageConfig['form']" :updateDate="updateDate" :xmlConfigObj="item" ></component>
      </component>
    </section>
  </div>
</template>

<script>
import xmlConfig from './demo.xml'
import pageConfig from 'pageConfig'
import request from '@/utils/request'

export default {
  name: 'PageDemo',
  provide() {
    return {
      $app: this//提供祖先组件的实例
    };
  },
  data() {
    return {
      pageConfig: pageConfig,
      xmlConfig: xmlConfig,
      handle:{},
      updateDate:{},
      baseData: [{
        date: '2016-05-02',
        name: '王1虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2017-05-04',
        name: '王2虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2018-05-01',
        name: '王3虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2019-05-03',
        name: '王4虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created() {
    
    let ids = ['add','delete','update'];
    ids.map(item=>{
      this.handle[item] = (data)=>{
        console.log("wwwwwwwwww",data)
        this.updateDate = data;
        this.$refs[item][0].dialogVisibleObj[`${item}DialogVisible`]=true;
      }
    })
  },
  mounted() {
  },
  methods: {
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
