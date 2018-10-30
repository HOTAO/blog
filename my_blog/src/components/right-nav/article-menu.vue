<template>
  <div class="article-menu">
    <ul>
      <li v-for="item in menu" :key="item.text">
        <span @click="_toTitle(item)" :class="{'active': _heightLight(item) || _isParent(item)}">{{item.tag}} {{item.text}}</span>
        <articleMenu :menu="item.children"></articleMenu>
      </li>
    </ul>
  </div>
</template>
<script>
import scroll from '@/plugins/scroll'
export default {
  name: 'articleMenu',
  props: ['menu'],
  mixins: [scroll],
  computed: {
    ...mapGetters(['articleMenuTag'])
  },
  methods: {
    _toTitle(item) {
      /**
       * 这里不需要记录当前的目录tag了,
       * 因为，在App.vue里面，做对滚动做了监听
       * 在下面的滚动行为执行时，会在App.vue根据条件判断是哪个tag，并做记录
       */
      // this.setArticleMenuTag(item.tag)
      /**
       * Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置(https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
       */
      let top = document.getElementById(item.id).getBoundingClientRect().top
      // 如果产生了滚动的话，上面的top距离视口的距离就会出现数值不正确的情况，这个时候需要把滚动了多少的高度加回去
      top += document.body.scrollTop || document.documentElement.scrollTop
      this.scrollToTarget(top)
    },
    _heightLight(item) {
      return item.tag === this.articleMenuTag
    },
    _isParent(item) {
      return this.articleMenuTag.indexOf(item.tag) === 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-menu
  text-align left
  font-size 14px
  line-height 20px
  color $color-light-grey
  font-weight bold
  li
    list-style none
    .active
      color white
      transition all 0.3s
  span
    display inline-block
    border-bottom 1px solid #555
    cursor pointer
    &:hover
      color white
      transition all 0.3s
  .article-menu
    margin-left 10px
</style>

