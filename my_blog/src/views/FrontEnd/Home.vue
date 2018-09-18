<template>
  <div class="home">
    <ContentCard :list="[1,2,3,4,5]" />
  </div>
</template>

<script>
import ContentCard from '@/components/content-card/card.vue'

export default {
  name: 'home',
  components: {
    ContentCard
  }
}
</script>
