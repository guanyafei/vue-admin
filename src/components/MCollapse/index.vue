<template>
  <div>
    <div class="item">
      <div class="visible-item">
        <slot name="visible-form-slot" />
        <section v-show="boxshow" class="box">
          <slot />
        </section>
        <slot name="visible-inline-btn-slot" />
        <span class="arrow-warp" @click="boxshow = !boxshow">
          {{ !boxshow ? "展开" : "收起" }}
          <i
            v-if="formItemLen > 3"
            :class="['el-icon-arrow-up', { 'icon-arrow': boxshow }]"
          />
        </span>
        <slot name="visible-block-btn-slot" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MCollapse",
  props: {
    formItemLen: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      boxshow: false,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.box {
  display: inline;
  height: auto;
  width: 100%;
  background-color: #fff;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
.icon-arrow {
  transform: rotateZ(360deg) !important;
}
.el-icon-arrow-up {
  margin-top: 10px;
  transform: rotateZ(180deg);
}
.draw-enter-active,
.draw-leave-active {
  transition: all 1s ease;
}
.draw-enter,
.draw-leave-to {
  height: 0;
}
.arrow-warp {
  cursor: pointer;
  color: #1890ff;
  font-size: 14px;
  line-height: 36px;
}
</style>
