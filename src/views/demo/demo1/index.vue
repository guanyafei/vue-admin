<template>
   <m-comp :xmlConfigObj="root" :otherConfig="otherConfig"/>
</template>

<script>
import xmlConfig from './demo.xml'
import xmlConfig1 from './demo1.xml'
import xmlConfig2 from './demo2.xml'
import MComp from '@/index'

export default {
  components: { MComp },
  data() {
    return {
      root:null,
      otherConfig:[xmlConfig1,xmlConfig2]
    }
  },
  created() {
    this.root = xmlConfig || {}
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
