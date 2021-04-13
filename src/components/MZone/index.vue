<template>
  <el-select
    v-model="value"
    style="250px"
    @change="changeZone()"
    placeholder="请选择大区"
  >
    <el-option-group
      v-for="group in options"
      :key="group.label"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
import { fetch } from "@/utils/requestFn";
export default {
  name: "MZone",
  data() {
    return {
      value: "",
      options: [
        {
          label: "A",
          options: [
            {
              value: "CK0047",
              label: "青岛分公司潍坊库",
            },
            {
              value: "CK0213",
              label: "河南分公司新乡库",
            },
          ],
        },
        {
          label: "B",
          options: [
            {
              value: "DC0196",
              label: "湖南分公司娄底配送中心",
            },
            {
              value: "CK0256",
              label: "安徽分公司淮北库",
            },
            {
              value: "CK0096",
              label: "武汉分公司宜昌库",
            },
            {
              value: "DC0136",
              label: "重庆分公司邻水配送中心（虚拟）",
            },
          ],
        },
      ],
    };
  },
  created() {
    // this.getOptions();
  },
  mounted() {},
  methods: {
    // 切换大区
    changeZone() {
      this.$store
        .dispatch("user/changeZone", this.$store.getters.roles)
        .then(() => {
          this.$router.push({
            path: "/",
          });
          this.$store.dispatch("app/toggleSideBar").then(() => {
            setTimeout(() => {
              this.$store.dispatch("app/toggleSideBar");
            });
          });
        });
    },
    // 获取select值
    getOptions() {
      fetch(this.itemConfig.action, this.itemConfig.method, {
        Login_SessionId: "SESSION_87792E4A0E3E44FEBFDC7A989AB160BB",
      }).then((res) => {
        this.options = res.retdata || [];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select {
  vertical-align: text-bottom;
}
</style>
