<template>
  <div id="Tags">
    <div class="title">标签（共计：13种）</div>
    <div class="actions">
      <span @click="_showDialog">新增标签</span>
    </div>
    <el-table :data="tags" border stripe size="mini" style="width: 100%">
      <el-table-column prop="name" label="分类名称" show-overflow-tooltip min-width="120">
      </el-table-column>
      <el-table-column prop="article_count" label="文章数" width="60">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="150">
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="150">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="110">
        <template slot-scope="item">
          <el-button @click="_showDialog(item.row)" size="small" icon="el-icon-edit" type="primary" circle></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增标签" :visible.sync="dialogFormVisible" width="320px">
      <el-form :model="form">
        <el-form-item label="名称" label-width="60px">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="60px">
          <el-select v-model="form.status" placeholder="请选择分类状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
          </el-select>
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
  name: 'Tags',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        status: ''
      }
    }
  },
  computed: {
    ...mapGetters('classify', ['tags'])
  },
  created() {
    this._getTags()
  },
  methods: {
    ...mapActions('classify', [
      'getTags',
      'insertTag',
      'updateTag',
      'deleteTag'
    ]),

    _showDialog(obj) {
      this.form = {
        name: obj.name || '',
        status: obj.status || '',
        id: obj.id
      }
      this.dialogFormVisible = true
    },
    _getTags() {
      this.getTags().then(res => {
        console.log(res)
      })
    },
    _submit() {
      const hasId = Boolean(this.form.id)
      if (hasId) {
        this.updateTag(this.form)
          .then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            this._getTags()
          })
          .catch(error => {
            this.$notify({
              title: '失败',
              message: error.data.error,
              type: 'error'
            })
          })
      } else {
        this.insertTag(this.form)
          .then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加新标签成功',
              type: 'success'
            })
            this._getTags()
          })
          .catch(error => {
            this.$notify({
              title: '失败',
              message: error.data.error,
              type: 'error'
            })
          })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
#Tags
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
