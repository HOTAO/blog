<template>
  <div id="comments">
    <div class="title">留下你的👣（足迹）吧~</div>
    <el-form :model="comment" size="mini" ref="commentForm" label-width="70px" class="demo-dynamic">
      <el-form-item size="mini" label="称呼：" prop="name" :rules="[{ required: true, message: '请输入称呼',trigger: 'blur' }]">
        <el-input v-model="comment.name" placeholder="称呼（必填）"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="邮箱：" prop="email" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
        <el-input v-model="comment.email" placeholder="邮箱（选填，方便联系你，不会公开）"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="内容：" prop="content" :rules="[{ required: true, message: '回复内容不能为空', trigger: 'blur' }]">
        <el-input v-model="comment.content" type="textarea" rows="4" placeholder="写下您的留言~（必填）"></el-input>
      </el-form-item>
    </el-form>
    <div class="actions">
      <el-button type="">表情</el-button>
      <el-button type="primary" @click="_send">发送~</el-button>
    </div>
    <div class="list">
      <div class="title">{{commentsInfo.count}}条留言</div>
      <div class="list-item" v-for="cm in commentsInfo.list" :key="cm.id">
        <div class="info">
          <div class="commenter">
            <img v-if="!cm.is_author" src="~@/assets/logo.png" alt="" class="avatar">
            <img v-else :src="baseInfo.avatar" alt="" class="avatar">
            <div class="name-time">
              <div class="name">{{_getName(cm)}}
                <el-button type="text" @click="_reply(cm)">回复</el-button>
              </div>
              <div class="time">{{cm.create_time | timeFormat}}</div>
            </div>
          </div>
          <div class="content">{{cm.content}}</div>
          <div class="list-item-children" v-for="child in cm.children" :key="child.id">
            <div class="info">
              <div class="commenter">
                <img v-if="!child.is_author" src="~@/assets/logo.png" alt="" class="avatar">
                <img v-else :src="baseInfo.avatar" alt="" class="avatar">
                <div class="name-tiem">
                  <div class="name">{{_getName(child)}}
                    <el-button type="text" @click="_reply(child)">回复</el-button>
                  </div>
                  <div class="time">{{child.create_time | timeFormat}}</div>
                </div>
              </div>
              <div class="content">{{child.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'comments',
  props: ['articleId'],
  computed: {
    ...mapGetters('comments', ['commentsInfo']),
    ...mapGetters('webConfig', ['baseInfo'])
  },
  data() {
    return {
      comment: {
        name: '',
        email: '',
        content: '',
        reply_id: 0,
        reply_Name: ''
      }
    }
  },
  created() {
    this._getComments()
  },
  watch: {
    'comment.content': function(newVal) {
      console.log(newVal)
      if (this.comment.replyName !== '') {
        if (newVal.indexOf(this.comment.replyName) !== 0) {
          this.comment.replyId = 0
          this.comment.replyName = ''
        }
      }
    }
  },
  methods: {
    ...mapActions('comments', ['insertComment', 'getComments']),
    _getName(comment) {
      return comment.is_author ? `${comment.name}（作者）` : comment.name
    },
    _getAvatar(comment) {
      return comment.is_author ? this.baseInfo.avatar : '~@/assets/logo.png'
    },
    _getComments() {
      this.getComments({ article_id: this.articleId })
    },
    _reply(comment) {
      console.log(comment)
      this.comment.reply_id = comment.id
      this.comment.content = `@${comment.name} `
    },
    _send() {
      this.$refs.commentForm.validate(valid => {
        if (valid) {
          const params = {
            name: this.comment.name,
            email: this.comment.email,
            content: this.comment.content,
            article_id: this.articleId,
            reply_id: this.comment.reply_id,
            is_author: 0
          }
          console.log(params)
          this.insertComment(params).then(() => {
            this.$notify({
              type: 'success',
              title: '评论成功'
            })
            this._getComments()
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
#comments
  padding 40px 0
  .title
    border-top 1px solid $color-main
    padding 20px 0
    font-style italic
  .actions
    display flex
    justify-content space-between
  .list
    padding-top 20px
    .title
      font-size 14px
      color $color-main
      font-weight bold
      padding-bottom 10px
      margin-bottom 10px
      border-bottom 1px solid $color-border
    .list-item
      .commenter
        display flex
        align-items center
        padding 6px 0
      .list-item-children
        margin-left 14px
        border-left 2px solid $color-light-grey
        .info
          padding 10px 20px
      img
        width 32px
        height @width
        border-radius 50%
        margin-right 10px
      .name
        color $color-mid-grey
        margin-bottom 4px
        button
          margin-left 20px
      .time
        font-size 14px
        color $color-light-grey
      .content
        padding-left 42px
        font-size 14px
        color $color-dark-grey
</style>
