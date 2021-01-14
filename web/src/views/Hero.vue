<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">  
      <img src="../assets/logo.png" alt="王者荣耀" height="30">
      <div class="px-3 flex-1">
        <span class="text-white fs-lg">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <!-- 头部-->
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div class="fs-xxs">{{model.title}}</div>
        <h4 class="my-1">{{model.name}}</h4>
        <div class="fs-sm">{{model.categories.map(v => v.name).join(' / ')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-black-323">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">皮肤：2 &gt;</router-link>
        </div>
      </div> 
    </div>
    <!-- 头部结束-->

    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初始</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link class="btn btn-lg flex-1" tag="button" to="/">
                  <i class="iconfont icon-bofang"></i>
                  英雄介绍视频
                </router-link>
                <router-link class="btn btn-lg flex-1 ml-2" tag="button" to="/">
                  <i class="iconfont icon-tupian"></i>
                  一图识英雄
                </router-link>
              </div>
              <!-- 技能 -->
              <div class="skills mt-4">
                <div class="d-flex jc-around">
                  <img class="icon" 
                    @click="currentSkillIndex = index" 
                    :class="{active: currentSkillIndex === index}" 
                    :src="item.icon" 
                    v-for="(item,index) in model.skills" 
                    :key="index"/>
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h3 class="m-0">{{currentSkill.name}}</h3>
                    <span class="text-grey ml-4">
                      (冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}})
                    </span>
                  </div>
                  <p>{{currentSkill.description}}</p>
                </div>
              </div>
            </div>
            <m-card plain icon="cc-menu-circle" title="出装推荐" class="hero-items">
              <div>
                <div class="fs-xl">顺风出装</div>
                <div class="d-flex jc-around text-center py-3">
                  <div v-for="item in model.items1" :key="item.name">
                    <img :src="item.icon" class="icon" />
                    <div class="fs-md">{{item.name}}</div>
                  </div>
                </div>
              </div>

              <div class="border-bottom mt-2"></div>
              <div class="pt-3">
                <div class="fs-xl">逆风出装</div>
                <div class="d-flex jc-around text-center py-3">
                  <div v-for="item in model.items2" :key="item.name">
                    <img :src="item.icon" class="icon" />
                    <div class="fs-md">{{item.name}}</div>
                  </div>
                </div>
              </div>
            </m-card>
            <m-card plain icon="cc-menu-circle" title="使用技巧">
              <p class="m-0">{{model.usageTips}}</p>
            </m-card>
            <m-card plain icon="cc-menu-circle" title="对抗技巧">
              <p class="m-0">{{model.battleTips}}</p>
            </m-card>
            <m-card plain icon="cc-menu-circle" title="团战思路">
              <p class="m-0">{{model.teamTips}}</p>
            </m-card>
            <m-card plain icon="cc-menu-circle" title="最佳搭档">
              <div v-for="item in model.partners" :key="item._id" class="d-flex pb-2" >
                <img :src="item.hero.avatar" height="50"/>
              <div class="flex-1 ml-3 m-0">
                <p>{{item.description}}</p>
              </div>
              </div>
              <div class="border-bottom"></div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true}
  },
  data() {
    return {
      model: null,
      currentSkillIndex: 0
    }
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  },
}
</script>

<style lang="scss">
  .page-hero {
    .top {
      height: 50vw;
      background: #fff no-repeat top center;
      background-size: auto 100%;
    }
    .info {
      background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
      .scores {
        .badge {
          margin: 0 .25rem;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          border-radius: 50%;
          font-size: .6rem;
          border: 1px solid rgba(255,255,255,.15)
        }
      }
    }
    .skills {
      img.icon {
        width: 60px;
        height: 60px;
        border: 3px solid #fff;
        &.active {
          border: 3px solid #db9e3f;

        }
        border-radius: 50%
      }
    }
    .hero-items {
      img.icon {
        width: 45px;
        border-radius: 50%
      }
    }
  }
</style>