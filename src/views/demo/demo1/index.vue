<template>
   <m-comp :mainConfig="mainConfig" :dialogConfig="subConfig"/>
</template>

<script>
import MComp from '@/views/index'
// 引入xml配置文件
import xmlConfig from './demo.xml'
import xmlConfig1 from './demo1.xml'
import xmlConfig2 from './demo2.xml'

export default {
  name: 'demo1',
  components: { MComp },
  data() {
    return {
      mainConfig:xmlConfig,
      subConfig:[xmlConfig1,xmlConfig2]
    }
  }
}
</script>
