<template>
  <div id="BackEndHome">
    <div class="title">首页</div>
    <IconCard :list="list"></IconCard>
    <div class="contents">
      <div class="content left">
        <div class="title">最新文章</div>
        <div class="items">
          <div class="item" v-for="article in articles" :key="article">
            <div class="item-title">文章title</div>
            <div class="item-time">
              <i class="iconfont icon-calendar"></i>
              2018-08-31
            </div>
          </div>
        </div>
      </div>
      <div class="content right">
        <div class="title">系统日志</div>
        <div class="items">
          <div class="item" v-for="article in articles" :key="article">
            <div class="item-log">
              <div class="item-address">
                ip地址：127.0.0.1
              </div>
              2018-08-31 => 管理员 HoTao新增了文章 《这篇文章屌得一匹》
            </div>
          </div>
        </div>
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
          to: 'articleManage'
        },
        {
          backgroundColor: '#7e57c2',
          icon: 'icon-drafts',
          topMessage: '草稿箱共有',
          middleMessage: '0',
          bottomMessage: '篇文章',
          to: 'articleDrafts'
        },
        {
          backgroundColor: '#33b86c',
          icon: 'icon-deleted',
          topMessage: '垃圾箱共有',
          middleMessage: '0',
          bottomMessage: '篇文章',
          to: 'articleDeleted'
        },
        {
          backgroundColor: '#6e8cd7',
          icon: 'icon-tag',
          topMessage: '共有',
          middleMessage: '0',
          bottomMessage: '个分类/标签',
          to: 'adminCategories'
        },
        {
          backgroundColor: '#E6A23C',
          icon: 'icon-comments',
          topMessage: '共有',
          middleMessage: '0',
          bottomMessage: '条评论',
          to: 'adminComments'
        }
      ],
      articles: [1, 2, 3, 4]
    }
  },
  components: {
    IconCard
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
    .left
      margin-right 20px
</style>
