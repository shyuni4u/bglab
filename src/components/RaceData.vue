<template>
  <div class="race-data">
    <div class="chart-wrapper">
      <v-chart class="wide-center" :options="raceOption" :style="{'width': '100%', 'height': '800px'}" />
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts';
import i18n from '@/plugins/i18n';

import 'echarts/lib/chart/sunburst';
import 'echarts/lib/component/grid';
//import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

import common from '@/mixins/common';
import axios from 'axios';

export default {
  name: 'race-data',
  mixins: [common],
  components: {
    'v-chart': ECharts
  },
  props: {
    placement: {
      type: Number,
      default: 9
    },
    startDate: {
      type: Date,
      default: new Date('2020-02-27T00:00:00+09:00')
    },
    endDate: {
      type: Date,
      default: new Date()
    }
  },
  data: () => {
    return {
      raceList: [],
      raceOption: {},
      windowWidth: 0
    }
  },
  computed: {
    playerId () {
      return parseInt(sessionStorage.getItem('playerId'), 10);
    }
  },
  watch: {
    placement () {
      this.get_race_info();
    },
    startDate () {
      this.get_race_info();
    },
    endDate () {
      this.get_race_info();
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize);
    this.get_race_info();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    async get_race_info () {
      try {
        const json = {
          player_id: this.playerId,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate),
          placement: this.placement
        };
        let response = await axios.get('http://battlegroundlab.com/api/race.php' + this.jsonToParam(json));
        if (response.data.resultJson.length > 0) {
          this.raceList = response.data.resultJson;
          this.set_option();
        } else {
          this.raceList = [];
          this.set_option();
        }
      } catch(err) {
        console.log(err);
      }
    },
    set_option () {
      let race_index = -1;
      let datas = [];
      let first_race = '';
      this.raceList.forEach((el) => {
        if (el.race != first_race) {
          datas.push({
            name: i18n.t(el.race),
            itemStyle: { color: this.getRaceColor(el.race) },
            children: [{
              name: i18n.t(el.cid),
              value: el.value,
              itemStyle: { color: this.getRaceColor(el.race) }
            }]
          });
          race_index++;
          first_race = el.race;
        } else {
          datas[race_index].children.push({
            name: i18n.t(el.cid),
            value: el.value,
            itemStyle: { color: this.getRaceColor(el.race) }
          })
        }
      });

      this.raceOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        grid: {
          width: '100%',
          height: 'auto'
        },
        series: {
          type: 'sunburst',
          highlightPolicy: 'ancestor',
          data: datas,
          radius: [0, '95%'],
          sort: null,
          levels: [{}, {
              r0: '15%',
              r: '35%',
              itemStyle: {
                  borderWidth: 2
              },
              label: {
                  rotate: 'tangential'
              }
          },{
            r0: '35%',
            r: '70%',
            label: {
              position: 'outside',
              padding: 3,
              silent: false
            }
          }
          /*
          , {
              r0: '70%',
              r: '72%',
              label: {
                  position: 'outside',
                  padding: 3,
                  silent: false
              },
              itemStyle: {
                  borderWidth: 3
              }
          }
          */
          ]
        }
      }
    },
    onResize () {
      this.windowWidth = window.innerWidth;
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/common.scss';
div.chart-wrapper {
  width: 100%;
  min-height: 800px;
}
@media (max-width: 1280px) {
}
</style>
