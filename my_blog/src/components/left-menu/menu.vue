<template>
  <div id="leftMenu" :style="{width: collapseMenu ? '64px' : '240px'}">
    <div class="wrap">
      <el-menu router class="menu" background-color="#262a30" text-color="#a7b1c2" active-text-color="#ffffff" :default-active="$route.path" :collapse="collapseMenu">
        <el-menu-item index="/BackEnd/Home">
          <i class="iconfont icon-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-article"></i>
            <span slot="title">文章</span>
          </template>
          <el-menu-item index="/BackEnd/Article/Creat">
            <i class="iconfont icon-article-edit"></i>写文章</el-menu-item>
          <el-menu-item index="/BackEnd/Article/Manage">
            <i class="iconfont icon-article-manage"></i>文章管理</el-menu-item>
          <el-menu-item index="/BackEnd/Article/Drafts">
            <i class="iconfont icon-drafts"></i>草稿箱</el-menu-item>
          <el-menu-item index="/BackEnd/Article/Deleted">
            <i class="iconfont icon-deleted"></i>回收站</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="iconfont icon-article"></i>
            <span slot="title">分类/标签</span>
          </template>
          <el-menu-item index="/BackEnd/Classify/Categories">
            <i class="iconfont icon-tag"></i>
            <span slot="title">分类</span>
          </el-menu-item>
          <el-menu-item index="/BackEnd/Classify/Tags">
            <i class="iconfont icon-tag"></i>
            <span slot="title">标签</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/admin/comments">
          <i class="iconfont icon-comments"></i>
          <span slot="title">评论</span>
        </el-menu-item>
        <el-submenu index="5">
          <template slot="title">
            <i class="iconfont icon-config"></i>
            <span slot="title">网站配置</span>
          </template>
          <el-menu-item index="/BackEnd/WebConfig/Base">
            <i class="iconfont icon-base-config"></i>基本配置</el-menu-item>
          <el-menu-item index="/BackEnd/WebConfig/Me">
            <i class="iconfont icon-about"></i>关于我</el-menu-item>
          <el-menu-item index="/BackEnd/WebConfig/Resume">
            <i class="iconfont icon-resume"></i>我的简历</el-menu-item>
          <el-menu-item index="/BackEnd/WebConfig/Friends">
            <i class="iconfont icon-friends-link"></i>友链管理</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="iconfont icon-other"></i>
            <span slot="title">其他</span>
          </template>
          <el-menu-item :route="$route.path" index="0" @click="signOut">
            <i class="iconfont icon-signout" @click="_loginOut"></i>退出</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="collapse-wrap" :class="{'collapse-open':collapseMenu,'collapse-close':!collapseMenu}" @click="toggleCollapse">
        <span class="collapse-line"></span>
        <span class="collapse-line"></span>
        <span class="collapse-line"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftMenu',
  components: {},
  data() {
    return {
      collapseMenu: false
    }
  },
  created() {},
  watch: {
    // screen(value) {
    //   this.collapseMenu = false
    //   if (value.width <= 580) {
    //     this.collapseMenu = true
    //   }
    // }
  },
  computed: {
    // ...mapGetters(['screen'])
  },
  methods: {
    ...mapActions('auth', ['loginOut']),
    signOut() {
      this.$confirm('是否退出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          // this.adminSignOut()
          this._loginOut()
        })
        .catch(() => {})
    },
    _loginOut() {
      this.loginOut()
    },
    toggleCollapse() {
      this.collapseMenu = !this.collapseMenu
    },
    toPage(pageName) {
      this.$router.push({ name: pageName })
    }
  }
}
</script>

<style lang="stylus" scoped>
#leftMenu
  position relative
  height 100%
  width 64px
  z-index 1100
  transition width 0.5s
  .wrap
    position fixed
    height 100%
    .menu
      position relative
      height 100%
      font-weight bold
      padding-bottom 30px
      &:not(.el-menu--collapse)
        width 240px
    .collapse-wrap
      position absolute
      width 24px
      height 24px
      background-color $color-main
      right 20px
      bottom 15px
      padding 5px
      z-index 1050
      cursor pointer
      line-height 0
      .collapse-line
        position relative
        display inline-block
        vertical-align top
        width 100%
        height 2px
        margin-top 4px
        background-color $color-white
        transition all 0.3s
        &:first-child
          margin-top 0px
</style>

<style lang="stylus">
#leftMenu
  position relative
  height 100%
  width 64px
  z-index 1100
  transition width 0.5s
  .wrap
    position fixed
    height 100%
    .menu
      position relative
      height 100%
      font-weight bold
      padding-bottom 30px
      &:not(.el-menu--collapse)
        width 240px
    .collapse-wrap
      position absolute
      width 24px
      height 24px
      background-color $color-main
      right 20px
      bottom 15px
      padding 5px
      z-index 1050
      cursor pointer
      line-height 0
      .collapse-line
        position relative
        display inline-block
        vertical-align top
        width 100%
        height 2px
        margin-top 4px
        background-color $color-white
        transition all 0.3s
        &:first-child
          margin-top 0px
</style>
