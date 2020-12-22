<template>
  <div class="container">
    <section class="search">
      <component :is="pageConfig['form']" :handle="handle" :xmlConfigObj="xmlConfig.root" ></component>
    </section>
    <section class="list">
      <component :is="pageConfig['table']" :xmlConfigObj="xmlConfig.root" :tableList="baseData" ></component>
    </section>
    <section class="list">
      <component ref="add" :is="pageConfig['dialog']" :xmlConfigObj="xmlConfig.root" >
        <component :is="pageConfig['form']" :xmlConfigObj="xmlConfig.root.dialog[0]" ></component>
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
  data() {
    return {
      pageConfig: pageConfig,
      xmlConfig: xmlConfig,
      handle:{
        
        },
      baseData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    }
  },
  created() {
    console.log("xmlConfig",this.xmlConfig);
    this.handle={
      'add':this.add
    };
    console.log("this.hanndle",this.handle);
  },
  mounted() {
    // console.log("$refs",this.$refs.add.dialogVisible = true)
  },
  methods: {
    add(){
      this.$refs.add.dialogVisible = true
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
