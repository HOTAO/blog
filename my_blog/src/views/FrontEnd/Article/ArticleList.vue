<template>
  <div id="articelList" v-loading="loading">
    <div class="container">
      <card v-for="article in web_articleListInfo.list" :key="article.article.id" :article="article.article" :tags="article.tags"></card>
    </div>
  </div>
</template>
<script>
import card from '@/components/card'
export default {
  name: 'articleList',
  computed: {
    ...mapGetters('article', ['web_articleListInfo'])
  },
  components: {
    card
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    this._initData()
  },
  watch: {
    '$route.query': function(newVal, oldVal) {
      console.log(newVal, oldVal)
      console.log(Object.is(JSON.stringify(newVal), JSON.stringify(oldVal)))
      if (!Object.is(JSON.stringify(newVal), JSON.stringify(oldVal))) {
        this._initData()
      }
    }
  },
  methods: {
    ...mapActions('article', ['getArticleByTag', 'getArticlesForWeb']),
    _initData() {
      const type = this.$route.query.type,
        id = this.$route.query.id,
        query = {}
      query.category_id = id
      if (type === 'tag') {
        console.log(id)
        this._getArticleByTag(id)
      } else {
        query.status = 2
        this._getArticlesForWeb(query)
      }
    },
    _getArticleByTag(id) {
      this.loading = true
      this.getArticleByTag(id).then(() => {
        this.loading = false
      })
    },
    _getArticlesForWeb(query) {
      this.loading = true
      this.getArticlesForWeb(query).then(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
#articelList
  padding 40px 0
</style>
