<template>
  <div class="mini-minion-data">
    <div class="box-header minion-title">{{ $t('minion_used_top') }}</div>
    <ul class="minion-list">
      <li v-for="el in minionList" :key="el.minion">
        <ul class="minion-item">
          <li class="_image">
            <div class="card_wrapper">
              <img :src="getMinionImgUrl(el.minion)" :thumbnail="getMinionImgUrl('thumbnail')" :alt="$t(el.minion)" />
            </div>
          </li>
          <li class="_name cut-text">
            <b class="text-info">{{ $t(el.minion) }}</b>
            <div class="first-info above">{{ $t('used_count') }}: {{ el.used_cnt }}</div>
          </li>
          <li class="_crown cut-text">
            <b class="text-warning">1st</b>
            <div class="">{{ el.crown_cnt }} <span class="divide">/</span> {{ el.crown_cnt / el.game_cnt * 100 | format_number }}%</div>
          </li>
          <li class="_win cut-text">
            <b class="text-primary">{{ $t('win') }}</b>
            <div class="">{{ el.win_cnt }} <span class="divide">/</span> {{ el.win_cnt / el.game_cnt * 100 | format_number }}%</div>
          </li>
        </ul>
      </li>
      <li class="li-more" @click="move_minion_page">
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
  name: 'mini-minion-data',
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
      default: 10
    }
  },
  data: () => {
    return {
      minionList: []
    }
  },
  watch: {
    startDate () {
      this.get_minion_list();
    },
    endDate () {
      this.get_minion_list();
    }
  },
  mounted () {
    this.get_minion_list();
  },
  methods: {
    async get_minion_list () {
      try {
        const json = {
          player_id: this.playerId,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate),
          limit_size: this.limitSize
        };
        let response = await axios.get('http://battlegroundlab.com/api/minion.php' + this.jsonToParam(json));
        if (response.data.resultJson.length > 0) {
          this.minionList = response.data.resultJson;
        } else {
          this.minionList = []
        }
      } catch(err) {
        console.log(err);
      }
    },
    move_minion_page () {
      sessionStorage.setItem('startDate', this.getYYYY_MM_DD(this.startDate));
      sessionStorage.setItem('endDate', this.getYYYY_MM_DD(this.endDate));
      router.push({name:'minion'});
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/common.scss';
div.minion-title {
  border-bottom: 1px solid #c9c9c9;
}
ul.minion-list {
  font-size: 0.9em;
  li {
    /* height: 70px; */
    border-bottom: 1px solid #c9c9c9;
    ul.minion-item {
      display: flex;
      li {
        padding: 5px;
        font-size: 0.9em;
        border: none;
        &>* {
          vertical-align: middle;
        }
      }
      li._image {
        flex: 50px 0 0;
        .card_wrapper {
          max-width: 90px;
          max-height: 90px;
          padding: 2px;
          position: relative;
          border-radius: 5px;
          border: 1px solid #c9c9c9;
          overflow: hidden;
          display: flex;
          img {
            max-width: 100%;
            max-height: 100%;
            transform: scale(1.7);
          }
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
