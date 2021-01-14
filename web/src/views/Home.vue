<template>
  <div>
    <!--轮播开始-->
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/661a21a35136fcc62a0cceffd654379e.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/a611871958bc9ce57b0bb39bbd8ecc05.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/e9e798db580d2531e4351049bee2858e.jpeg" alt>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!--轮播结束-->

    <!--精灵图导航开始-->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-black-dark fs-sm">
      <div class=" d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="pt-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="pt-2">故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-shop"></i>
          <div class="pt-1">周边商城</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-experience"></i>
          <div class="pt-1">体验服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-newGuy"></i>
          <div class="pt-6">新人专区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-inherit"></i>
          <div class="pt-6">荣耀传承</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-camp"></i>
          <div>王者营地</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-Weichat"></i>
          <div>公众号</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-version"></i>
          <div class="pt-8">版本介绍</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-djhj"></i>
          <div class="pt-3">对局环境</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-wzwxt"></i>
          <div class="pt-7">王者无线团</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-cyhdy"></i>
          <div>创意互动营</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!--精灵图导航结束-->

    <!--新闻资讯-->
    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-2 fs-lg d-flex" 
        v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info border-round ml-1">{{news.categoryName}}</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-black-dark text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-black-6 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <!--英雄列表-->
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link 
          tag="div"
          :to="`/heroes/${hero._id}`"
          class="p-2 text-center" 
          style="width: 20%;"
          v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" :title="hero.name" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
        
      </template>
    </m-list-card>

    
    <!--字体图标开始-->
    <!--菜单
    <i class="iconfont icon-cc-menu-circle"></i>-->
    <!--英雄图标
    <i class="iconfont icon-card-hero"></i>-->
    <!--字体图标结束-->
  </div>
</template>

<script>
 

import dayjs from 'dayjs';
export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD');
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home",
          // clickable:true,
          paginationClickable: true,
        },
      },
      newsCats: [],
      heroCats: [],
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list'); // eslint-disable-line no-unused-vars
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list'); // eslint-disable-line no-unused-vars
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
}
</script>

<style lang="scss">
  .nav-icons {
    border-top: 1px solid #d4d9de;
    border-bottom: 1px solid #d4d9de;
    .nav-item {
      width: 25%;
      border-right: 1px solid #d4d9de;
      &:nth-child(4n) {
        border-right: 0px solid;
      }
    }
  }
  .border-round {
    border: 1px solid #4d9cff;
    border-radius: 2px;
  }
</style>

