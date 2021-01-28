<template>
  <div>
    <div class="item">
      <div class="visible-item">
        <slot name="visible-slot"></slot>
        <i :class="['el-icon-arrow-up', {'icon-arrow':boxshow}]" @click="boxshow = !boxshow"></i>
      </div>
      <transition name="draw">   
          <div class="box"  v-show="boxshow">
            <slot ></slot>
          </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MCollapse',
  data(){
    return {
      boxshow:false
    }
  },
  props: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.box{
    height:auto;
    width: 100%;
    background-color:#fff;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
}
.icon-arrow{
  transform: rotateZ(180deg);
}
.el-icon-arrow-up{
  margin-top: 10px;
  cursor: pointer;
  transition: transform 0.3s, -webkit-transform 0.3s;
  -webkit-transition: -webkit-transform 0.3s;
}
.draw-enter-active, .draw-leave-active {
    transition: all 1s ease;
}
.draw-enter, .draw-leave-to {
    height: 0;
}
</style>
