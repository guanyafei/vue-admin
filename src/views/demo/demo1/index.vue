<template>
  <m-comp :xml-obj="xmlObj" />
</template>

<script>
import MComp from "@/views/index";

// 引入xml配置文件
const modulesFiles = require.context("./pageConfig", true, /\.xml$/);
const modules = modulesFiles.keys().map((modulePath) => {
  return modulesFiles(modulePath);
}, {});

export default {
  name: "Demo1",
  components: { MComp },
  data() {
    return {
      xmlObj: modules,
    };
  },
};
</script>
