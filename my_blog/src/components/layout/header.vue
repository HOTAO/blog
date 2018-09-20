<template>
  <div id="headerLayout">
    <div class="header-warp container">
      <div class="myName">
        HoTao
      </div>
      <div class="tabs">
        <div class="tab" v-for="tab in tabs" :key="tab.text" @click="_pageGo(tab)">
          <i :class="`iconfont icon-${tab.icon}`"></i>
          <span>{{tab.text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'headerLayout',
  data() {
    return {
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
        },
        {
          text: '友链',
          icon: 'friends-link',
          route: 'Friends'
        },
        {
          text: '更多',
          icon: 'more'
        },
        {
          text: '搜索',
          icon: 'search'
        }
      ]
    }
  },
  methods: {
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
    hover-underline-animation(70%, 70%, 2px, #262a30, -8px, -8px)
    position relative
    font-size 20px
    font-weight bold
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
</style>
