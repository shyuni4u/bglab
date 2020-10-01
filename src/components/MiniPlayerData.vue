<template>
  <div class="mini-player-data">
    <ul class="player-list">
      <li class="li-progress first-info above">
        <b-progress :max="playerInfo.cnt" height="1.8rem">
          <b-progress-bar :value="playerInfo.crown" variant="warning">
            {{ $t('crown') }} : {{ playerInfo.crown }}
          </b-progress-bar>
          <b-progress-bar :value="playerInfo.win - playerInfo.crown" variant="primary">
            {{ $t('win') }} : {{ playerInfo.win - playerInfo.crown }}
          </b-progress-bar>
          <b-progress-bar :value="playerInfo.cnt - playerInfo.win" variant="danger">
            {{ $t('defeat') }} : {{ playerInfo.cnt - playerInfo.win }}
          </b-progress-bar>
        </b-progress>
      </li>
      <li
      class="li-pname first-info above"
      v-b-tooltip.hover.bottom="$t('copy_clipboard')"
      v-html="filterForName(playerInfo.pname)"
      @click="copy_link()"></li>
      <li class="li-avg first-info above"><span class="sm-hide">{{ $t('avg') }} {{ $t('placement') }} : </span>{{ playerInfo.avg | format_number }}</li>
    </ul>
  </div>
</template>

<script>
import common from '@/mixins/common';
import axios from 'axios';

export default {
  name: 'mini-player-data',
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
      default: 20
    }
  },
  data: () => {
    return {
      playerInfo: {}
    }
  },
  watch: {
    startDate () {
      this.get_player_info();
    },
    endDate () {
      this.get_player_info();
    }
  },
  mounted () {
    this.get_player_info();
  },
  methods: {
    async get_player_info () {
      try {
        const json = {
          player_id: this.playerId,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate),
          limit_size: this.limitSize
        };
        let response = await axios.get('http://battlegroundlab.com/api/player.php' + this.jsonToParam(json));
        if (response.data.resultJson.length > 0) {
          this.playerInfo = response.data.resultJson[0];
        } else {
          this.playerInfo = {}
        }
      } catch(err) {
        console.log(err);
      }
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
      el.value = this.getBasePath() + 'direct/player/' + this.playerInfo.pname;
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
ul.player-list {
  display: flex;
  font-size: 0.9em;
  li {
    /* height: 70px; */
    &:not(:last-child) {
      border-right: 1px solid #c9c9c9;
    }
    padding: 0 5px;
    text-align: center;
    vertical-align: middle;
    align-self: center;
  }
  li.li-progress {
    flex: 50% 1 1;
  }
  li.li-pname {
    cursor: pointer;
    flex: 50px 1 1;
  }
  li.li-avg {
    flex: 50px 1 1;
  }
}
@media (max-width: 1280px) {
}
</style>
