<template>
  <div id="toTop" @click="scrollToTarget(0)" :class="{'to-top-animation':show}">
    <span class="to-top-line"></span>
    <span class="to-top-line"></span>
    <span class="to-top-line"></span>
  </div>
</template>
<script>
import scroll from '@/plugins/scroll'
export default {
  name: 'toTop',
  mixins: [scroll],
  props: {
    show: {
      type: Boolean,
      value: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.to-top-animation
  bottom 15px !important
  opacity 1 !important
#toTop
  position fixed
  right 10px
  bottom 0
  opacity 0
  width 24px
  height @width
  background-color $color-main
  z-index 1000
  cursor pointer
  line-height 0
  padding 4px 1px
  transition all 0.3s
  .to-top-line
    position relative
    display inline-block
    width 2px
    height 100%
    background-color white
    margin-left 4px
    transition all 0.3s
    &:first-child
      height 50%
      transform rotate(45deg)
      left 3px
      top -8px
    &:last-child
      height 50%
      transform rotate(-45deg)
      left -3px
      top -8px
</style>
