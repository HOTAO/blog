<template>
  <div id="DeleteArticle">
    <div class="title">回收站（共计：{{server_articleListInfo.count}}篇）</div>
    <el-table :data="server_articleListInfo.list" border stripe size="mini" style="width: 100%">
      <el-table-column prop="title" label="标题" min-width="200">
      </el-table-column>
      <el-table-column prop="cover" label="封面图" width="121">
        <template slot-scope="item">
          <img class="article-cover" :src="item.row.cover" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="categoryName" label="分类" width="120">
      </el-table-column>
      <el-table-column prop="pageview" label="阅读量" width="60">
      </el-table-column>
      <el-table-column prop="isSecret" label="加密" width="45">
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="140">
        <template slot-scope="article">
          {{article.row.createTime | timeFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间" width="140">
        <template slot-scope="article">
          {{article.row.publishTime | timeFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="140">
        <template slot-scope="article">
          {{article.row.updateTime | timeFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="70">
        <template slot-scope="article">
          <el-tag :type="article.row.status == '2' ? 'success' : 'danger'" size="mini">
            {{ _formatStatus(article.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="112">
        <template slot-scope="article">
          <el-button @click="$router.push({name: 'EditArticle', params: {articleId: article.row.id}})" size="small" icon="el-icon-edit" type="primary" circle></el-button>
          <!-- <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="server_articleListInfo.count" background :current-page="params.page" :page-size="params.pageSize" @current-change="_pageChange" layout="prev, pager, next"></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'DeleteArticle',
  computed: {
    ...mapGetters('article', ['server_articleListInfo'])
  },
  data() {
    return {
      params: {
        status: 0,
        page: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this._getArticlesForServer()
  },
  methods: {
    ...mapActions('article', ['getArticlesForServer', 'updateArticleByStatus']),
    _pageChange(page) {
      this.$router.push({ query: { page } })
      this._getArticlesForServer()
    },
    _formatStatus(value) {
      return value == '0' ? '已删除' : '-'
    },
    _getArticlesForServer() {
      this.params.page = Number(this.$route.query.page) || 1
      return this.getArticlesForServer(this.params)
    }
  }
}
</script>
<style lang="stylus" scoped>
#DeleteArticle
  width 100%
  .title
    font-weight bold
    margin 10px 0 20px
  .article-cover
    width 100px
  >>>.el-pagination
    margin-top 20px
    text-align center
</style>
