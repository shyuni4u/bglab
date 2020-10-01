<template>
  <div class="player">
    
    <div class="filter">
      <div class="div-form">
        <div class="filter-form">
          <b-form-datepicker v-model="startDate" size="sm" :locale="locale"></b-form-datepicker>
          ~
          <b-form-datepicker v-model="endDate" size="sm" :locale="locale"></b-form-datepicker>
        </div>
        <div class="season-form">
          <b-dropdown size="sm" :text="$t('version')" variant="outline-info">
            <b-dropdown-item
            v-for="el in season"
            :key="el.sname"
            @click="changeDate(el.start_date, el.end_date)">{{ el.sname }}</b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="player-search">
          <auto-name class="auto-name" target="player"/>
        </div>
      </div>
    </div>

    <div class="data-component">
      
      <section class="sub-section">

        <div class="box hero-top5">
          <mini-hero
          :playerId="playerId"
          :startDate="paramStartDate"
          :endDate="paramEndDate"/>
        </div>

        <div class="box race-chart">
          <mini-race
          :playerId="playerId"
          :startDate="paramStartDate"
          :endDate="paramEndDate"/>
        </div>

        <div class="box minion-top10">
          <mini-minion
          :playerId="playerId"
          :startDate="paramStartDate"
          :endDate="paramEndDate"/>
        </div>

      </section>
      
      <section class="main-section">
        <div class="box user-info">
          <mini-player
          :playerId="playerId"
          :startDate="paramStartDate"
          :endDate="paramEndDate"/>
        </div>

        <div class="box play-log">
          <game
          :playerId="playerId"
          :startDate="paramStartDate"
          :endDate="paramEndDate"/>
        </div>
      </section>

    </div>

  </div>
</template>

<script>
//import router from '@/router/index';
//import store from '@/store/index';
import axios from 'axios';
import i18n from '@/plugins/i18n';
import common from '@/mixins/common';
import AutoNameSelf from '@/components/AutoNameSelf.vue'
import MiniHero from '@/components/MiniHeroData.vue'
import MiniRace from '@/components/MiniRaceData.vue'
import MiniMinion from '@/components/MiniMinionData.vue'
import MiniPlayer from '@/components/MiniPlayerData.vue'
import Game from '@/components/GameData.vue'

export default {
  name: 'player',
  mixins: [common],
  components: {
    'auto-name': AutoNameSelf,
    'mini-hero': MiniHero,
    'mini-race': MiniRace,
    'mini-minion': MiniMinion,
    'mini-player': MiniPlayer,
    'game': Game
  },
  data: () => {
    return {
      season: {},
      startDate: null,
      endDate: null
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
  watch: {
    startDate () {
      sessionStorage.setItem('startDate', this.getYYYY_MM_DD(this.startDate));
    },
    endDate () {
      sessionStorage.setItem('endDate', this.getYYYY_MM_DD(this.endDate));
    }
  },
  created() {
    this.startDate = (sessionStorage.getItem('startDate') || this.startDate);
    this.endDate = (sessionStorage.getItem('endDate') || this.endDate);
  },
  mounted() {
    this.get_user_info();
    this.get_season();
  },
  methods: {
    get_user_info () {
      sessionStorage.setItem('startDate', this.getYYYY_MM_DD(this.startDate));
      sessionStorage.setItem('endDate', this.getYYYY_MM_DD(this.endDate));
    },
    async get_season () {
      try {
        let response = await axios.get('http://battlegroundlab.com/api/season.php');
        this.season = {};
        if (response.data.resultJson.length > 0) {
          this.season = response.data.resultJson;
        }
      } catch(err) {
        console.log(err);
      }
    },
    changeDate (start, end) {
      this.startDate = start;
      this.endDate = end || this.getYYYY_MM_DD();
    }
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
    .season-form {
      padding: 10px;
      flex: 10% 1 1;
    }
    .player-search {
      padding: 10px;
      flex: 44% 1 1;
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
  section.sub-section {
    flex: 25% 1 1;
    .hero-top5 {
      margin-bottom: 5px;
    }
    .race-chart {
    }
    .minion-top10 {
    }
  }
  section.main-section {
    margin-left: 5px;
    flex: 75% 1 1;
    .user-info {
      margin-bottom: 5px;
    }
    .play-log {

    }
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
    section.sub-section {
      margin-bottom: 5px;
      flex: 100% 1 1;
      .hero-top5 {
        margin-bottom: 5px;
      }
      .minion-top10 {
      }
    }
    section.main-section {
      margin-left: 0px;
      flex: 100% 1 1;
      .user-info {
        margin-bottom: 5px;
      }
      .play-log {

      }
    }
  }
}
</style>
