<template>
  <div class="manual">
    <ul class="method">
      <li v-html="$t('manual_1')"></li>
      <li v-html="$t('manual_2')"></li>
      <li><img :src="getManualImgUrl('manual_2')" alt="Manual Image 1"/></li>
      <li v-html="$t('manual_3')"></li>
      <li><img :src="getManualImgUrl('manual_3')" alt="Manual Image 2"/></li>
      <li><img :src="getManualImgUrl('manual_4')" alt="Manual Image 3"/></li>
      <li v-html="$t('manual_4')"></li>
      <li><img :src="getManualImgUrl('manual_5')" alt="Manual Image 4"/></li>
      <li><img :src="getManualImgUrl('manual_6')" alt="Manual Image 5"/></li>
      <li v-html="$t('manual_5')"></li>
      <li><img :src="getManualImgUrl('manual_7')" alt="Manual Image 6"/></li>

      <li v-html="$t('manual_6')"></li>
    </ul>
      
    <b-modal
    ref="manual-modal"
    size="lg"
    title="Update v1.1.0"
    header-bg-variant="secondary"
    header-text-variant="white"
    hide-footer
    scrollable
    centered>
      <div>
        <b-carousel
        id="carousel-1"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;">
          <b-carousel-slide
            :caption="$t('game_caption')"
            :text="$t('game_text')"
            :img-src="getManualImgUrl('game')"
          ></b-carousel-slide>
          <b-carousel-slide
            :caption="$t('player_caption')"
            :text="$t('player_text')"
            :img-src="getManualImgUrl('player')"
          ></b-carousel-slide>
          <b-carousel-slide
            :caption="$t('hero_caption')"
            :text="$t('hero_text')"
            :img-src="getManualImgUrl('hero')"
          ></b-carousel-slide>
          <b-carousel-slide
            :caption="$t('minion_caption')"
            :text="$t('minion_text')"
            :img-src="getManualImgUrl('minion')"
          ></b-carousel-slide>
        </b-carousel>
        <div class="alert danger" show @click="alert_save()" size="sm">{{ $t('do_not_open') }}</div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import common from '@/mixins/common';

export default {
  name: 'manual',
  mixins: [common],
  data: () => {
    return {}
  },
  mounted() {
    //this.deleteCookie('alert_save');
    if (!this.getCookie('alert_update110'))
      this.showModal();
  },
  methods: {
    alert_save() {
      this.setCookie('alert_update110', true, 365);
      this.$refs['manual-modal'].hide()
    },
    showModal () {
      this.$refs['manual-modal'].show();
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/common.scss';
ul.method {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  max-width: 860px;
  margin: auto;
  text-align: left;
  li {
    min-height: 2em;
    font-size: 0.9em;
    img {
      width: 100%;
      margin-bottom: 10px;
      border: 1px solid #c9c9c9;
    }
  }
}
.alert {
  width: 30%;
  font-size: 0.9em;
  text-align: center;
  margin: auto;
  margin-top: 5px;
  padding: 5px;
  cursor: pointer;
}
</style>
