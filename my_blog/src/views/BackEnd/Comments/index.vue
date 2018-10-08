<template>
  <div id="Comments">
    <div class="title">评论（共计：{{commentsInfo.count}}条）</div>
    <el-table :data="commentsInfo.list" border stripe size="mini" style="width: 100%">
      <el-table-column prop="name" label="评论者" show-overflow-tooltip min-width="120">
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="200">
      </el-table-column>
      <el-table-column prop="title" label="文章" width="150">
      </el-table-column>
      <el-table-column prop="is_author" label="作者" width="45">
        <template slot-scope="item">
          <span>{{item.row.is_author?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="评论时间" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="110">
        <template slot-scope="item">
          <el-button @click="_showDialog(item.row)" size="small" icon="el-icon-edit" type="primary" circle></el-button>
          <el-button @click="_deltel(item.row)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="回复" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="commentForm">
        <el-form-item prop="content" :rules="[{ required: true, message: '回复内容不能为空', trigger: 'blur' }]">
          <el-input class="input-title" size="mini" type="textarea" :rows="5" resize="none" v-model="form.content" :placeholder="form.placeholder">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="_submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Comments',
  data() {
    return {
      dialogFormVisible: false,
      comment: {},
      form: {
        content: '',
        placeholder: ''
      }
    }
  },
  computed: {
    ...mapGetters('comments', ['commentsInfo']),
    ...mapGetters('auth', ['userInfo'])
  },
  created() {
    this._geAlltComments()
  },
  methods: {
    ...mapActions('comments', [
      'insertComment',
      'getAllComments',
      'deleteComment'
    ]),
    _geAlltComments() {
      this.getAllComments({ page: 1, pageSize: 20 }).then(res => {
        console.log(res)
      })
    },
    _showDialog(comment) {
      this.dialogFormVisible = true
      this.comment = comment
      this.form.placeholder = `@${comment.name}`
    },
    _deltel(comment) {
      this.$confirm('此操作将永久删除该条评论，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteComment(comment.id).then(() => {
          this.$notify({
            type: 'success',
            title: '删除成功'
          })
          this._geAlltComments()
        })
      })
    },
    _submit() {
      this.$refs.commentForm.validate(valid => {
        if (valid) {
          const params = {
            article_id: this.comment.article_id,
            reply_id: this.comment.id,
            content: `@${this.comment.name} ${this.form.content}`,
            source_content: `@${this.comment.name} ${this.form.content}`,
            is_author: 1,
            name: this.userInfo.username
          }
          this.insertComment(params).then(() => {
            this.$notify({
              type: 'success',
              title: '回复成功'
            })
            this.dialogFormVisible = false
            this._geAlltComments()
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
#Comments
  width 100%
  .title
    font-weight bold
    margin 10px 0 20px
  .actions
    background-color $color-bg-grey
    padding 10px 5px
    span
      display inline-block
      padding 8px 10px
      font-size 14px
      cursor pointer
      background-color $color-main
      color $color-white
      border-radius 5px
      &:hover
        background-color lighten($color-main, 10%)
</style>
