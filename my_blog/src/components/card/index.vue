<template>
  <div id="articleCard">
    <div class="card-item">
      <div class="article-title">{{article.title}}</div>
      <div class="article-info">
        <i class="iconfont icon-calendar"></i>
        <span>发表于 {{article.createTime | timeFormat('LL')}}</span>
        <i class="iconfont icon-folder"></i>
        <span class="article-category" @click="$router.push({name: 'ArticleList',query:{type:'category',id: article.category_id}})">{{article.categoryName}}</span>
        <i class="iconfont icon-eye"></i>
        <span>{{article.pageview}}次围观</span>
      </div>
      <div class="article-dec">
        {{article.dec}}
      </div>
      <div class="acticle-tags">
        <div class="tag" v-for="tag in tags" :key="tag.tag_id" @click="$router.push({name: 'ArticleList',query:{type:'tag',id: tag.tag_id}})">
          <i class="iconfont icon-tag"></i>
          <span>{{tag.tag_name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'articleCard',
  props: ['article', 'tags']
}
</script>

<style lang="stylus" scoped>
#articleCard
  &:not(:last-child)
    margin-bottom 20px
  .card-item
    box-shadow 0 0 5px 0 rgba($color-main, 0.1)
    padding 20px
  .article-title
    font-size 22px
    color $color-main
    cursor pointer
    @media (max-width 768px)
      font-size 18px
  .article-info
    // display flex
    // align-items center
    // justify-content center
    font-size 14px
    margin 20px 0
    color $color-mid-grey
    @media (max-width 768px)
      font-size 12px
    .article-category
      cursor pointer
      border-bottom 1px solid $color-main
    span
      margin-right 10px
  .article-dec
    font-size 16px
    color $color-mid-grey
    border-left 2px solid $color-mid-grey
    padding-left 5px
    @media (max-width 768px)
      font-size 14px
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
  >>>.iconfont
    font-size 12px
    margin-right 4px
</style>
