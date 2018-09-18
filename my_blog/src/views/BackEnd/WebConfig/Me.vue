<template>
  <div id="Me">
    <div class="title">
      <span>关于我们</span>
      <el-button size="mini" @click="_submit">更新</el-button>
    </div>
    <mavon-editor class="editor" v-model="me.md" />
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import marked from 'marked'

export default {
  name: 'Me',
  components: {
    mavonEditor
  },
  computed: {
    ...mapGetters('webConfig', ['meInfo'])
  },
  data() {
    return {
      me: {
        md: "**Holle, I'm HoTao**\n==BaseInfo==\nI'm a good man."
      }
    }
  },
  async created() {
    await this._getMe()
    if (JSON.stringify(this.meInfo) !== '{}') this.me = this.meInfo
  },
  methods: {
    ...mapActions('webConfig', ['insertMe', 'getMe', 'updateMe']),
    _getMe() {
      return this.getMe()
    },
    _submit() {
      const parmas = {
        type: 'me',
        md: this.me.md,
        html: marked(this.me.md)
      }
      if (!this.me.id) {
        this.insertMe(parmas)
      } else {
        parmas.id = this.me.id
        this.updateMe(parmas)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#Me
  .title
    display flex
    justify-content space-between
    align-items center
    font-weight bold
    margin 10px 0 20px
    border-left 2px solid $color-main
    padding-left 20px
    .el-button
      border-radius 5px
      background-color $color-main
      color white
      &:hover
        background-color lighten($color-main, 10%)
</style>
