<template>
  <div class="home">
    <ContentCard :list="web_articleListInfo.list" />
  </div>
</template>

<script>
import ContentCard from './card.vue'

export default {
  name: 'home',
  components: {
    ContentCard
  },
  computed: {
    ...mapGetters('article', ['web_articleListInfo'])
  },
  async created() {
    await this._getArticlesForWeb()
  },
  methods: {
    ...mapActions('article', ['getArticlesForWeb']),
    _getArticlesForWeb() {
      const params = {
        status: 2,
        page: 1,
        pageSize: 10
      }
      return this.getArticlesForWeb(params)
    }
  }
}
</script>
