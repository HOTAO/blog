<template>
  <div id="card">
    <div class="container">
      <el-card class="article" v-for="article in list" :key="article">
        <div class="article-cover">
          <img class="" src="@/assets/test.png" alt="">
          <span class="article-title">全栈开发 --> 默认的文章title{{article}}</span>
        </div>
        <div class="article-info">
          <i class="iconfont icon-calendar"></i>
          <span>发表于 2018年08月27日</span>
          <i class="iconfont icon-folder"></i>
          <span>vue开发</span>
          <i class="iconfont icon-eye"></i>
          <span>1234次围观</span>
        </div>
        <div class="article-dec">
          这是一篇关于如何搭建一个属于自己的博客的文章，为什么要这做呢，因为，这样就可以把平时所学的东西往上面放，可以share出去。
        </div>
        <div class="acticle-tags">
          <div class="tag">
            <i class="iconfont icon-tag"></i>
            <span>博客</span>
          </div>
        </div>
        <span class="acticle-read">阅读全文 >></span>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'card',
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#card
  margin-top 40px
  .article
    margin-bottom 20px
  .article-cover
    display flex
    justify-content center
    align-items center
    .article-title
      position absolute
      color white
      font-size 24px
      font-weight bold
    img
      width 100%
  .article-info
    display flex
    align-items center
    justify-content center
    font-size 14px
    margin 20px 0
    color $color-mid-grey
    span
      margin-right 10px
  .article-dec
    font-size 16px
    color $color-mid-grey
    border-left 2px solid $color-mid-grey
    padding-left 5px
  .acticle-tags
    display flex
    flex-wrap wrap
    padding 20px 0 10px
    margin-bottom 10px
    border-bottom 1px solid $color-line
    .tag
      font-size 12px
      padding 5px 10px
      margin-right 5px
      border-radius 25px 5px
      color white
      background-color $color-main
      transition all 0.3s
      cursor pointer
      &:hover
        background-color rgba($color-main, 0.8)
    .iconfont
      font-size 12px
      margin-right 4px
  .acticle-read
    hover-underline-animation(0,100%)
    font-size 14px
    margin-top 20px
    cursor pointer
</style>
