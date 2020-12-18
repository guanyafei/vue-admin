<template>
  <div class="container">
    <section class="search">
      <component :is="pageConfig['form']" :xmlConfigObj="xmlConfig" />
    </section>
    <section class="list">
      <component :is="pageConfig['table']" :xmlConfigObj="xmlConfig" :table-list="baseData" />
    </section>
  </div>
</template>

<script>
import xmlConfig from './demo.xml'
import pageConfig from 'pageConfig'
export default {
  name: 'PageDemo',
  data() {
    return {
      pageConfig: pageConfig,
      xmlConfig: xmlConfig,
      baseData: []
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
  .container{
     margin: 10px 20px 0;
     .search{
       margin-top: 20px;
       border-bottom: 1px solid #DCDFE6;
     }
  }
</style>
