<template>
  <div id="Categories">
    <div class="title">分类（共计：{{categorysInfo.count}}种）</div>
    <div class="actions">
      <span @click="_showDialog">新增分类</span>
    </div>
    <el-table :data="categorysInfo.list" border stripe size="mini" style="width: 100%">
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
          <el-button @click="_showMessageBox(item.row)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增分类" :visible.sync="dialogFormVisible" width="320px">
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
    <el-pagination :total="categorysInfo.count" background :current-page="params.page" :page-size="params.pageSize" @current-change="_pageChange" layout="prev, pager, next"></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Categories',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        status: ''
      },
      params: {
        page: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    ...mapGetters('classify', ['categorysInfo'])
  },
  created() {
    this._getCategory()
  },
  methods: {
    ...mapActions('classify', [
      'getCategory',
      'insertCategory',
      'updateCategory',
      'deleteCategory'
    ]),
    _showMessageBox(category) {
      this.$confirm(`确定删除'${category.name}'分类么？`, '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定'
      }).then(() => {
        this.deleteCategory(category.id).then(() => {
          this._getCategory()
        })
      })
    },
    _showDialog(obj) {
      this.form = {
        name: obj.name || '',
        status: obj.status || '',
        id: obj.id
      }
      this.dialogFormVisible = true
    },
    _pageChange(page) {
      this.$router.push({ query: { page } })
      this._getCategory()
    },
    _getCategory() {
      this.params.page = Number(this.$route.query.page) || 1
      this.getCategory(this.params)
    },
    _submit() {
      const hasId = Boolean(this.form.id)
      if (hasId) {
        this.updateCategory(this.form)
          .then(() => {
            this.dialogFormVisible = false
            this._getCategory()
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
          })
          .catch(error => {
            this.$notify({
              title: '失败',
              message: error.data.error,
              type: 'error'
            })
          })
      } else {
        this.insertCategory(this.form)
          .then(() => {
            this.dialogFormVisible = false
            this._getCategory()
            this.$notify({
              title: '成功',
              message: '添加新分类成功',
              type: 'success'
            })
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
#Categories
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
  >>>.el-input
    width 194px
  >>>.el-pagination
    margin-top 20px
    text-align center
</style>
