<template>
  <div class="index">
    <transition @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="cd-box" ref="cdWrapper" v-show="fullScreen">
        <img src="../assets/bj.png" alt class="bg">
      </div>
    </transition>
    <button @click="switchMode" style="position:absolute;top:0;left:10px;">start</button>
    <transition>
      <div class="mini-box" v-show="!fullScreen">
        <div class="mini-img">
          <img src="../assets/bj.png" alt>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import animations from 'create-keyframe-animation'
export default {
  components: {},
  props: {},
  data() {
    return {
      fullScreen: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // const {x, y, scale} = this._getPosAndScale()
    console.log(this._getPosAndScale())
    console.log(animations)
  },
  methods: {
    switchMode() {
      this.fullScreen = !this.fullScreen
    },
    _getPosAndScale() {
      const targetWidth = 40
      const paddingLeft = 20
      const paddingBottom = 20
      const paddingTop = 0
      const width = 300
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - paddingBottom - width / 2
      return { x, y, scale }
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale()

      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(0deg)`
        },
        60: {
          transform: `translate3d(0 ,0 , 0) scale(1.1) rotate(365deg)`
        },
        100: {
          transform: `translate3d(0 ,0 , 0) scale(1) rotate(360deg)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const { x, y, scale } = this._getPosAndScale()
      this.$refs.cdWrapper.style[
        'transform'
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      // this.$refs.cdWrapper.style['transform'] = 'rotate(360deg)'
      // transitionend 事件在 CSS 完成过渡后触发
      this.$refs.cdWrapper.addEventListener('transitionend', () => {
        done()
      })
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style['transform'] = ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.index
  background #eee
  width 100%
  height 100%
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  .cd-box
    display flex
    justify-content center
    align-items center
    width 300px
    height 300px
    background #eee
    border-radius 50%
    &.v-enter-active, &.v-leave-active
      transition all 0.4s
    &.v-enter, &.v-leave-to
      opacity 0
    .bg
      width 300px
      height 300px
      border-radius 50%
  .mini-box
    position absolute
    bottom 0
    right 0
    left 0
    display flex
    align-items center
    border 1px solid #555
    width 100%
    height 40px
    box-sizing border-box
    &.v-enter-active, &.v-leave-active
      transition all 0.4s
    &.v-enter, &.v-leave-to
      transform translate3d(0, 40px, 0)
      opacity 0
    .mini-img
      height 40px
      width 40px
      box-sizing border-box
      img
        height 100%
        width 100%
</style>