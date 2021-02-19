<template>
   <m-comp :xmlConfigObj ="root" />
</template>

<script>
import xmlConfig from './demo.xml'
import MComp from '@/index'

export default {
  components: { MComp },
  data() {
    return {
      root:null
    }
  },
  created() {
    this.root = xmlConfig || {};
  },
  mounted() {
    console.log("router-----",this.$route.name)
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
</style>
