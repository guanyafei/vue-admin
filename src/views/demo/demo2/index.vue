<template>
  <m-comp :xml-obj="xmlObj" />
</template>

<script>
import MComp from "@/views/index";
// 引入xml配置文件
let modules = null;
try {
  const modulesFiles = require.context("./pageConfig", false, /\.xml$/);
  modules = modulesFiles.keys().map((modulePath) => {
    return modulesFiles(modulePath);
  }, {});
} catch (err) {
  console.log(err);
}

export default {
  name: "demo1",
  components: { MComp },
  data() {
    return {
      xmlObj: modules || [],
    };
  },
};
</script>
