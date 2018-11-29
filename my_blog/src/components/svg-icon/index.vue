<template>
  <svg :class="iconClass" aria-hidden="true">
    <use :xlink:href="'#'+symbol"></use>
  </svg>
</template>

<script>
export default {
  props: ['symbol'],
  computed: {
    iconClass() {
      return `icon ${this.symbol}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
</style>