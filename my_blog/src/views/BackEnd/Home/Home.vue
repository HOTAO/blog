<template>
  <div id="BackEndHome">
    <div class="title">首页</div>
    <IconCard :list="list"></IconCard>
    <div class="contents">
      <div class="content left">
        <div class="title">最新文章</div>
        <div class="items">
          <div class="item" v-for="article in server_articleListInfo.list" :key="article.id">
            <div class="item-title" @click="$router.push({name: 'EditArticle', params: {articleId: article.id}})">{{article.title}}</div>
            <div class="item-time">
              <i class="iconfont icon-calendar"></i>
              {{article.createTime | timeFormat('YYYY-MM-DD')}}
            </div>
          </div>
        </div>
        <p class="more" @click="$router.push({name: 'ManageArticle'})">更多</p>
      </div>
      <div class="content right">
        <div class="title">系统日志</div>
        <div class="items">
          <div class="item" v-for="log in syslogInfo.list" :key="log.id">
            <div class="item-log">
              <div class="item-address">
                ip地址：{{log.ip}}
              </div>
              {{log.time | timeFormat('YYYY-MM-DD')}} => {{log.content}}
            </div>
          </div>
        </div>
        <p class="more-log">
          <span @click="_getSysLog('last')">上一页</span>
          <span @click="_getSysLog('next')">下一页</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import IconCard from './Icon-card'
export default {
  name: 'BackEndHome',
  data() {
    return {
      list: [
        {
          backgroundColor: '#29b6f6',
          icon: 'icon-article',
          topMessage: '共发表了',
          middleMessage: '0',
          bottomMessage: '篇文章',
          to: 'ManageArticle'
        },
        {
          backgroundColor: '#7e57c2',
          icon: 'icon-drafts',
          topMessage: '草稿箱共有',
          middleMessage: '0',
          bottomMessage: '篇文章',
          to: 'DraftsArticle'
        },
        {
          backgroundColor: '#33b86c',
          icon: 'icon-deleted',
          topMessage: '垃圾箱共有',
          middleMessage: '0',
          bottomMessage: '篇文章',
          to: 'DeletedArticle'
        },
        {
          backgroundColor: '#6e8cd7',
          icon: 'icon-tag',
          topMessage: '共有',
          middleMessage: '0',
          bottomMessage: '个分类',
          to: 'BackEndCategories'
        },
        {
          backgroundColor: '#E6A23C',
          icon: 'icon-comments',
          topMessage: '共有',
          middleMessage: '0',
          bottomMessage: '个标签',
          to: 'BackEndTags'
        }
      ],
      articles: [1, 2, 3, 4],
      logParams: {
        page: 1,
        pageSize: 8
      }
    }
  },
  components: {
    IconCard
  },
  computed: {
    ...mapGetters(['staticleInfo', 'syslogInfo']),
    ...mapGetters('article', ['server_articleListInfo'])
  },
  async created() {
    this._getArticlesForServer()
    this._getSysLog()
    await this._getHomeStaticle()
    this.list[0].middleMessage = this.staticleInfo.publish_count
    this.list[1].middleMessage = this.staticleInfo.drafts_count
    this.list[2].middleMessage = this.staticleInfo.deleted_count
    this.list[3].middleMessage = this.staticleInfo.category_count
    this.list[4].middleMessage = this.staticleInfo.tag_count
  },
  methods: {
    ...mapActions(['getHomeStatistics', 'getSysLog']),
    ...mapActions('article', ['getArticlesForServer']),
    _getSysLog(value = '') {
      if (value) {
        if (value === 'last' && this.logParams.page > 1) {
          this.logParams.page--
        }
        if (
          value === 'next' &&
          this.logParams.page * this.logParams.pageSize < this.syslogInfo.count
        ) {
          this.logParams.page++
        }
      }
      return this.getSysLog(this.logParams)
    },
    _getArticlesForServer() {
      const params = {
        status: 2,
        page: 1,
        pageSize: 10
      }
      return this.getArticlesForServer(params)
    },
    _getHomeStaticle() {
      return this.getHomeStatistics()
    }
  }
}
</script>
<style lang="stylus" scoped>
#BackEndHome
  .title
    font-size 16px
    color $color-main
    font-weight bold
    margin 10px 0 20px
  .contents
    display flex
    font-size 14px
    @media (max-width: 759px)
      display block
      font-size 12px
      padding 10px
    .content
      flex 1
      border 1px solid $color-border
      margin 40px 0
      padding 20px
      .item
        display flex
        justify-content space-between
        border 1px solid $color-border
        padding 10px 8px
        cursor pointer
      .item-time
        color $color-light-grey
      .item-log
        line-height 18px
      .more
        padding 10px
        margin-top 10px
        text-align center
        font-size 14px
        @media (max-width: 759px)
          font-size 12px
        color #555555
        background-color #f9f9f9
        cursor pointer
        transition all 0.3s
        &:hover
          background-color $color-main
          color $color-white
      .more-log
        margin-top 10px
        text-align center
        font-size 14px
        display flex
        flex-direction row
        @media (max-width: 759px)
          font-size 12px
        > span
          color #555555
          background-color #f9f9f9
          cursor pointer
          padding 10px
          flex 1
          transition all 0.3s
          &:first-child
            margin-right 10px
          &:hover
            background-color $color-main
            color $color-white
    .left
      margin-right 20px
      @media (max-width: 759px)
        margin-right 0
</style>
