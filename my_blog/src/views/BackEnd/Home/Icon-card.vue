<template>
  <div id="IconCard">
    <div class="cards">
      <div class="card" v-for="card in list" :key="card.icon" :style="{backgroundColor: card.backgroundColor}" @click="$router.push({name: card.to})">
        <i class="iconfont" :class="card.icon"></i>
        <div class="card-info">
          <p>{{card.topMessage}}</p>
          <p>{{card.middleMessage}}</p>
          <p>{{card.bottomMessage}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IconCard',
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
<style lang="stylus">
#IconCard
  width 100%
  .cards
    display flex
    justify-content space-between
    .card
      display flex
      justify-content space-between
      align-items center
      height 100px
      border-radius 5px
      cursor pointer
      width: calc(20% - 10px)
      padding 10px 20px
    .card-info
      text-align right
      color white
      font-size 16px
      font-weight bold
      line-height 20px
    .iconfont
      width 50px
      height @width
      line-height @height
      text-align center
      border-radius 50%
      font-size 25px
      color white
      background-color rgba(white, 0.2)
</style>
