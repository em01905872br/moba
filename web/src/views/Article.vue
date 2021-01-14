<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom text-info">
      <div class="iconfont icon-back"></div>
      <strong class="flex-1 text-ellipsis pl-2">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xs">2020-12-20</div>
    </div>
    <div v-html="model.body" class="px-3 article-body fs-lg"></div>

    <div class="px-3 border-sTop pt-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-lianjie"></i>
        <strong class="text-info px-2">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
          class="p-1"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id">
            {{item.title}}
        </router-link>

      </div>


    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {required: true}
  },
  data(){
    return {
      model: null
    }
  },
  watch: {
    this() {
      this.fetch();
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
      console.log(res.data.related)
    }
  },
  created() {
    this.fetch();
  },
}
</script>

<style lang="scss">
.article-body {
  img {
    width: 100%;
    height: auto;
  }
  iframe {
    width: 100%;
    height: auto;
  }
}
.border-sTop {
  border-top: 3px solid #d4d9de;
}
</style>