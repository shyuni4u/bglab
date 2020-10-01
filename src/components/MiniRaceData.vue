<template>
  <div class="mini-race-data">
    <div class="box-header race-title">{{ $t('race_chart') }}</div>
    <ul class="race-list">
      <li class="_chart">
        <v-chart class="wide-center" :options="raceOption" style="max-width:300px;max-height:250px;" />
      </li>
      <li class="li-more" @click="move_race_page">
        {{ $t('more') }}
      </li>
    </ul>
  </div>
</template>

<script>
import ECharts from 'vue-echarts';
import i18n from '@/plugins/i18n';

import 'echarts/lib/chart/pie';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

import router from '@/router/index';
import common from '@/mixins/common';
import axios from 'axios';

export default {
  name: 'mini-race-data',
  mixins: [common],
  components: {
    'v-chart': ECharts
  },
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
    }
  },
  data: () => {
    return {
      raceList: [],
      raceOption: {}
    }
  },
  watch: {
    startDate () {
      this.get_race_list();
    },
    endDate () {
      this.get_race_list();
    }
  },
  mounted () {
    this.get_race_list();
  },
  methods: {
    async get_race_list () {
      try {
        const json = {
          player_id: this.playerId,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate),
          size: 'mini'
        };
        let response = await axios.get('http://battlegroundlab.com/api/race.php' + this.jsonToParam(json));
        if (response.data.resultJson != undefined && response.data.resultJson.length > 0) {
          this.raceList = response.data.resultJson;
          this.set_option();
        } else {
          this.raceList = [];
        }
      } catch(err) {
        console.log(err);
      }
    },
    set_option () {
      this.raceList.filter((el) => {
        el.color = this.getRaceColor(el.name);
        el.name = i18n.t(el.name);
      });
      this.raceOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        color: this.raceList.map((el) => el.color),
        grid: {
          width: '300px',
          height: '250px'
        },
        legend: {
          orient: 'vertical',
          right: 0,
          data: this.raceList.map((el) => el.name)
        },
        series: [
          {
            name: i18n.t('race'),
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.raceList
          }
        ]
      }
    },
    move_race_page () {
      sessionStorage.setItem('startDate', this.getYYYY_MM_DD(this.startDate));
      sessionStorage.setItem('endDate', this.getYYYY_MM_DD(this.endDate));
      router.push({name:'race'});
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/common.scss';
div.race-title {
  border-bottom: 1px solid #c9c9c9;
}
ul.race-list {
  font-size: 0.9em;
  li {
    border-bottom: 1px solid #c9c9c9;
    &._chart {
      .wide-cente {

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
@media (max-width: 1280px) {
  ul.race-list {
    font-size: 0.9em;
    li {
      border-bottom: 1px solid #c9c9c9;
      &._chart {
        .wide-cente {
          max-width: 100% !important;
        }
      }
    }
  }
}
</style>
