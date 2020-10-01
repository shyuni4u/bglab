<template>
  <div class="game-detail-data2">
    <div v-if="game_id != ''" class="info-wrapper">
      <b-overlay :show="show" rounded="sm" z-index="9999">
        <ul class="game-info box">
          <li class="_date first-info above cut-text">{{ gameInfo.dt_now }}</li>
          <li class="_hero first-info above cut-text"
          v-b-tooltip.hover.bottom="$t('copy_clipboard')"
          v-html="filterForName($t(gameInfo.hero) + '#' + gameInfo.game)"
          @click="copy_link()">
          </li>
          <li class="_placement first-info above">{{ $t('placement') }}: {{ gameInfo.placement }}</li>
          <li class="_back first-info above"><b-button variant="danger" @click="go_back" size="sm">{{ $t('back') }}</b-button></li>
        </ul>

        <ul class="turn-list">
          <li class="turn-item"
          v-for="el in turnCount"
          :key="el">
            <div class="turn-title">Turn {{ el }}</div>
            <div class="bob-image"><img :src="getMinionImgUrl('DALA_BOSS_99h')" alt="Bob Image"/></div>
            <ul class="round-list">
              <li class="round-item"
              v-for="(round, idx) in pop_count('bob', el)"
              :key="idx">
                <ul class="bob-list warning">
                  <li class="bob-item"
                  v-for="(c, cidx) in pop_list('bob', el, idx + 1)"
                  :key="c + el + cidx">
                    <card
                    board_type="bob"
                    :popImageId="el + '_bob_' + cidx"
                    :cardId="c.card_id"
                    :atk="c.atk"
                    :health="c.health"
                    :etc="c.etc"
                    :gold="check_gold(c.card_id)"/>
                  </li>
                </ul>
                <ul class="action-list info">
                  <li class="action-item"
                  v-for="(c, cidx) in pop_list('action', el, idx + 1)"
                  :key="c + el + cidx">
                    <div v-if="c.action_type != 'damaged'">
                      <div :class="['action_type', c.action_type]">{{ $t(c.action_type) }}</div>
                      <card
                      board_type="action"
                      :cardId="c.card_id"
                      :atk="c.atk"
                      :health="c.health"
                      :etc="c.etc"
                      :gold="check_gold(c.card_id)"/>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>

            <ul class="result-list">
              <li class="result-item">
                <ul class="my-list success">
                  <li class="my-image hero-image"><img :src="getMinionImgUrl(gameInfo.hero)" :alt="$t(gameInfo.hero)" /></li>
                  <li class="damaged-result">
                    <div class="result">
                      <div :style="{'background-image': 'url(' + require('@/assets/battle.png') + ')', 'opacity':'0.5'}"></div>
                      <div :style="{'color': (get_damaged(el) > 0 ? '#dc3545' : get_damaged(el) == 0 ? '#333' :'#007bff')}">{{ get_damaged(el) }}</div>
                    </div>
                  </li>
                  <li class="my-item"
                  v-for="(c, cidx) in pop_list('turn', el)"
                  :key="c + el + cidx">
                    <card
                    board_type="turn"
                    :popImageId="el + '_turn_' + cidx"
                    :cardId="c.card_id"
                    :atk="c.atk"
                    :health="c.health"
                    :etc="c.etc"
                    :gold="check_gold(c.card_id)"/>
                  </li>
                </ul>
              </li>
              <li class="result-item">
                <ul class="enemy-list danger">
                  <li class="enemy-image hero-image"><img :src="getMinionImgUrl(pop_enemy(el))" :alt="$t(pop_enemy(el))"/></li>
                  <li class="enemy-item"
                  v-for="(c, cidx) in pop_list('enemy', el)"
                  :key="c + el + cidx">
                    <card
                    board_type="enemy"
                    :popImageId="el + '_enemy_' + cidx"
                    :cardId="c.card_id"
                    :atk="c.atk"
                    :health="c.health"
                    :etc="c.etc"
                    :gold="check_gold(c.card_id)"/>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </b-overlay>
    </div>
    <div class="empty" v-else>
      Not Found Error.
    </div>
  </div>
</template>

<script>
import i18n from '@/plugins/i18n';
import router from '@/router/index';
import common from '@/mixins/common';
import axios from 'axios';

import Card from '@/components/CardWrapper.vue'

export default {
  name: 'game-detail-data2',
  mixins: [common],
  components: { 'card': Card, },
  data: () => {
    return {
      show: true,
      gid: 0,
      gameInfo: [],
      turnCount: 0,
      roundList: [],
      lastBoard: [],
      goldList: [],
      hoverImage: {}
    }
  },
  props: {
    game_id: {
      type: String,
      default: ""
    },
  },
  computed: {
    lang () {
      return i18n.locale;
    }
  },
  mounted () {
    this.get_gold_card_list();
    this.get_game_info();
    this.get_round_info();
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
    async get_game_info () {
      try {
        const json = {
          game_id: this.game_id
        };
        let response = await axios.get('http://battlegroundlab.com/api/game.php' + this.jsonToParam(json));
        
        if (response.data.resultJson.length > 0) {
          this.gameInfo = [];
          this.gameInfo = response.data.resultJson[0];
          this.turnCount = this.gameInfo.turn_count;
        } else {
          this.gameInfo = [];
        }
      } catch(err) {
        console.log(err);
      }
    },
    async get_round_info () {
      try {
        const json = {
          game_id: this.game_id
        };
        let response = await axios.get('http://battlegroundlab.com/api/game_detail2.php' + this.jsonToParam(json));
        if (response.data.resultJson.length > 0) {
          this.roundList = [];
          this.roundList = response.data.resultJson;
          this.show = false;
        } else {
          this.roundList = [];
        }
      } catch(err) {
        console.log(err);
      }
    },
    pop_count (board_type, turn) {
      let arr = this.roundList.filter((el) => {
        return board_type == el.board_type && turn == el.turn;
      });
      arr = arr.map(el => el.idx);
      arr = arr.filter((item, index) => arr.indexOf(item) === index);
      return arr.length;
    },
    pop_enemy (turn) {
      let enemy_hero = this.roundList.filter((el) => {
        return 'enemy' == el.board_type && turn == el.turn && el.card_type == 'HERO';
      });
      return (enemy_hero.length > 0) ? enemy_hero[0].card_id : null;
    },
    get_damaged (turn) {
      let hero_damaged = this.roundList.filter((el) => {
        return 'action' == el.board_type && turn == el.turn && el.action_type == 'damaged';
      });
      return (hero_damaged.length > 0) ? hero_damaged[0].action_value : 0;
    },
    pop_list (board_type, turn, idx = null) {
      if (idx == null && board_type != 'enemy') {
        return this.roundList.filter((el) => {
          return board_type == el.board_type && turn == el.turn;
        });
      } else if (idx == null && board_type == 'enemy') {
        return this.roundList.filter((el) => {
          return board_type == el.board_type && turn == el.turn && el.card_type == 'MINION';
        });
      } else {
        return this.roundList.filter((el) => {
          return board_type == el.board_type && turn == el.turn && idx == el.idx;
        });
      }
    },
    check_gold (cid) {
      return this.goldList.map(el => el.id).includes(cid);
    },
    go_back () {
      router.go(-1);
    },
    filterForName (val) {
      if (val == '') return val;
      const tagMatched = /#/g.exec(val);
      let resultArray = [];
      if (tagMatched != null) {
        const tagIndex = tagMatched.index;
        const tag = val.substr(tagIndex);
        resultArray = [val.substr(0, tagIndex), '<span style="color:#c9c9c9;">', tag , '</span>'];
        val = resultArray.join('');
      }
      return val + ' <i class="fa fa-link fa-rotate-90"></i>';
    },
    copy_link () {
      const el = document.createElement('textarea');
      el.value = this.getBasePath() + 'gameDetail2/' + this.gameInfo.game;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.toast('b-toaster-top-right');
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/common.scss';
.empty {
  height: 830px;
}
.info-wrapper {
  ._hero {
    cursor: pointer;
  }
}
ul.game-info {
  display: flex;
  height: 2em;
  line-height: 2em;
  vertical-align: middle;
  margin: 5px 0;
  li {
    flex: 20% 1 1;
    text-align: center;
    color: #333;
    &._back > * {
      margin-top: -5px;
    }
  }
}

.hero-image {
  max-width: 80px;
  max-height: 80px;
  padding: 2px;
  margin: 5px;
  border-radius: 50%;
  border: 3px solid #c9c9c9;
  overflow: hidden;
  display: flex;
  >img {
    width: 100%;
    height: 100%;
    transform: scale(1.4);
  }
}

ul.turn-list {
  li.turn-item {
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    margin: 100px 0px;
    position: relative;
    &:first-child {
      margin-top: 20px;
    }
    div.turn-title {
      position: absolute;
      top: -1em;
      left: 10px;
      font-size: 0.8em;
      font-weight: bold;
      padding: 2px 5px;
      border-radius: 5px;
      background-color: #eaeaea;
    }
    div.bob-image {
      position: absolute;
      top: -20px;
      left: calc(50% - 45px);
      >img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        border: 3px solid #c9c9c9;
      }
    }
    ul.round-list {
      padding: 10px;
      li.round-item {
        display: flex;
        padding: 10px 0;
        ul.bob-list {
          padding: 5px;
          flex: calc(50% - 5px) 1 1;
          flex-wrap: wrap;
          margin-right: 5px;
          min-height: 80px;
          border-radius: 10px;
          border: 2px solid #ffeeba;
          display: flex;
          justify-content: center;
        }
        ul.action-list {
          padding: 5px;
          flex: calc(50% - 5px) 1 1;
          flex-wrap: wrap;
          margin-left: 5px;
          min-height: 80px;
          border: 2px solid #bee5eb;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          li.action-item {
            max-width: 90px;
            div {
              position: relative;
              div.action_type {
                position: absolute;
                top: 0px;
                width: 60%;
                text-align: center;
                font-size: 0.9em;
                background-color: #fff;
                border-radius: 5px;
                border: 1px solid #c9c9c9;
                opacity: 0.8;
                z-index: 10;
                &.buy { background-color: #0062cc; color: #fff; font-weight: 600; }
                &.sell { background-color: #bd2130; color: #fff; font-weight: 600; }
                &.deck { background-color: #343a40; color: #fff; font-weight: 600; }
                &.lvlup { background-color: #ffc107; color: #fff; font-weight: 600; }
                &.freeze { background-color: #17a2b8; color: #fff; font-weight: 600; }
                &.thaw { background-color: #e2e3e5; color: #333; font-weight: 600; }
              }
            }
          }
        }
        &:not(:last-child) {
          border-bottom: 3px dotted #c9c9c9;
        }
        &:last-child {
          padding-bottom: 0px;
        }
      }
    }
    ul.result-list {
      margin-top: 10px;
      border-top: 3px solid #c9c9c9;
      padding: 10px;
      display: flex;
      li.result-item {
        flex: 50% 1 1;
        margin-bottom: 10px;
        ul.my-list {
          padding: 5px;
          width: calc(100% - 5px);
          min-height: 90px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          justify-content: center;
          border-radius: 10px;
          border: 2px solid #c3e6cb;
          position: relative;
          li.my-image {
            position: absolute;
            top: -40px;
            right: -30px;
            z-index: 100;
          }
          li.damaged-result {
            position: absolute;
            top: 25px;
            right: -25px;
            z-index: 200;
            div.result {
              width: 40px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              font-weight: bold;
              position: relative;
              >div {
                position: absolute;
                top: 0;
                left: 0;
                width: 40px;
                height: 40px;
                font-size: 1.4em;
                background-size: 40px 40px;
                background-repeat: no-repeat;
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10+ and Edge */
                user-select: none; /* Standard syntax */
              }
            }
          }
        }
        ul.enemy-list {
          padding: 5px;
          margin-left: 5px;
          width: calc(100% - 5px);
          min-height: 90px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          justify-content: center;
          border: 2px solid #f5c6cb;
          border-radius: 10px;
          position: relative;
          li.enemy-image {
            position: absolute;
            top: -40px;
            right: -30px;
            z-index: 100;
          }
        }
      }
    }
  }
}
@media (max-width: 1280px) {
  ul.game-info {
    display: flex;
    height: 2em;
    line-height: 2em;
    vertical-align: middle;
    margin: 5px 0;
    li {
      flex: 20% 1 1;
      text-align: center;
      color: #333;
    }
  }
    
  ul.turn-list {
    li.turn-item {
      div.turn-title {
      }
      div.bob-image {
        position: absolute;
        top: -30px;
        left: calc(50% - 35px);
        >img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 3px solid #c9c9c9;
        }
      }
      ul.round-list {
        li.round-item {
          flex-wrap: wrap;
          ul.bob-list {
            margin-right: 0;
            flex: 100% 1 1;
          }
          ul.action-list {
            margin-left: 0;
            flex: 100% 1 1;
            li.action-item {
              div {
                div.action_type {
                }
              }
            }
          }
          &:not(:last-child) {
          }
          &:last-child {
          }
        }
      }
      ul.result-list {
        flex-wrap: wrap;
        li.result-item {
          flex: 100% 1 1;
          ul.my-list {
            width: 100%;
            li.my-image {
              position: absolute;
              top: -40px;
              left: -30px;
              right: inherit;
            }
            li.damaged-result {
              top: 50%;
              left: -10px;
              right: inherit;
              div.result {
                >div {
                }
              }
            }
          }
          ul.enemy-list {
            width: 100%;
            margin-left: 0;
            li.enemy-image {
              position: absolute;
              top: -40px;
              left: -30px;
              right: inherit;
            }
          }
        }
      }
    }
  }
}
</style>