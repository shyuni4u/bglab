<template>
  <div class="game-data">
    <b-overlay :show="show" rounded="sm">
      <ul class="game-list"
      v-if="gameList.length > 0">
        <li
        v-for="el in gameList"
        :key="el.game + ''"
        :class="(el.placement < 5 ? 'win' : 'defeat')">
          <ul class="game-item">
            <li class="_image">
              <img :src="getHeroImgUrl(el.hero)" :thumbnail="getHeroImgUrl('thumbnail')" :alt="$t(el.hero)" />
            </li>
            <li class="_date">
              <div class="first-info">{{ el.dt_now }}</div>
            </li>
            <li class="_mmr">
              <div class="first-info">{{ $t('mmr') }}</div>
              <div class="first-info">{{ el.mmr }}</div>
            </li>
            <li class="_rank">
              <div class="first-info">{{ $t('placement') }}</div>
              <div class="first-info">{{ el.placement }}</div>
            </li>
            <li class="_minions">
              <ul class="last-board">
                <li class="_minion"
                v-for="card in get_card_list(el.game)"
                :key="card.game_id + card.card_order">
                  <card
                  v-if="el.hs_version == '1.1.0'"
                  board_type="turn"
                  :cardId="card.card_id"
                  :atk="card.atk"
                  :health="card.health"
                  :etc="card.etc"
                  :gold="check_gold(card.card_id)"/>
                  <card
                  v-else
                  :cardId="card.card_id"
                  :gold="check_gold(card.card_id)"/>
                </li>
              </ul>
            </li>
            <li class="_detail" @click="detail_game(el.game, el.hs_version)" :alt="$t('detail')">
              <h3><b-icon icon="three-dots-vertical" :variant="(el.placement < 5 ? 'primary' : 'danger')"></b-icon></h3>
            </li>
          </ul>
        </li>
        <li class="li-more" @click="more_game" :alt="$t('more')">
          {{ $t('more') }}
        </li>
      </ul>
      <ul class="game-list"
      v-else>
        <li>The data does not exist. Try changing the conditions.</li>
      </ul>
    </b-overlay>
  </div>
</template>

<script>
import i18n from '@/plugins/i18n';
import router from '@/router/index';
import common from '@/mixins/common';
import axios from 'axios';

import Card from '@/components/CardWrapper.vue'

export default {
  name: 'game-data',
  mixins: [common],
  components: { 'card': Card, },
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
      default: 20
    }
  },
  data: () => {
    return {
      show: true,
      gameList: [],
      cardList: [],
      goldList: [],
    }
  },
  watch: {
    startDate () {
      this.get_game_list();
    },
    endDate () {
      this.get_game_list();
    }
  },
  computed: {
    lang () {
      return i18n.locale;
    }
  },
  mounted () {
    this.get_gold_card_list();
    this.get_game_list();
  },
  methods: {
    async get_gold_card_list () {
      try {
        let response = await axios.get('http://battlegroundlab.com/api/goldcard.php');
        if (response.data.resultJson.length > 0) {
          this.goldList = [];
          this.goldList = response.data.resultJson;
        } else {
          this.goldList = [];
        }
      } catch(err) {
        console.log(err);
      }
    },
    async get_game_list () {
      try {
        const json = {
          player_id: this.playerId,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate),
          limit_size: this.limitSize
        };
        let response = await axios.get('http://battlegroundlab.com/api/game_list.php' + this.jsonToParam(json));
        this.gameList = [];
        this.cardList = [];
        if (response.data.resultJson.length > 0) {
          this.gameList = response.data.resultJson;
          this.cardList = response.data.resultCardJson;
        }
      } catch(err) {
        console.log(err);
      } finally {
        this.show = false;
      }
    },
    async more_game () {
      try {
        const s = this.gameList.length;
        const e = this.limitSize;
        const json = {
          player_id: this.playerId,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate),
          limit_size: `${s}, ${e}`
        };
        let response = await axios.get('http://battlegroundlab.com/api/game_list.php' + this.jsonToParam(json));
        if (response.data.resultJson.length > 0) {
          this.gameList = this.gameList.concat(response.data.resultJson);
          this.cardList = this.cardList.concat(response.data.resultCardJson);
        }
      } catch(err) {
        console.log(err);
      }
    },
    get_card_list (game_id) {
      return this.cardList.filter((el) => {
        return el.game_id == game_id;
      });
    },
    check_gold (cid) {
      return this.goldList.map(el => el.id).includes(cid);
    },
    detail_game (game_id, version) {
      sessionStorage.setItem('gid', game_id);
      if (version == '1.0.0') {
        router.push({name: 'gameDetail', params: {"gid": game_id}});
      } else {
        router.push({name: 'gameDetail2', params: {"game_id": game_id + ''}});
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/common.scss';
div.game-title {
  border-bottom: 1px solid #c9c9c9;
}
ul.game-list {
  font-size: 0.9em;
  min-height: 200px;
  &>li {
    height: 90px;
    border: 1px solid #c9c9c9;
    padding: 2px 0px 5px 15px;
    margin-bottom: 5px;
    &.win {
      background-color: #a3cfec;
      border-color: #99b9cf;
    }
    &.defeat {
      background-color: #e2b6b3;
      border-color: #cea7a7;
    }
    ul.game-item {
      display: flex;
      &>li {
        text-align: center;
        vertical-align: middle;
        -ms-flex-item-align: center;
        align-self: center;
        height: 80px;
        font-size: 0.9em;
        &>* {
          vertical-align: middle;
        }
      }
      li._image {
        flex: 60px 0 0;
        img {
          max-width: 100%;
          height: 100%;
        }
      }
      li._date { padding: 20px 0; flex: 100px 0 0; }
      li._mmr { padding: 20px 0; flex: 60px 0 0; div.first-info { color: #333 !important; } }
      li._rank { padding: 20px 0; flex: 60px 0 0; div.first-info { color: #333 !important; } }
      li._minions { flex: 25% 1 1; }
      li._detail { flex: 40px 0 0; cursor: pointer; }
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
ul.last-board {
  display: flex;
  &>li._minion {
    flex: 80px 0 1;
    margin-right: 3px;
    .card_wrapper {
      max-width: 72px;
      max-height: 72px;
      padding: 2px;
      margin: 5px;
      position: relative;
      border-radius: 50%;
      border: 3px solid #777;
      overflow: hidden;
      display: flex;
      >img {
        max-width: 100%;
        max-height: 100%;
        transform: scale(1.7);
      }
      div.gold {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 20px;
        height: 20px;
        z-index: 3;
        >img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
@media (max-width: 1280px) {
  ul.game-list {
    &>li {
      padding: 5px 0px 5px 5px;
      height: inherit;
      ul.game-item {
        flex-wrap: wrap;
        display: inline-block;
        width: 100%;
        height: 170px;
        position: relative;
        &>li._image { position: absolute; top: 0px; left: 0px; width: 25%; height: 100px; }
        &>li._date { position: absolute; bottom: 15px; left: 0px; width: 25%; height: 2em; }
        &>li._mmr {
          position: absolute; bottom: 15px; left: 25%; width: 25%; height: 2em; display: inline-block; text-align: left;
          &>div {
            display: inline-block;
            &:first-child {
              margin-right: 5px;
            }
          }
        }
        &>li._rank {
          position: absolute; bottom: 15px; left: 50%; width: 25%; height: 2em; display: inline-block; text-align: left;
          &>div {
            display: inline-block;
            &:first-child {
              margin-right: 5px;
            }
          }
        }
        &>li._minions { position: relative; top: 5px; left: 25%; width: 75%; height: 200px; }
        &>li._detail { position: absolute; bottom: 10px; right: 0px; width: 25%; height: 2em; cursor: pointer; text-align: right; }
      }
    }
  }
  ul.last-board {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    &>li._minion {
      flex: 60px 0 1;
      margin-right: 0px;
      img {
        max-width: 100%;
        max-height: 95%;
        border-radius: 50%;
      }
    }
  }
}
</style>