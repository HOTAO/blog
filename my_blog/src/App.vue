<template>
  <div id="app">
    <div class="frontend-warp" v-if="!isBackEnd">
      <headerLayout></headerLayout>
      <router-view class="view-warp" :style="{width: viewWidth}" />
      <footerLayout></footerLayout>
    </div>
    <div class="backend-warp" v-else>
      <leftMenu></leftMenu>
      <router-view class="view-warp" />
    </div>
    <rightNav v-if="!isBackEnd && isPc"></rightNav>
    <toTop :show="showScrollToTop"></toTop>
    <!-- <login></login> -->
    <login v-if="!isLogin&&isBackEnd"></login>
  </div>
</template>
<script>
import headerLayout from '@/components/layout/header'
import footerLayout from '@/components/layout/footer'
import rightNav from '@/components/right-nav'
import toTop from '@/components/to-top'
import leftMenu from '@/components/left-menu/menu'
import login from '@/components/auth/login'
export default {
  name: 'app',
  components: {
    headerLayout,
    footerLayout,
    rightNav,
    toTop,
    leftMenu,
    login
  },
  computed: {
    ...mapGetters(['isBackEnd', 'screenInfo']),
    ...mapGetters('auth', ['isLogin'])
  },
  watch: {
    screenInfo(value) {
      this._setViewWidth()
      this.isPc = true
      if (value.width <= 768) {
        this.isPc = false
      }
    }
  },
  data() {
    return {
      showScrollToTop: false,
      viewWidth: '1000px',
      isPc: true
    }
  },
  mounted() {
    document.title = `被发现啦(*´∇｀*)`
    this._updateScreenInfo()
    window.addEventListener('resize', this._updateScreenInfo)
    window.addEventListener('scroll', this._scrollListener)
    let visProp = this._getHiddenProp()
    this.evtname = visProp.replace(/[H|h]idden/, '') + '_visibilitychange'
    document.addEventListener(this.evtname, this._visibilityChange, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._updateScreenInfo, false)
    window.removeEventListener('scroll', this._scrollListener, false)
    document.removeEventListener(this.evtname, this._visibilityChange, false)
  },
  methods: {
    ...mapActions(['setScreenInfo']),
    _setViewWidth() {
      let temp = 20
      // if (this.screenInfo.width > 990) {
      //   temp = 340
      // }
      this.viewWidth = this.screenInfo.width - temp + 'px'
    },
    _updateScreenInfo() {
      console.log(window.outerWidth)
      this.setScreenInfo({
        width: document.body.clientWidth,
        height: document.body.clientHeight
      })
    },
    _scrollListener() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 90) {
        this.showScrollToTop = true
      } else {
        this.showScrollToTop = false
      }
    },
    _getHiddenProp() {
      var prefixes = ['webkit', 'moz', 'ms', 'o']
      // if 'hidden' is natively supported just return it
      if ('hidden' in document) {
        return 'hidden'
      }
      // otherwise loop over all the known prefixes until we find one
      for (var i = 0; i < prefixes.length; i++) {
        if (prefixes[i] + 'Hidden' in document) {
          return prefixes[i] + 'Hidden'
        }
      }
      // otherwise it's not supported
      return null
    },
    _getVisibilityState() {
      var prefixes = ['webkit', 'moz', 'ms', 'o']
      if ('visibilityState' in document) return 'visibilityState'
      for (var i = 0; i < prefixes.length; i++) {
        if (prefixes[i] + 'VisibilityState' in document) {
          return prefixes[i] + 'VisibilityState'
        }
      }
      // otherwise it's not supported
      return null
    },
    _visibilityChange() {
      switch (document[this._getVisibilityState()]) {
        case 'visible':
          document.title = `被发现啦(*´∇｀*)`
          break
        case 'hidden':
        default:
          document.title = `藏好啦(つд⊂)`
          break
      }
    }
  }
}
</script>

<style lang="stylus" src="@/style/main.styl"></style>

<style lang="stylus" scoped>
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  display flex
  width 100%
  .frontend-warp
    flex 1
    .view-warp
      margin auto
  .backend-warp
    display flex
    width 100%
    .view-warp
      padding 10px
      flex 1
      min-width 311px
</style>
