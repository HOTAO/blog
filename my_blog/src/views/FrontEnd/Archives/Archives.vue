<template>
  <div id="archives" v-loading="loading">
    <div class="container archives-wrap">
      <div class="time-line"></div>
      <div class="list-content">
        <p class="normal-node">目前共计 {{ total }} 篇文章~</p>
        <div class="bold-node" v-for="(year, key, index) in archivesList" :key="index">
          <p>{{ key }}</p>
          <div class="bold-node month" v-for="(month, key, index) in year" :key="index">
            <p>{{ key }}</p>
            <card v-for="(article, index) in month" :key="index" :article="article.article" :tags="article.tags" />
          </div>
        </div>
      </div>
    </div>
    <el-pagination :total="web_articleListInfo.count" background :current-page="params.page" :page-size="params.pageSize" @current-change="_pageChange" layout="prev, pager, next"></el-pagination>
  </div>
</template>

<script>
import card from '@/components/card'
import timeFilter from '@/filters/time'
export default {
  name: 'archives',
  components: {
    card
  },
  computed: {
    ...mapGetters('article', ['web_articleListInfo'])
  },
  data() {
    return {
      archivesList: [],
      total: 10,
      params: {
        status: 2,
        page: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  created() {
    this._getArticlesForWeb()
  },
  methods: {
    ...mapActions('article', ['getArticleByTag', 'getArticlesForWeb']),
    _pageChange(page) {
      this.$router.push({ query: { page } })
      this._getArticlesForWeb()
    },
    _getArticlesForWeb() {
      this.loading = true
      this.params.page = Number(this.$route.query.page) || 1
      this.getArticlesForWeb(this.params)
        .then(res => {
          const tempData = {}
          const len = res.list.length
          for (let index = 0; index < len; index++) {
            const item = res.list[index]
            const year = timeFilter(item.article.createTime, 'YYYY年')
            const month = timeFilter(item.article.createTime, 'MM月')
            if (!tempData[year]) {
              tempData[year] = {}
            }
            if (!tempData[year][month]) {
              tempData[year][month] = []
            }
            tempData[year][month].push(item)
            console.log(tempData)
          }
          this.loading = false
          this.archivesList = tempData
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="stylus" scoped>
#archives
  position relative
  padding 30px 10px
  .pagination
    width 100%
    padding 10px 0
    display flex
    display -webkit-flex
    flex-direction row
    justify-content center
    background-color $color-white
  .archives-wrap
    position relative
    width 100%
    padding 10px 30px
    animation show 0.8s
    @media (max-width: 768px)
      padding 5px
    .time-line
      position absolute
      left 30px
      @media (max-width: 768px)
        left 5px
      top 15px
      bottom 0
      width 2px
      background-color #eeeeee
    .list-content
      .normal-node
        position relative
        color #555555
        padding 0 15px
        font-size 16px
        margin-bottom 20px
        @media (max-width: 768px)
          font-size 14px
        &:before
          position absolute
          left -4px
          top 5px
          content ''
          width 10px
          height 10px
          border-radius 10px
          background-color #999999
          @media (max-width: 768px)
            left -3px
            top 4px
            width 8px
            height 8px
            border-radius 8px
      .bold-node
        position relative
        color #555555
        padding 0 15px
        font-size 28px
        // margin-bottom 20px
        @media (max-width: 768px)
          font-size 22px
        &:before
          position absolute
          left -4px
          top 10px
          content ''
          width 10px
          height 10px
          border-radius 10px
          background-color #999999
          @media (max-width: 768px)
            left -3px
            top 8px
            width 8px
            height 8px
            border-radius 8px
        > p
          margin-bottom 20px
        .month
          color #666666
          font-size 26px
          @media (max-width: 768px)
            font-size 20px
          &:before
            left -19px
            @media (max-width: 768px)
              left -18px
  >>>.el-pagination
    margin-top 20px
    text-align center
@keyframes show
  from
    margin-top -10px
    opacity 0
  to
    margin-top 0px
    opacity 1
</style>
