<template>
  <div id="articles">
    <div class="container preview">
      <div class="title">
        <p>{{articleData.articleInfo.title}}</p>
      </div>
      <div class="article-info">
        <i class="iconfont icon-calendar"></i>
        <span>发表于 {{articleData.articleInfo.create_time | timeFormat('LL')}}</span>
        <i class="iconfont icon-folder"></i>
        <span>{{articleData.articleInfo.categoryName}}</span>
        <i class="iconfont icon-eye"></i>
        <span>{{articleData.articleInfo.pageview}}次围观</span>
      </div>
      <div class="article-dec">{{ articleData.articleInfo.dec }}</div>
      <mdPreview v-if="articleData.articleInfo" :content="articleData.articleInfo.html_content"></mdPreview>
      <p v-else>这篇文章因为某些原因，已下架了</p>
      <comments :articleId="$route.params.id"></comments>
    </div>
  </div>
</template>
<script>
import mdPreview from '@/components/md-preview'
import comments from '@/components/comments'
export default {
  name: 'articles',
  computed: {
    ...mapGetters('article', ['articleData']),
    ...mapActions('comments', ['insertComment'])
  },
  components: {
    mdPreview,
    comments
  },
  data() {
    return {}
  },
  created() {
    this._getArticleInfoById(this.$route.params.id)
  },
  methods: {
    ...mapActions('article', ['getArticleInfoById']),
    _getArticleInfoById(id) {
      return this.getArticleInfoById(id)
    }
  }
}
</script>
<style lang="stylus" scoped>
#articles
  padding 40px 10px
  .title
    display flex
    justify-content center
    font-size 26px
    font-weight bold
    p
      text-align left
  .preview
    padding 30px 20px
    box-shadow 0 0 5px 0 rgba($color-main, 0.1)
    @media (max-width: 768px)
      padding 30px 15px
  .article-info
    display flex
    align-items center
    justify-content center
    font-size 14px
    margin 20px 0
    color $color-mid-grey
    text-align center
    @media (max-width: 768px)
      font-size 12px
    span
      margin-right 10px
  .article-dec
    font-size 14px
    color $color-light-grey
    margin-bottom 20px
</style>
