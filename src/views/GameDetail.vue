<template>
  <div class="game-detail-data">
    <div v-if="gid != 0" class="info-wrapper">
      <b-overlay :show="show" rounded="sm" z-index="9999">
        <ul class="game-info box">
          <li class="_date first-info above cut-text">{{ gameInfo.dt_now }}</li>
          <li class="_hero first-info above cut-text">{{ $t(gameInfo.hero) }}<span style="color:#c9c9c9;">{{ '#' + gameInfo.game }}</span></li>
          <li class="_placement first-info above">{{ $t('placement') }}: {{ gameInfo.placement }}</li>
          <li class="_back first-info above"><b-button variant="danger" @click="go_back" size="sm">{{ $t('back') }}</b-button></li>
        </ul>

        <ul class="round-list">
          <li
          class="secondary"
          v-for="el in turnCount"
          :key="el">
            <ul class="game-item">
              <li class="turn_no">Turn {{ el }}</li>
              <li class="used_card">
                <div class="board-tag">Used</div>
                <div class="card_wrapper"
                v-for="(c, idx) in pop_card('used', el - 1)"
                :key="c + el + idx"
                :class="'check-power-' + c.card_id + '-' + gameInfo.hero">
                  <div class="gold" v-if="c.is_gold == 1">
                    <img :src="getImgUrl('star')" alt="gold minion"/>
                  </div>
                  <img
                  v-if="c.card_id != 'HeroPower'"
                  :src="getMinionImgUrl(c.card_id)"
                  :thumbnail="getMinionImgUrl('thumbnail')"
                  :alt="$t(c.card_id)"
                  :id="`used-${el}-${idx}`"
                  :title="$t(c.card_id)" />
                  <img
                  v-else
                  :src="getPowerImgUrl(gameInfo.hero)"
                  :thumbnail="getPowerImgUrl('thumbnail')"
                  :alt="$t(c.card_id)"
                  :title="$t(c.card_id)" />
                  <b-popover
                  :target="`used-${el}-${idx}`"
                  triggers="hover focus"
                  :content="`Placement ${c.card_id}`">
                    <img :src="(lang == 'en') ? getCardEnImgUrl(c.card_id) : getCardKrImgUrl(c.card_id)" alt="" />
                  </b-popover>
                </div>
              </li>
              <li class="turn_board">
                <div class="board primary-dark" v-if="el != turnCount">
                  <div class="board-tag">Board</div>
                  <div
                  class="card_wrapper"
                  v-for="(c, idx) in pop_card('board', el)"
                  :key="c + el + idx">
                    <div class="gold" v-if="c.is_gold == 1">
                      <img :src="getImgUrl('star')" alt="gold minion"/>
                    </div>
                    <img
                    :src="getMinionImgUrl(c.card_id)"
                    :thumbnail="getMinionImgUrl('thumbnail')"
                    :alt="$t(c.card_id)"
                    :id="`board-${el}-${idx}`"
                    :title="$t(c.card_id)" />
                    <b-popover
                    :target="`board-${el}-${idx}`"
                    triggers="hover focus"
                    placement="left">
                      <img :src="(lang == 'en') ? getCardEnImgUrl(c.card_id) : getCardKrImgUrl(c.card_id)" alt="" />
                    </b-popover>
                  </div>
                </div>
                <div class="board warning-dark" v-else>
                  <div class="board-tag">Board</div>
                  <div
                  class="card_wrapper"
                  v-for="n in 7"
                  v-show="lastBoard[`minion_${n - 1}`] != null"
                  :key="n">
                    <div class="gold" v-if="check_gold(lastBoard[`minion_${n - 1}`])">
                      <img :src="getImgUrl('star')" alt="gold minion"/>
                    </div>
                    <img
                    :src="getMinionImgUrl(lastBoard[`minion_${n - 1}`])"
                    :thumbnail="getMinionImgUrl('thumbnail')"
                    :alt="$t(lastBoard[`minion_${n - 1}`])"
                    :id="`last-minion_${n - 1}`"
                    :title="$t(lastBoard[`minion_${n - 1}`])" />

                    <b-popover
                    :target="`last-minion_${n - 1}`"
                    :cardid="lastBoard[`minion_${n - 1}`]"
                    triggers="hover focus"
                    placement="left">
                      <img :src="(lang == 'en') ? getCardEnImgUrl(lastBoard[`minion_${n - 1}`]) : getCardKrImgUrl(lastBoard[`minion_${n - 1}`])" alt="" />
                    </b-popover>
                  </div>
                </div>
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

export default {
  name: 'game-detail-data',
  mixins: [common],
  data: () => {
    return {
      show: true,
      gameInfo: [],
      turnCount: 0,
      roundList: [],
      lastBoard: [],
      goldList: [],
      hoverImage: {}
    }
  },
  computed: {
    gid () {
      return parseInt(sessionStorage.getItem('gid'), 10) || 0;
    },
    lang () {
      return i18n.locale;
    }
  },
  mounted () {
    this.get_game_info();
    this.get_round_info();
    this.get_last_board();
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
          game_id: this.gid
        };
        let response = await axios.get('http://battlegroundlab.com/api/game.php' + this.jsonToParam(json));
        
        if (response.data.resultJson.length > 0) {
          this.gameInfo = [];
          this.gameInfo = response.data.resultJson[0];
          this.turnCount = this.gameInfo.turn_count + 1;
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
          game_id: this.gid
        };
        let response = await axios.get('http://battlegroundlab.com/api/game_detail.php' + this.jsonToParam(json));
        if (response.data.resultJson.length > 0) {
          this.roundList = [];
          this.roundList = response.data.resultJson;
        } else {
          this.roundList = [];
        }
      } catch(err) {
        console.log(err);
      }
    },
    async get_last_board () {
      try {
        const json = {
          game_id: this.gid
        };
        let response = await axios.get('http://battlegroundlab.com/api/game.php' + this.jsonToParam(json));
        if (response.data.resultJson.length > 0) {
          this.lastBoard = [];
          this.lastBoard = response.data.resultJson[0];
        } else {
          this.lastBoard = []
        }
      } catch(err) {
        console.log(err);
      }
      this.show = false;
    },
    pop_card (chk, turn) {
      return this.roundList.filter((el) => {
        return chk == el.chk && turn == el.turn
      });
    },
    check_gold (cid) {
      return this.goldList.map(el => el.id).includes(cid);
    },
    go_back () {
      router.go(-1);
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
  position: relative;
  div.hoverImg {
    position: absolute;
    z-index: 2;
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
ul.round-list {
  font-size: 0.9em;
  &>* {
    user-select: none;
  }
  &>li {
    border: 1px solid #c9c9c9;
    padding: 0;
    margin-bottom: 5px;
    ul.game-item {
      display: flex;
      &>li {
        text-align: center;
        vertical-align: middle;
        -ms-flex-item-align: center;
        align-self: center;
        min-height: 100px;
        font-size: 0.9em;
        display: flex;
        &>* {
          vertical-align: middle;
        }
        .card_wrapper {
          max-width: 80px;
          max-height: 80px;
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
      li.turn_no {
        flex: 4% 1 1;
        font-weight: bold;
      }
      li.used_card {
        flex: 46% 0 1;
        flex-wrap: wrap;
        position: relative;
        p.special ~ p.special
        >div.card_wrapper.check-power-HeroPower-TB_BaconShop_HERO_23 {
          display: flex;
        }
        >div.card_wrapper.check-power-HeroPower-TB_BaconShop_HERO_23 ~ div.card_wrapper.check-power-HeroPower-TB_BaconShop_HERO_23 {
          display: none;
        }
        .board-tag {
          position: absolute;
          top: 2px;
          right: 10px;

          z-index: 1;
        }
      }
      li.turn_board {
        flex: 50% 0 0;
        .board {
          display: flex;
          width: 100%;
          margin: 5px;
          border-radius: 10px;
          position: relative;
          .board-tag {
            position: absolute;
            top: 2px;
            right: 10px;
            z-index: 1;
          }
          .card_wrapper {
            border: 3px solid #e5e5e5;
          }
        }
      }
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
  li._minion {
    flex: 50px 0 0;
    margin-right: 3px;
    img {
      max-width: 100%;
      max-height: 95%;
      border-radius: 50%;
      border: 1px solid #c9c9c9;
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
  ul.round-list {
    > li {
      ul.game-item {
        flex-direction: column;
        li {
          min-height: initial;
          width: 100%;
        }
        li.turn_no {
          flex: 100% 1 1;
          font-weight: bold;
        }
        li.used_card {
          flex: 100% 1 1;
        }
        li.turn_board {
          flex: 100% 1 1;
        }
      }
    }
  }
}
</style>