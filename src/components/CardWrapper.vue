<template>
  <div class="card-wrapper">
    <div class="wrapper">
      <div class="divine option" v-if="hasEtc('divine')">
        <!--<img :src="require('@/assets/divine.png')" alt="Divine shield"/>-->
      </div>
      <div class="reborn option" v-if="hasEtc('reborn')">
        <img :src="require('@/assets/reborn_img.png')" alt="Reborn"/>
      </div>
      <div class="taunt option" v-if="hasEtc('taunt')">
        <img :src="require('@/assets/taunt_img.png')" alt="Taunt"/>
      </div>
      <div class="image">
        <div class="gold" v-if="gold">
          <img :src="getImgUrl('star')" alt="gold minion"/>
        </div>
        <img
        v-if="popImageId == null"
        :src="getMinionImgUrl(cardId)"
        :thumbnail="getMinionImgUrl('thumbnail')"
        :title="$t(cardId)"
        :alt="$t(cardId)"/>
        <img
        v-else
        :src="getMinionImgUrl(cardId)"
        :thumbnail="getMinionImgUrl('thumbnail')"
        :id="`popover-${popImageId}`"
        :title="$t(cardId)"
        :alt="$t(cardId)"/>

        <b-popover
        v-if="popImageId != null"
        :target="`popover-${popImageId}`"
        triggers="hover focus">
          <img :src="(lang == 'en') ? getCardEnImgUrl(cardId) : getCardKrImgUrl(cardId)" :title="$t(cardId)" :alt="$t(cardId)" />
        </b-popover>
      </div>
      <div v-if="!(board_type == 'none' || board_type == 'action')" class="atk" :style="{'background-image': 'url(' + require('@/assets/atk.png') + ')'}">{{ atk }}</div>
      <div v-if="!(board_type == 'none' || board_type == 'action')" class="health" :style="{'background-image': 'url(' + require('@/assets/health.png') + ')'}">{{ health }}</div>
      <div v-if="!(board_type == 'none' || board_type == 'action')" class="etc">
        <!-- <img v-if="hasEtc('divine')" :src="require('@/assets/divine.png')" alt="Divine shield"/> -->
        <!-- <img v-if="hasEtc('reborn')" :src="require('@/assets/reborn.png')" alt="Reborn"/> -->
        <!-- <img v-if="hasEtc('taunt')" :src="require('@/assets/taunt.png')" alt="Tanut"/> -->
        <img v-if="hasEtc('poisonous')" :src="require('@/assets/poisonous.png')" alt="Poisonous"/>
        <img v-if="hasEtc('deathrattle')" :src="require('@/assets/deathrattle.png')" alt="Deathrattle"/>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@/plugins/i18n';
import common from '@/mixins/common';

export default {
  name: 'card-wrapper',
  mixins: [common],
  props: {
    popImageId: {
      type: String,
      default: null
    },
    cardId: {
      type: String,
      required: true
    },
    board_type: {
      type: String,
      default: 'none'
    },
    atk: {
      type: Number,
      default: 0
    },
    health: {
      type: Number,
      default: 0
    },
    etc: {
      type: String,
      default: null
    },
    gold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lang () {
      return i18n.locale;
    }
  },
  methods: {
    hasEtc (el) {
      if(typeof(this.etc) == 'string')
        return this.etc.indexOf(el) > -1;
      else 
        return false;
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  display: flex;
  min-width: 80px;
  max-height: 80px;
  max-width: 80px;
  max-height: 80px;
  .image {
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
      width: 100%;
      height: 100%;
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
  div.option {
    position: absolute;
    top: -3px;
    left: 2px;
    width: 76px;
    height: 86px;
    z-index: 3;
  }
  div.divine {
    border-radius: 50%;
    border: 2px solid #fff33d;
    background-color: rgba(255, 255, 96, 0.3);
  }
  div.reborn {
    border-radius: 50%;
    border: 1px solid #00F8F5;
    >img {
      max-width: 100%;
      height: 100%;
    }
  }
  div.option.taunt {
    top: -3px;
    left: 2px;
    width: 76px;
    height: 86px;
    /*
    top: -15px;
    left: -20px;
    width: 118px;
    height: 110px;
    */
    z-index: 0;
    opacity: 0.9;
    >img {
      max-width: 100%;
      height: 100%;
    }
  }
  div.atk {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 30px;
    height: 30px;
    line-height: 35px;
    color: #fff;
    font-size: 0.9em;
    font-weight: bold;
    text-align: center;
    /*
    border: 1px solid #333;
    background-color: #fff33d;
    border-radius: 50%;
    */
    background-repeat: no-repeat;
    background-position: -2px 0px;
    background-size: 30px 30px;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10+ and Edge */
    user-select: none; /* Standard syntax */
    z-index: 4;
  }
  div.health {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 30px;
    height: 30px;
    line-height: 35px;
    color: #fff;
    font-weight: bold;
    font-size: 0.9em;
    text-align: center;
    background-repeat: no-repeat;
    background-size: 30px 30px;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10+ and Edge */
    user-select: none; /* Standard syntax */
    z-index: 4;
  }
  div.etc {
    position: absolute;
    /* top: -6px; */
    bottom: -3px;
    width: 100%;
    height: 20px;
    line-height: 18px;
    font-size: 0.9em;
    /* border: 1px solid #333; */
    text-align: center;
    z-index: 4;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
