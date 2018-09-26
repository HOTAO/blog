<template>
  <div id="app">
    <div class="frontend-warp" v-if="!isBackEnd">
      <headerLayout></headerLayout>
      <router-view />
      <footerLayout></footerLayout>
    </div>
    <div class="backend-warp" v-else>
      <leftMenu></leftMenu>
      <router-view class="view-warp" />
    </div>
    <rightNav v-if="!isBackEnd"></rightNav>
    <toTop :show="showScrollToTop"></toTop>
    <!-- <login></login> -->
    <login v-if="!isLogin"></login>
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
    ...mapGetters(['isBackEnd']),
    ...mapGetters('auth', ['isLogin'])
  },
  data() {
    return {
      showScrollToTop: false
    }
  },
  mounted() {
    document.title = `被发现啦(*´∇｀*)`
    window.addEventListener('scroll', this.scrollListener)
    let visProp = this.getHiddenProp()
    this.evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange'
    document.addEventListener(this.evtname, this.visibilityChange, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener, false)
    document.removeEventListener(this.evtname, this.visibilityChange, false)
  },
  methods: {
    scrollListener() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 90) {
        this.showScrollToTop = true
      } else {
        this.showScrollToTop = false
      }
    },
    getHiddenProp() {
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
    getVisibilityState() {
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
    visibilityChange() {
      switch (document[this.getVisibilityState()]) {
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
  .backend-warp
    display flex
    width 100%
    .view-warp
      padding 10px
      flex 1
      min-width 311px
</style>
