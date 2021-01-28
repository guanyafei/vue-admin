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
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
</style>
