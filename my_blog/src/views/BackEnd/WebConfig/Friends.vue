<template>
  <div id="Friends">
    <div class="title">友链管理（共计：11条）</div>
    <div class="friends-wrap">
      <el-table :data="friendsList" border stripe size="mini" style="width: 100%">
        <el-table-column label="标题" show-overflow-tooltip min-width="200">
          <template slot-scope="item">
            <a :href="item.row.url" class="friend-title" target="_blank">{{item.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="typeName" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="128"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="128"></el-table-column>
        <el-table-column label="状态" prop="status" width="70">
          <template slot-scope="item">
            <el-tag :type="item.row.status === 1?'success':'danger'" size="mini">
              {{_formatStatus(item.row.status)}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="112">
          <template slot-scope="item">
            <el-button size="mini" icon="el-icon-edit" type="primary" circle>
            </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle v-if="item.row.status !== 0">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Friends',
  data() {
    return {
      friendsList: [
        {
          title: '友链标题',
          url: 'https://hotao.github.io',
          typeName: '友链类型',
          createTime: '2018-08-30 19:39',
          updateTime: '2018-08-30 19:39',
          status: 1
        }
      ]
    }
  },
  methods: {
    _formatStatus(value) {
      return value === 1 ? '已发布' : '已删除'
    }
  }
}
</script>
<style lang="stylus" scoped>
#Friends
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
