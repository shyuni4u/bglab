<template>
  <div class="hero">
    
    <div class="filter">
      <div class="div-form">
        <div class="filter-form">
          <b-form-datepicker v-model="startDate" size="sm" :locale="locale"></b-form-datepicker>
          ~
          <b-form-datepicker v-model="endDate" size="sm" :locale="locale"></b-form-datepicker>
        </div>
        <div class="player-search">
          <auto-name class="auto-name" target="hero"/>
        </div>
      </div>
    </div>

    <div class="data-component">
      <div class="box hero-wrapper">
        <hero-data
        :startDate="paramStartDate"
        :endDate="paramEndDate"/>
      </div>
    </div>

  </div>
</template>

<script>
//import router from '@/router/index';
//import store from '@/store/index';
import common from '@/mixins/common';
//import axios from 'axios';
import i18n from '@/plugins/i18n';
import AutoNameSelf from '@/components/AutoNameSelf.vue'
import HeroData from '@/components/HeroData.vue'
//import MiniHero from '@/components/MiniHeroData.vue'

export default {
  name: 'hero',
  mixins: [common],
  components: {
    'auto-name': AutoNameSelf,
    'hero-data': HeroData
  },
  data: () => {
    return {
      startDate: new Date('2020-03-19T00:00:00+09:00'),
      endDate: new Date(),
      userInfo: {}
    }
  },
  computed: {
    playerId () {
      return parseInt(sessionStorage.getItem('playerId'), 10);
    },
    paramStartDate () {
      return new Date(this.startDate);
    },
    paramEndDate () {
      return new Date(this.endDate);
    },
    locale () {
      return i18n.locale
    }
  },
  mounted() {
    this.startDate = (sessionStorage.getItem('startDate') || this.startDate);
    this.endDate = (sessionStorage.getItem('endDate') || this.endDate);
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/common.scss';
div.filter {
  margin: 0px;
  margin-top: 5px;
  background-color: #333;
  font-size: 0.9rem;
  display: flex;
  .div-form {
    flex: 100% 1 1;
    display: flex;
    .filter-form {
      padding: 10px;
      display: flex;
      flex: 36% 1 1;
    }
    .player-search {
      padding: 10px;
      flex: 64% 1 1;
      position: relative;
      .auto-name {
        max-width: 600px;
        position: absolute;
        width: 50%;
        right: 10px;
      }
    }
  }
}
div.data-component {
  display: flex;
  margin: 5px 0px;
  div.hero-wrapper {
    flex: 100% 1 1;
  }
}

@media (max-width: 1280px) {
  div.filter {
    .div-form {
      flex-direction: column;
      .filter-form {
        flex: 100% 1 1;
      }
      .player-search {
        flex: 100% 1 1;
        position: initial;
        .auto-name {
          width: 100%;
          position: initial;
        }
      }
    }
  }
  div.data-component {
    flex-direction: column;
  }
}
</style>
