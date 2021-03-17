<template>
   <m-comp :mainConfig="root" :dialogConfig="subConfig"/>
</template>

<script>
import MComp from '@/index'
// 引入xml配置文件
import xmlConfig from './demo.xml'
import xmlConfig1 from './demo1.xml'
import xmlConfig2 from './demo2.xml'

export default {
  components: { MComp },
  data() {
    return {
      root:xmlConfig,
      subConfig:[xmlConfig1,xmlConfig2]
    }
  },
  created() {
    // this.root = xmlConfig || {}
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
