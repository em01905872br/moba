<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="230"></el-table-column>
        <!-- 展示上级分类 -->
        <!-- <el-table-column prop="parent.name" label="上级分类"></el-table-column> -->
        <el-table-column prop="name" label="英雄名称"></el-table-column>
        <el-table-column prop="title" label="称号"></el-table-column>
        <el-table-column prop="avatar" label="英雄展示">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" :alt="scope.row.name" :title="scope.row.name" style="height: 3rem">
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
      </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      items: [

      ]
    }
  },
  methods: {
    async fetch() {
      // 接收接口传来的数据
      const res = await this.$http.get('rest/heroes');// eslint-disable-line no-unused-vars
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm('是否确定删除 ' + row.name + ' 分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 请求后台接口，删除这条内容
          const res = await this.$http.delete(`rest/heroes/${row._id}`);// eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 删除操作执行成功之后，重新渲染此页面
          this.fetch();
        });
    }
  },
  // 生命周期函数，加载完成后后还做一些初始化，实现函数自执行；在mounted 之前
  created() {
    this.fetch();
  },
}
</script>
