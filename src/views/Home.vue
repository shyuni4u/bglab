<template>
  <div class="home">
    <div class="contents">
      <div class="search">
        <auto-name class="auto-name"/>
      </div>

      <div class="manual" v-show="isShow">
        <b-button size="sm" @click="close_manual" variant="danger">{{ $t('do_not_open') }}</b-button>
        <manual />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import common from '@/mixins/common';
import AutoName from '@/components/AutoName.vue'
import Manual from '@/components/Manual.vue'


export default {
  name: 'home',
  mixins: [common],
  components: {
    'auto-name': AutoName,
    'manual': Manual
  },
  data: () => {
    return {
      season: {},
      isShow: false
    }
  },
  filters: {
  },
  mounted () {
    if (!this.getCookie('alert_manual')) {
      this.isShow = true;
    }
    this.get_season();
  },
  methods: {
    close_manual () {
      this.setCookie('alert_manual', true, 365);
      this.isShow = false;
    },
    async get_season () {
      try {
        let response = await axios.get('http://battlegroundlab.com/api/season.php');
        if (response.data.resultJson.length > 0) {
          this.season = {};
          this.season = response.data.resultJson[0];
          sessionStorage.setItem('startDate', this.season.start_date || this.getYYYY_MM_DD());
          sessionStorage.setItem('endDate', this.season.end_date || this.getYYYY_MM_DD());
        } else {
          this.season = {};
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.contents {
  margin-top: 5px;
  margin-bottom: 5px;
  min-height: 820px;
  padding-top: 100px;
  text-align: center;
  .search {
    padding: 30px;
    border-radius: 5px;
    background-color: #5383e8;
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .auto-name {
      width: 100%;
    }
  }
  .btn-show {
    text-align: right;
    width: 70%;
    margin: auto;
  }
  .manual {
    >*:first-child {
      margin-top: 50px;
    }
    >* {
      margin-top: 5px;
    }
  }
}

@media (max-width: 1280px) {
  .contents {
    min-height: 100px;
    margin: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
    .search { 
      width: 90%;
    }
  }
}
</style>
