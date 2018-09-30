<template>
  <div id="comments">
    <el-form :model="comment" size="mini" ref="dynamicValidateForm" label-width="70px" class="demo-dynamic">
      <el-form-item size="mini" label="称呼：" prop="name" :rules="[{ required: true, message: '请输入称呼',trigger: 'blur' }]">
        <el-input v-model="comment.name" placeholder="称呼（必填）"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="邮箱：" prop="email" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
        <el-input v-model="comment.email" placeholder="邮箱（选填，方便联系你，不会公开）"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="内容：" prop="content" :rules="[{ required: true, message: '请填写活动形式', trigger: 'blur' }]">
        <el-input v-model="comment.content" type="textarea" rows="4" placeholder="写下您的留言~（必填）"></el-input>
      </el-form-item>
    </el-form>
    <div class="actions">
      <el-button type="">表情</el-button>
      <el-button type="primary">发送~</el-button>
    </div>
    <div class="list">
      <div class="title">10条留言</div>
      <div class="list-item">
        <div class="info">
          <div class="commenter">
            <img src="~@/assets/logo.png" alt="" class="avatar">
            <div class="name-time">
              <div class="name">ming
                <el-button type="text">回复</el-button>
              </div>
              <div class="time">2019-20-23 12:32:32</div>
            </div>
          </div>
          <div class="content">你好，我好崇拜你啊。</div>
          <div class="list-item-children">
            <div class="info">
              <div class="commenter">
                <img src="~@/assets/logo.png" alt="" class="avatar">
                <div class="name-tiem">
                  <div class="name">ming
                    <el-button type="text">回复</el-button>
                  </div>
                  <div class="time">2019-20-23 12:32:32</div>
                </div>
              </div>
              <div class="content">你好，我好崇拜你啊。</div>
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
  data() {
    return {
      comment: {
        name: '',
        email: '',
        content: ''
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#comments
  padding 40px 0
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
