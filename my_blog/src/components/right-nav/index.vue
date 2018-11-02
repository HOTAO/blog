<template>
  <div id="rightNav">
    <div class="nav-content" :style="{width:width}">
      <div class="nav-warp" :style="{width:width}">
        <div class="nav-header" v-if="hasArticleMenu">
          <span :class="{'active':!isConfig}" @click="isConfig = false">文章目录</span>
          |
          <span :class="{'active':isConfig}" @click="isConfig = true">站点信息</span>
        </div>
        <transition name="slide-fade" mode="out-in">
          <articleMenu class="article-menu" v-if="!isConfig" :menu="articleMenuInfo"></articleMenu>
          <div class="nav-info" v-else>
            <div class="siet-info">
              <img :src="baseInfo.avatar" alt="">
              <p class="name">{{baseInfo.blog_name}}</p>
              <p>{{baseInfo.sign}}</p>
            </div>
            <div class="siet-menu">
              <div class="menu-item" @click="$router.push({name:'Archives'})">
                <p class="num">{{staticleInfo.publish_count}}</p>
                <p>文章</p>
              </div>
              <div class="menu-item" @click="$router.push({name:'Classify'})">
                <p class="num">{{staticleInfo.category_count}}</p>
                <p>分类</p>
              </div>
              <div class="menu-item" @click="$router.push({name:'Classify'})">
                <p class="num">{{staticleInfo.tag_count}}</p>
                <p>标签</p>
              </div>
            </div>
            <a class="github" :href="baseInfo.github" target="_black">
              <i class="iconfont icon-github"></i>
              github
            </a>
          </div>
        </transition>
      </div>
    </div>
    <div class="nav-toggle" :class="{'toggole-open':rightNavStatus,'toggole-close':!rightNavStatus}" @click="_setRightNavStatus">
      <span class="toggle-line"></span>
      <span class="toggle-line"></span>
      <span class="toggle-line"></span>
    </div>
  </div>
</template>
<script>
import articleMenu from './article-menu'
export default {
  name: 'rightNav',
  computed: {
    ...mapGetters([
      'staticleInfo',
      'articleMenuInfo',
      'hasArticleMenu',
      'rightNavStatus'
    ]),
    ...mapGetters('webConfig', ['baseInfo'])
  },
  components: {
    articleMenu
  },
  data() {
    return {
      width: 0,
      isConfig: true
    }
  },
  watch: {
    rightNavStatus: function(value) {
      this._openNav(value)
    },
    hasArticleMenu: function(value) {
      if (value) {
        this.isConfig = false
        this._openNav(true)
        this.setRightNavStatus(true)
      } else {
        this.isConfig = true
        this.setRightNavStatus(false)
        this._openNav(false)
      }
    }
  },
  created() {
    this._getHomeStaticle()
  },
  methods: {
    ...mapActions('webConfig', ['getWebConfig']),
    ...mapActions(['getHomeStatistics', 'setRightNavStatus']),
    _getHomeStaticle() {
      return this.getHomeStatistics()
    },
    _setRightNavStatus() {
      this.setRightNavStatus(!this.rightNavStatus)
    },
    _openNav(value) {
      this.width = value ? '320px' : 0
    }
  }
}
</script>

<style lang="stylus" scoped>
#rightNav
  .nav-content
    width 0
    transition all 0.3s ease 0s
    .nav-warp
      position fixed
      right 0
      top 0
      bottom 0
      width 0
      color $color-light-grey
      background-color $color-main
      text-align center
      font-size 14px
      overflow hidden
      transition all 0.3s ease 0s
    .nav-header
      margin 20px 0
      font-size 16px
      font-weight bold
      .active
        color white
      span
        transition all 0.3s
        &:hover
          color white
    .article-menu
      padding 5px 15px
      transition all 0.3s
    .nav-info
      padding 0 20px
      max-height calc(100vh - 150px)
      overflow-y auto
      margin-top 20px
      transition all 0.3s
      img
        width 100px
        height @width
        border-radius 50%
      .siet-info
        p
          margin 20px 0
        .name
          font-size 18px
          font-weight bold
          color white
      .siet-menu
        display flex
        justify-content center
        .menu-item
          padding 0 10px
          font-weight bold
          cursor pointer
          &:hover
            color white
          &:not(:last-child)
            border-right 1px solid #555
          .num
            font-size 20px
            margin-bottom 5px
      .github
        display flex
        justify-content center
        align-items center
        width 78px
        height 32px
        margin 20px auto
        border 1px solid $color-orange
        border-radius 5px
        font-size 14px
        color $color-orange
        transition all 0.3s
        cursor pointer
        &:hover
          color white
          background-color $color-orange
        .iconfont
          font-size 14px
          margin-right 4px
  .nav-toggle
    position fixed
    right 10px
    bottom 45px
    width 24px
    height @width
    background-color $color-main
    z-index 1000
    cursor pointer
    line-height 0
    padding 1px 4px 0
  .toggole-close
    &:hover
      .toggle-line
        &:first-child
          width 50%
          transform rotate(-45deg)
          top 3px
        &:last-child
          width 50%
          transform rotate(45deg)
          top -3px
  .toggole-open
    padding 4px 4px
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
    background-color white
    margin-top 4px
    transition all 0.3s
  .slide-fade-enter, .slide-fade-leave-to
    opacity 0
</style>
