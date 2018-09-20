<template>
  <div id="mdPreview">
    <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet">
    <section id="markdown-preview-body" class=" markdown-body" v-html="content">
    </section>
  </div>
</template>
<script>
export default {
  name: 'mdPreview',
  props: ['content']
}
</script>
