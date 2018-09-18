<template>
  <div id="categories">
    <div class="container">
      <div class="title">分类</div>
      <div class="items">
        <div class="item categorie">
          vue开发
          <span>3篇</span>
        </div>
        <div class="item categorie">
          node
          <span>2篇</span>
        </div>
        <div class="item categorie">
          css
          <span>1篇</span>
        </div>
        <div class="item categorie">
          js
          <span>1篇</span>
        </div>
      </div>
      <div class="title">标签</div>
      <div class="items">
        <div class="item tips">vue</div>
        <div class="item tips">快应用</div>
        <div class="item tips">博客</div>
        <div class="item tips">hexo</div>
        <div class="item tips">css</div>
        <div class="item tips">js</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'categories'
}
</script>

<style lang="stylus" scoped>
#categories
  padding-top 20px
  text-align center
  min-height 'calc(100vh - %s - %s)' % ($headerHeight  $footerHeight)// Sprintf
  .title
    font-size 22px
    margin-bottom 20px
  .items
    display flex
    justify-content center
    margin-bottom 50px
    .item
      font-size 16px
      margin 5px
      padding 5px 15px
      cursor pointer
      transition all 0.3s
    .categorie
      border 1px solid $color-border
      color $color-main
      border-radius 5px
      &:hover
        background-color $color-main
        color white
      span
        font-size 12px
        color $color-light-grey
    .tips
      color $color-light-grey
      hover-underline-animation(0,0,2px,#262a30,0,0,0,0)
      &:hover
        hover-underline-animation(0,0,2px,#262a30,0,0,0,100%)
</style>
