<template>
  <div id="home">
    <ContentCard :list="web_articleListInfo.list" />
    <el-pagination :total="web_articleListInfo.count" background :current-page="params.page" :page-size="params.pageSize" @current-change="_pageChange" layout="prev, pager, next"></el-pagination>
  </div>
</template>

<script>
import ContentCard from './card.vue'

export default {
  name: 'home',
  components: {
    ContentCard
  },
  data() {
    return {
      params: {
        status: 2,
        page: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    ...mapGetters('article', ['web_articleListInfo'])
  },
  async created() {
    await this._getArticlesForWeb()
  },
  methods: {
    ...mapActions('article', ['getArticlesForWeb']),
    _pageChange(page) {
      this.$router.push({ query: { page } })
      this._getArticlesForWeb()
    },
    _getArticlesForWeb() {
      this.params.page = Number(this.$route.query.page) || 1
      return this.getArticlesForWeb(this.params)
    }
  }
}
</script>
<style lang="stylus" scoped>
#home
  padding-bottom 40px
  >>>.el-pagination
    margin-top 20px
    text-align center
</style>
