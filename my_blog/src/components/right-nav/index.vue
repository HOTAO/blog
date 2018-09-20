<template>
  <div id="rightNav">
    <div class="nav-content" :style="{width:width}">
      <div class="nav-warp" :style="{width:width}">
        <div class="nav-header">
          <span>文章目录</span>
          |
          <span>站点信息</span>
        </div>
        <div class="nav-info">
          <div class="article-menu"></div>
          <div class="siet-info">
            <img src="~@/assets/test.png" alt="">
            <p class="name">{{baseInfo.blog_name}}</p>
            <p>{{baseInfo.salt}}</p>
          </div>
          <div class="siet-menu">
            <div class="menu-item">
              <p class="num">8</p>
              <p>文章</p>
            </div>
            <div class="menu-item">
              <p class="num">4</p>
              <p>分类</p>
            </div>
            <div class="menu-item">
              <p class="num">11</p>
              <p>标签</p>
            </div>
          </div>
          <a class="github" :href="baseInfo.github" target="_black">
            <i class="iconfont icon-github"></i>
            github
          </a>
        </div>
      </div>
    </div>
    <div class="nav-toggle" :class="{'toggole-open':show,'toggole-close':!show}" @click="openNav">
      <span class="toggle-line"></span>
      <span class="toggle-line"></span>
      <span class="toggle-line"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rightNav',
  computed: {
    ...mapGetters('webConfig', ['baseInfo'])
  },
  data() {
    return {
      width: 0,
      show: false
    }
  },
  created() {
    this._getWebConfig()
  },
  methods: {
    ...mapActions('webConfig', ['getWebConfig']),
    _getWebConfig() {
      return this.getWebConfig().then(res => {
        console.log(res)
      })
    },
    openNav() {
      this.show = !this.show
      this.width = this.show ? '320px' : 0
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
      span
        &:active
          color white
        &:hover
          color white
    .nav-info
      padding 0 20px
      max-height calc(100vh - 150px)
      overflow-y auto
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
    padding 0 4px
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
</style>
