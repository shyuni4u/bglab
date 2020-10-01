<template>
  <div class="direct_player">
    <div class="not-found">
      {{ searchName }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index';
import common from '@/mixins/common';

export default {
  name: 'direct_player',
  mixins: [common],
  data: () => {
    return {
      season: {},
      searchName: null
    }
  },
  filters: {
  },
  mounted () {
    this.searchName = this.$route.params.player_id + this.$route.hash;
    this.get_season();
    this.get_filted_list();
  },
  methods: {
    async get_filted_list () {
      try {
        let response = await axios.get('http://battlegroundlab.com/api/search_player.php?player=' + this.searchName);
        if (response.data.resultJson.length > 0) {
          sessionStorage.setItem('playerId', response.data.resultJson[0].value);
          router.push({name:'player'});
        } else {
          this.searchName = '검색 결과를 찾을 수 없습니다.';
        }
      } catch(err) {
        console.log(err);
      }
    },
    async get_season () {
      try {
        let response = await axios.get('http://battlegroundlab.com/api/season.php');
        this.season = {};
        if (response.data.resultJson.length > 0) {
          this.season = response.data.resultJson[0];
          sessionStorage.setItem('startDate', this.season.start_date || this.getYYYY_MM_DD());
          sessionStorage.setItem('endDate', this.season.end_date || this.getYYYY_MM_DD());
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.not-found {
  margin-top: 5px;
  margin-bottom: 5px;
  min-height: 820px;
  padding-top: 100px;
  text-align: center;
}
</style>
