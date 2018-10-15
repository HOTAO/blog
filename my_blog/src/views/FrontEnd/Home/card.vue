<template>
  <div id="card">
    <div class="container">
      <el-card class="article" v-for="item in list" :key="item.article.id">
        <div class="article-cover">
          <img class="" :src="item.article.cover" alt="">
          <div class="article-title">
            <span @click="$router.push({name:'Article',params:{id:item.article.id}})">{{item.article.title}}</span>
          </div>
        </div>
        <div class="article-info">
          <i class="iconfont icon-calendar"></i>
          <span>发表于 {{item.article.createTime | timeFormat('LL')}}</span>
          <i class="iconfont icon-folder"></i>
          <span class="article-category" @click="$router.push({name: 'ArticleList',query:{type:'category',id: item.article.category_id}})">{{item.article.categoryName}}</span>
          <i class="iconfont icon-eye"></i>
          <span>{{item.article.pageview}}次围观</span>
        </div>
        <div class="article-dec">
          {{item.article.dec}}
        </div>
        <div class="acticle-tags">
          <div class="tag" v-for="tag in item.tags" :key="tag.tag_id" @click="$router.push({name: 'ArticleList',query:{type:'tag',id: tag.tag_id}})">
            <i class="iconfont icon-tag"></i>
            <span>{{tag.tag_name}}</span>
          </div>
        </div>
        <span class="acticle-read" @click="$router.push({name:'Article',params:{id:item.article.id}})">阅读全文 >></span>
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
    position relative
    display flex
    justify-content center
    align-items center
    .article-title
      position absolute
      color white
      font-size 24px
      font-weight bold
      padding 10px
      span
        hover-underline-animation(0, 0, 2px, white, 0, 0, 0, 0)
        &:hover
          hover-underline-animation(0, 0, 2px, white, 0, 0, 0, 100%)
    img
      width 100%
      filter brightness(0.7)
  .article-info
    display flex
    align-items center
    justify-content center
    font-size 14px
    margin 20px 0
    color $color-mid-grey
    @media (max-width: 768px)
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
  .acticle-read
    hover-underline-animation(0, 100%)
    font-size 14px
    margin-top 20px
    cursor pointer
  >>>.el-card__body
    @media (max-width: 768px)
      padding 20px 10px
</style>
