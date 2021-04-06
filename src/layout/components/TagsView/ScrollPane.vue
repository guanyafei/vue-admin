<template>
  <div class="scroll-wrap">
    <el-button
      icon="el-icon-arrow-left"
      type="text"
      :disabled="rightDisabled"
      @click="moveToDir('toRight')"
      v-show="show"
    ></el-button>
    <el-scrollbar
      ref="scrollContainer"
      :vertical="false"
      class="scroll-container"
      @wheel.native.prevent="handleScroll"
    >
      <slot />
    </el-scrollbar>
    <el-button
      icon="el-icon-arrow-right"
      type="text"
      :disabled="leftDisabled"
      @click="moveToDir('toLeft')"
      v-show="show"
    ></el-button>
  </div>
</template>

<script>
const tagAndTagSpacing = 4; // tagAndTagSpacing

export default {
  name: "ScrollPane",
  data() {
    return {
      left: 0,
      leftDisabled: true,
      rightDisabled: true,
      show: false,
      step: 200,
      scrollContainer: null,
    };
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollContainer = this.$refs.scrollContainer.$el;
    });
    this.scrollWrapper.addEventListener("scroll", this.emitScroll, true);
    window.addEventListener("resize", this.onReSize, true);
  },
  beforeDestroy() {
    this.scrollWrapper.removeEventListener("scroll", this.emitScroll);
    window.removeEventListener("resize", this.onReSize);
  },
  methods: {
    onReSize() {
      const $container = this.scrollContainer;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollWrapper;
      if ($containerWidth < $scrollWrapper.scrollWidth) {
        this.show = true;
      } else {
        this.show = false;
      }
      if (
        $scrollWrapper.scrollLeft ===
        $scrollWrapper.scrollWidth - $containerWidth
      ) {
        this.rightDisabled = false;
        this.leftDisabled = true;
      } else if ($scrollWrapper.scrollLeft === 0) {
        this.rightDisabled = true;
        this.leftDisabled = false;
      } else if (
        $scrollWrapper.scrollLeft > 0 &&
        $scrollWrapper.scrollLeft < $scrollWrapper.scrollWidth - $containerWidth
      ) {
        this.rightDisabled = false;
        this.leftDisabled = false;
      }
    },
    onAnimate(endPoint, dir) {
      let rafId = null;
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollWrapper;
      const render = () => {
        if (dir === "toLeft")
          $scrollWrapper.scrollLeft =
            $scrollWrapper.scrollLeft + this.step / 10;
        if (dir === "toRight")
          $scrollWrapper.scrollLeft =
            $scrollWrapper.scrollLeft - this.step / 10;
      };
      (function animloop() {
        render();
        rafId = requestAnimationFrame(animloop);
        console.log("uuuuuuuuuuu");
        if (
          $scrollWrapper.scrollLeft === endPoint ||
          ($scrollWrapper.scrollLeft >=
            $scrollWrapper.scrollWidth - $containerWidth &&
            dir === "toLeft") ||
          ($scrollWrapper.scrollLeft <= 0 && dir === "toRight")
        ) {
          cancelAnimationFrame(rafId);
        }
      })();
    },
    moveToDir(dir) {
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollWrapper;
      const endPoint =
        dir === "toLeft"
          ? $scrollWrapper.scrollLeft + this.step
          : $scrollWrapper.scrollLeft - this.step;
      dir === "toLeft"
        ? this.onAnimate(endPoint, "toLeft")
        : this.onAnimate(endPoint, "toRight");
      if (
        ($scrollWrapper.scrollLeft <=
          $scrollWrapper.scrollWidth - $containerWidth &&
          dir === "toLeft") ||
        ($scrollWrapper.scrollLeft >= 0 && dir === "toRight")
      ) {
        this.rightDisabled = dir === "toLeft" ? false : true;
        this.leftDisabled = dir === "toLeft" ? true : false;
      }
      if (
        $scrollWrapper.scrollLeft > 0 &&
        $scrollWrapper.scrollLeft < $scrollWrapper.scrollWidth - $containerWidth
      ) {
        this.rightDisabled = false;
        this.leftDisabled = false;
      }
    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    },
    emitScroll() {
      this.$emit("scroll");
    },
    moveToTarget(currentTag) {
      this.onReSize();
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollWrapper;
      const tagList = this.$parent.$refs.tag;

      let firstTag = null;
      let lastTag = null;

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft =
          $scrollWrapper.scrollWidth - $containerWidth;
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex((item) => item === currentTag);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing;

        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
      display: none;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  height: 26px;
  width: 20px;
  line-height: 26px;
  text-align: center;
}
.el-icon-arrow-left {
  float: left;
}
.el-icon-arrow-right {
  float: right;
}
.scroll-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
