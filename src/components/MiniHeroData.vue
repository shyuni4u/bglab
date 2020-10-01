<template>
  <div class="mini-hero-data">
    <div class="box-header hero-title">{{ $t('hero_avg_top') }}</div>
    <ul class="hero-list">
      <li v-for="el in heroList" :key="el.hero">
        <ul class="hero-item">
          <li class="_image">
            <img :src="getHeroImgUrl(el.hero)" :thumbnail="getHeroImgUrl('thumbnail')" :alt="$t(el.hero)" />
          </li>
          <li class="_name cut-text">
            <b class="text-info">{{ $t(el.hero) }}</b>
            <div class="first-info above">{{ $t('avg') }} {{ el.hero_avg | format_number }}</div>
          </li>
          <li class="_crown cut-text">
            <b class="text-warning">1st</b>
            <div class="">{{ el.crown_cnt }} <span class="divide">/</span> {{ el.crown_cnt / el.total_cnt * 100 | format_number }}%</div>
          </li>
          <li class="_win cut-text">
            <b class="text-primary">{{ $t('win') }}</b>
            <div class="">{{ el.win_cnt }} <span class="divide">/</span> {{ el.win_cnt / el.total_cnt * 100 | format_number }}%</div>
          </li>
        </ul>
      </li>
      <li class="li-more" @click="move_hero_page">
        {{ $t('more') }}
      </li>
    </ul>
  </div>
</template>

<script>
import router from '@/router/index';
import common from '@/mixins/common';
import axios from 'axios';

export default {
  name: 'mini-hero-data',
  mixins: [common],
  props: {
    startDate: {
      type: Date,
      default: new Date('2020-02-27T00:00:00+09:00')
    },
    endDate: {
      type: Date,
      default: new Date()
    },
    playerId: {
      type: Number,
      default: -1
    },
    limitSize: {
      type: Number,
      default: 5
    }
  },
  data: () => {
    return {
      heroList: []
    }
  },
  watch: {
    startDate () {
      this.get_hero_list();
    },
    endDate () {
      this.get_hero_list();
    }
  },
  mounted () {
    this.get_hero_list();
  },
  methods: {
    async get_hero_list () {
      try {
        const json = {
          player_id: this.playerId,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate),
          limit_size: this.limitSize
        };
        let response = await axios.get('http://battlegroundlab.com/api/hero.php' + this.jsonToParam(json));
        if (response.data.resultJson.length > 0) {
          this.heroList = response.data.resultJson;
        } else {
          this.heroList = []
        }
      } catch(err) {
        console.log(err);
      }
    },
    move_hero_page () {
      sessionStorage.setItem('startDate', this.getYYYY_MM_DD(this.startDate));
      sessionStorage.setItem('endDate', this.getYYYY_MM_DD(this.endDate));
      router.push({name:'hero'});
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/common.scss';
div.hero-title {
  border-bottom: 1px solid #c9c9c9;
}
ul.hero-list {
  font-size: 0.9em;
  li {
    height: 70px;
    border-bottom: 1px solid #c9c9c9;
    ul.hero-item {
      display: flex;
      li {
        padding: 5px;
        font-size: 0.9em;
        line-height: 1.9em;
        &>* {
          vertical-align: middle;
        }
      }
      li._image {
        flex: 50px 0 0;
        img {
          width: 45px;
          height: 60px;
        }
      }
      li._name { width: 100px; flex: 25% 1 1; }
      li._crown { flex: 25% 0 0; }
      li._win { flex: 25% 0 0; }
    }
  }
  li.li-more {
    vertical-align: middle;
    text-align: center;
    height: 2em;
    padding: 3px;
    cursor: pointer;
    &:hover {
      background-color: #e5e5e5;
    }
  }
}
@media (max-width: 1280px) {
}
</style>
