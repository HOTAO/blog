<template>
  <div id="headerLayout">
    <div class="header-warp container" :style="{height: isPc ? '90px' : '60px'}">
      <div class="myName" @click="$router.push({name: 'Home'})" :class="{'hover-underline-animation':isPc}">
        HoTao
      </div>
      <div class="tabs" v-if="isPc">
        <div class="tab" v-for="tab in tabs" :key="tab.text" @click="_pageGo(tab)">
          <i :class="`iconfont icon-${tab.icon}`"></i>
          <span>{{tab.text}}</span>
        </div>
      </div>
      <div class="nav-toggle" v-else :class="{'toggole-open':show}" @click="openNav">
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
      </div>
    </div>
    <el-collapse-transition>
      <div class="mobile-tab-wrap" v-show="!isPc&&show">
        <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="_pageGo(tab)">
          <i class="iconfont" :class="`iconfont icon-${tab.icon}`"></i>
          <span>{{ tab.text }}</span>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  name: 'headerLayout',
  data() {
    return {
      show: false,
      isPc: true,
      tabs: [
        {
          text: '首页',
          icon: 'home',
          route: 'Home'
        },
        {
          text: '分类/标签',
          icon: 'tag',
          route: 'Classify'
        },
        {
          text: '归档',
          icon: 'archives',
          route: 'Archives'
        },
        {
          text: '关于',
          icon: 'about',
          route: 'AboutMe'
        }
        // ,
        // {
        //   text: '友链',
        //   icon: 'friends-link',
        //   route: 'Friends'
        // },
        // {
        //   text: '更多',
        //   icon: 'more'
        // },
        // {
        //   text: '搜索',
        //   icon: 'search'
        // }
      ]
    }
  },
  watch: {
    screenInfo(value) {
      this.isPc = true
      if (value.width <= 768) {
        this.isPc = false
      }
    }
  },
  computed: {
    ...mapGetters(['screenInfo'])
  },
  methods: {
    openNav() {
      this.show = !this.show
    },
    _pageGo(tab) {
      tab.route ? this.$router.push({ name: tab.route }) : ''
    }
  }
}
</script>
<style lang="stylus" scoped>
#headerLayout
  background-color $color-bg-grey
  .header-warp
    display flex
    justify-content space-between
    align-items center
    height $headerHeight
    width 100%
  .myName
    position relative
    font-size 20px
    font-weight bold
  .hover-underline-animation
    hover-underline-animation(70%, 70%, 2px, #262a30, -8px, -8px)
  .tabs
    display flex
    justify-content space-between
    align-items center
    font-size 14px
    .tab
      padding 5px 8px
      margin-right 5px
      border-radius 5px
      color $color-main
      background-color $color-bg-grey
      cursor pointer
      transition all 0.5s
      &:hover
        color white
        background-color $color-main
  .nav-toggle
    width 24px
    height @width
    z-index 1000
    cursor pointer
    line-height 0
    padding 0 4px
  .toggole-open
    padding 4px
    .toggle-line
      &:first-child
        width 100%
        transform rotate(-45deg)
        top 3px
      &:nth-child(2)
        display none
      &:last-child
        width 100%
        transform rotate(45deg)
        top -3px
  .toggle-line
    position relative
    display inline-block
    width 100%
    height 2px
    background-color $color-main
    margin-top 4px
    transition all 0.3s
  .mobile-tab-wrap
    width 100%
    transition all 0.3s
    // overflow: hidden
    border-top 1px solid #eeeeee
    .tab
      position relative
      width 100%
      padding 8px 15px
      font-size 12px
      line-height 1
      cursor pointer
      .iconfont
        font-size 12px
        margin-right 5px
</style>
