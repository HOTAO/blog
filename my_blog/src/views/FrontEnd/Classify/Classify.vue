<template>
  <div id="categories">
    <div class="container">
      <div class="title">分类</div>
      <div class="items">
        <div class="item categorie" v-for="cate in categorysInfo.list" :key="cate.id" @click="$router.push({name: 'ArticleList',query:{type:'category',id: cate.id}})">
          {{cate.name}}
          <span>3篇</span>
        </div>
      </div>
      <div class="title">标签</div>
      <div class="items">
        <div class="item tips" v-for="tag in tagsInfo.list" @click="$router.push({name: 'ArticleList',query:{type:'tag',id: tag.id}})" :key="tag.id">{{tag.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'categories',
  computed: {
    ...mapGetters('classify', ['categorysInfo', 'tagsInfo'])
  },
  created() {
    this._getCategory()
    this._getTags()
  },
  methods: {
    ...mapActions('classify', ['getCategory', 'getTags']),
    _getTags() {
      this.getTags().then(res => {
        console.log(res)
      })
    },
    _getCategory() {
      this.getCategory().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#categories
  padding-top 20px
  text-align center
  min-height 'calc(100vh - %s - %s)' % ($headerHeight $footerHeight) // Sprintf
  .title
    font-size 22px
    margin-bottom 20px
  .items
    display flex
    justify-content center
    margin-bottom 50px
    flex-wrap wrap
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
      hover-underline-animation(0, 0, 2px, #262a30, 0, 0, 0, 0)
      &:hover
        hover-underline-animation(0, 0, 2px, #262a30, 0, 0, 0, 100%)
</style>
