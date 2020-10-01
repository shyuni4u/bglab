<template>
  <div class="hero-data">
    <div v-if="heroList.length > 0">
      <b-table
      v-if="windowWidth >= 1024"
      :items="heroList"
      :fields="heroFields"
      :busy="isBusy"
      class="placement-list"
      responsive="lg"
      sort-direction="desc"
      head-variant="dark">
        <!-- table busy -->
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>

        <template v-slot:empty="scope">
          <h4>{{ scope.emptyText }}</h4>
        </template>
        <template v-slot:emptyfiltered="scope">
          <h4>{{ scope.emptyFilteredText }}</h4>
        </template>

        <!-- colgroup template -->
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{ width: (field.key === 'index' ? '40px'
              : (field.key === 'pick_count' || field.key === 'crown_count' || field.key === 'win_count' || field.key === 'avg') ? '120px'
              : (field.key === 'pick_ratio' || field.key === 'crown_ratio' || field.key === 'win_ratio') ? '180px'
              : '210px') }"
          >
        </template>

        <!-- thead template -->
        <template v-slot:head(hero)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(pick_count)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(pick_ratio)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(avg)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(crown_count)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(crown_ratio)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(win_count)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(win_ratio)="data">{{ $t(data.label) }}</template>

        <!-- tbody template -->
        <template v-slot:cell(index)="data">
          <span>{{ data.index + 1 }}</span>
        </template>

        <template v-slot:cell(hero)="data">
          <div>
            <img class="img-hero-cell" :src="getHeroImgUrl(data.value)" :alt="data.value" :thumbnail="getHeroImgUrl('thumbnail')" />
            <b class="text-info show-modal">{{ $t(data.value) }} <b-icon-chat class="icon" font-scale="1.2"></b-icon-chat></b>
          </div>
          <!--<b class="text-info show-modal" @click="showDetailHero(data.value)">{{ $t(capitalizeFLetter(data.value)) }} <b-icon-chat class="icon" font-scale="1.2"></b-icon-chat></b>-->
        </template>

        <template v-slot:cell(pick_count)="data">
          <span class="text-success">{{ data.value }}</span>
        </template>

        <template v-slot:cell(pick_ratio)="data">
          <ul class="progress-include-span">
            <li class="progress-in-cell">
              <b-progress class="" :max="maxHeroRatio">
                <b-progress-bar :value="data.value" :variant="(data.value < 5 ? 'secondary' : 'success')"></b-progress-bar>
              </b-progress>
            </li>
            <li class="span-with-progress">
              <span class="cell">{{ data.value | format_number }}%</span>
            </li>
          </ul>
        </template>

        <template v-slot:cell(avg)="data">
          <span :class="(data.value <= 4) ? 'cell above' : 'cell'">{{ data.value | format_number }}</span>
        </template>

        <template v-slot:cell(crown_count)="data">
          <span class="text-warning">{{ data.value }}</span>
        </template>

        <template v-slot:cell(crown_ratio)="data">
          <ul class="progress-include-span">
            <li class="progress-in-cell">
              <b-progress class="" :max="maxRatio">
                <b-progress-bar :value="data.value" variant="warning"></b-progress-bar>
              </b-progress>
            </li>
            <li class="span-with-progress">
              <span class="cell">{{ data.value | format_number }}%</span>
            </li>
          </ul>
        </template>

        <template v-slot:cell(win_count)="data">
          <span class="text-info">{{ data.value }}</span>
        </template>

        <template v-slot:cell(win_ratio)="data">
          <ul class="progress-include-span">
            <li class="progress-in-cell">
              <b-progress class="" :max="maxRatio">
                <b-progress-bar :value="data.value" variant="info"></b-progress-bar>
              </b-progress>
            </li>
            <li class="span-with-progress">
              <span :class="(data.value > 90) ? 'cell above' : 'cell'">{{ data.value | format_number }}%</span>
            </li>
          </ul>
        </template>
      </b-table>

      <b-table
      v-else
      :items="heroList"
      :fields="heroSmallFields"
      class="placement-list"
      responsive="sm"
      sort-direction="desc"
      head-variant="dark">
        <!-- colgroup template -->
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{ width: (field.key === 'index' ? '30px'
              : (field.key === 'avg' || field.key === 'pick_ratio' || field.key === 'crown_ratio' || field.key === 'win_ratio') ? ''
              : '210px') }"
          >
        </template>

        <!-- thead template -->
        <template v-slot:head(hero)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(pick_ratio)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(avg)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(crown_ratio)="data">{{ $t(data.label) }}</template>
        <template v-slot:head(win_ratio)="data">{{ $t(data.label) }}</template>

        <!-- tbody template -->
        <template v-slot:cell(index)="data">
          <span>{{ data.index + 1 }}</span>
        </template>

        <template v-slot:cell(hero)="data">
          <div class="cut-text mobile-hero">
            <b class="text-info show-modal">{{ $t(data.value) }} <b-icon-chat class="icon" font-scale="1.2"></b-icon-chat></b>
          </div>
        </template>

        <template v-slot:cell(pick_ratio)="data">
          <ul class="progress-include-span">
            <li class="span-with-progress">
              <span class="cell">{{ data.value | format_number }}%</span>
            </li>
          </ul>
        </template>

        <template v-slot:cell(avg)="data">
          <span :class="(data.value <= 4) ? 'cell above' : 'cell'">{{ data.value | format_number }}</span>
        </template>

        <template v-slot:cell(crown_ratio)="data">
          <ul class="progress-include-span">
            <li class="span-with-progress">
              <span class="cell">{{ data.value | format_number }}%</span>
            </li>
          </ul>
        </template>

        <template v-slot:cell(win_ratio)="data">
          <ul class="progress-include-span">
            <li class="span-with-progress">
              <span :class="(data.value > 90) ? 'cell above' : 'cell'">{{ data.value | format_number }}%</span>
            </li>
          </ul>
        </template>
      </b-table>
      
      <b-modal
      ref="hero-modal"
      size="lg"
      header-class="modal-header-custom"
      header-bg-variant="secondary"
      header-text-variant="white"
      hide-footer
      scrollable
      centered>
        <template v-slot:modal-header>
          <h5><b-icon-info-square class="icon"></b-icon-info-square> {{ heroDetail }}</h5>
        </template>
        <div class="d-block text-center">
          <v-chart class="wide-center" :options="heroPlacement" />
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
//import ECharts from 'vue-echarts';
//import i18n from '@/plugins/i18n';
import common from '@/mixins/common';
import axios from 'axios';
//import LogData from '@/json/data_0317.json';

//import 'echarts/lib/chart/pie';
//import 'echarts/lib/component/tooltip';

export default {
  name: 'hero-data',
  mixins: [common],
  /*
  components: {
    'v-chart': ECharts
  },
  */
  props: {
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
      isBusy: false,
      emptyResult: '',
      windowWidth: 0,
      maxHeroRatio: 20,
      maxRatio: 100,
      heroDetail: 'Afk',
      heroList: [],
      heroFields: [
        {
          key: 'index',
          label: '#',
          sortable: false
        },
        
        {
          key: 'hero',
          label: 'hero',
          sortable: false
        },
        {
          key: 'pick_count',
          label: 'pick_count',
          sortable: true
        },
        {
          key: 'pick_ratio',
          label: 'pick_ratio',
          sortable: true
        },
        {
          key: 'avg',
          label: 'avg_placement',
          sortable: true
        },
        {
          key: 'crown_count',
          label: 'crown_count',
          sortable: true
        },
        {
          key: 'crown_ratio',
          label: 'crown_ratio',
          sortable: true
        },
        {
          key: 'win_count',
          label: 'win_count',
          sortable: true
        },
        {
          key: 'win_ratio',
          label: 'win_ratio',
          sortable: true
        }
      ],
      heroSmallFields: [
        {
          key: 'index',
          label: '#',
          sortable: false
        },
        
        {
          key: 'hero',
          label: 'hero',
          sortable: false
        },
        {
          key: 'pick_ratio',
          label: 'pick_ratio',
          sortable: true
        },
        {
          key: 'avg',
          label: 'avg_placement',
          sortable: true
        },
        {
          key: 'crown_ratio',
          label: 'crown_ratio',
          sortable: true
        },
        {
          key: 'win_ratio',
          label: 'win_ratio',
          sortable: true
        }
      ],
      heroPlacement: {}   //  detail hero chart option
    }
  },
  computed: {
    playerId () {
      return parseInt(sessionStorage.getItem('playerId'), 10);
    }
  },
  watch: {
    startDate () {
      this.get_hero_list();
      this.isBusy = true;
    },
    endDate () {
      this.get_hero_list();
      this.isBusy = true;
    }
  },
  mounted () {
    this.get_hero_list();
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    async get_hero_list () {
      try {
        const json = {
          player_id: this.playerId,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate)
        };
        let response = await axios.get('http://battlegroundlab.com/api/hero.php' + this.jsonToParam(json));
        if (response.data.resultJson != undefined && response.data.resultJson.length > 0) {
          this.heroList = [];
          const sum = response.data.resultJson.map(el => el.total_cnt).reduce((a, b) => a + b, 0);
          response.data.resultJson.forEach((el) => {
            const data = {
              hero: el.hero,
              crown_count: el.crown_cnt,
              win_count: el.win_cnt,
              pick_count: el.total_cnt,
              crown_ratio: (el.crown_cnt / el.total_cnt * 100),
              win_ratio: (el.win_cnt / el.total_cnt * 100),
              pick_ratio: (el.total_cnt / sum * 100),
              avg: el.hero_avg,
              sum: 0
            };
            this.heroList.push(data);
            this.isBusy = false;
          });
          //this.heroList = response.data.resultJson;
        } else {
          this.heroList = [];
          this.isBusy = false;
        }
      } catch(err) {
        console.log(err);
      }
    },
    /*
    change_filter () {
      //this.load_hero_placement();
    },
    array_filter_log () {
      //  maybe get data from api
      let that = this;
      let arr = this.paramStremers;
      return this.log.filter(function(el) {
        return arr.includes(el.name)
          && (new Date(that.startDate).getTime() <= new Date(el.date).getTime() && new Date(that.endDate).getTime() >= new Date(el.date).getTime());   // include checked members ?
      });
    },
    load_hero_placement () {
      let log_hero_list = this.array_filter_log().map(el => el.hero);
      let arr_hero = log_hero_list.filter(function (hero, index) {  //  remove duplicated hero name
        return log_hero_list.indexOf(hero) === index;
      });
      let chart_data = [];
      arr_hero.forEach((el) => {
        let obj = {
          hero: el,
          crown_count: 0,
          win_count: 0,
          bad_count: 0,
          pick_count: 0,
          win_ratio: 0,
          good_ratio: 0,
          bad_ratio: 0,
          pick_ratio: 0,
          sum: 0,
          avg: 0
        };
        chart_data.push(obj);
      });

      this.array_filter_log().forEach((el) => {
        //arr_hero.indexOf(el.hero): idx of { chart_data[idx] }
        const idx = arr_hero.indexOf(el.hero);
        if (el.placement == 1) {
          chart_data[idx].crown_count++;
        }
        if (el.placement >= 1 && el.placement <= 4) {
          chart_data[idx].win_count++;
        } else {
          chart_data[idx].bad_count++;
        }
        chart_data[idx].pick_count++;
        chart_data[idx].sum += el.placement;
      });
      
      chart_data.forEach((el) => {
        el.win_ratio = (el.crown_count / el.pick_count * 100);
        el.good_ratio = (el.win_count / el.pick_count * 100);
        //el.bad_ratio = (el.bad_count / el.pick_count * 100);
        el.pick_ratio = (el.pick_count / log_hero_list.length * 100);
        el.avg = el.sum / el.pick_count;
      });

      chart_data.sort((el1, el2) => {     //  sort of el.comp
        if (el1.pick_ratio < el2.pick_ratio) return 1;
        else return -1;
      });
      this.heroList = chart_data;
    },
    showDetailHero (param) {
      let arrFilter = this.array_filter_log().filter(el => {
        return el.hero === param;
      });
      let name_datas = this.getChartData(arrFilter, 'name');
      let comp_datas = this.getChartData(arrFilter, 'comp');

      this.heroPlacement = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: i18n.t('player'),
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '50%'],
            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: name_datas
          },
          {
            name: i18n.t('comp'),
            type: 'pie',
            radius: ['65%', '90%'],
            data: comp_datas
          }
        ]
      }
      //this.$refs['hero-modal'].title = i18n.t(this.capitalizeFLetter(param))
      //this.heroDetail = i18n.t(this.capitalizeFLetter(param));
      this.$refs['hero-modal'].show();
    },
    getChartData (arr, mode) {
      //let that = this;
      let log_list = arr.map(el => el[mode]);
      let arr_name = log_list.filter(function (data, index) {  //  remove duplicated data
        return log_list.indexOf(data) === index;
      });
      let result_data = [];
      arr_name.forEach((el) => {
        result_data.push({
          name: i18n.t(el),
          value: 0
        });
      });

      arr.forEach((el) => {
        //arr_hero.indexOf(el.hero): idx of { result_data[idx] }
        const idx = arr_name.indexOf(el[mode]);
        result_data[idx].value++;
      });

      result_data.sort((el1, el2) => {     //  sort datas
        if (el1.value < el2.value) return 1;
        else return -1;
      });
      return result_data;
    },
    */
    onResize () {
      this.windowWidth = window.innerWidth;
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/common.scss';
.show-modal {
  cursor: pointer;
  &:not(:hover) {
    .icon {
      display: none;
    }
  }
  &:focus, &:hover {
    outline: none;
  }
}
.wide-center {
  text-align: center;
  margin: auto;
}
.modal-header-custom {
  h5 {
    .icon {
      font-size: 26px;
    }
  }
}

ul {
  list-style-type: none;
  padding: 0;
}

.placement-list {
  font-size: 0.8em;
  .img-hero-cell {
    width: 30px;
    height: 40px;
    margin: -12px;
  }
  img.img-hero-cell + b {
    padding-left: 20px;
    max-width: 110px;
  }
  ul.progress-include-span {
    display: flex;
    margin-bottom: 0px;
    .progress-in-cell {
      flex: 70% 0 0;
      align-self: center;
    }
    .span-with-progress {
      flex: 30% 0 0;
      text-indent: 5px;
      font-size: 0.9em;
    }
  }
  .cell {
    &.above {
      font-weight: bold;
      color: #3d95e5;
    }
  }
}

@media (max-width: 1280px) {
  .mobile-hero {
    max-width: 65px;
  }
}
</style>
