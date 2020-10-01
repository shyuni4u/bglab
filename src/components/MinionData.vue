<template>
  <div class="minion-data">
    <b-table
    v-if="windowWidth >= 1024"
    :items="minionList"
    :fields="minionFields"
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
            : (field.key === 'used_count' || field.key === 'crown_count' || field.key === 'win_count' || field.key === 'avg') ? '120px'
            : (field.key === 'pick_ratio' || field.key === 'crown_ratio' || field.key === 'win_ratio') ? '180px'
            : '210px') }"
        >
      </template>

      <!-- thead template -->
      <template v-slot:head(minion)="data">{{ $t(data.label) }}</template>
      <template v-slot:head(used_count)="data">{{ $t(data.label) }}</template>
      <template v-slot:head(avg)="data">{{ $t(data.label) }}</template>
      <template v-slot:head(crown_count)="data">{{ $t(data.label) }}</template>
      <template v-slot:head(crown_ratio)="data">{{ $t(data.label) }}</template>
      <template v-slot:head(win_count)="data">{{ $t(data.label) }}</template>
      <template v-slot:head(win_ratio)="data">{{ $t(data.label) }}</template>

      <!-- tbody template -->
      <template v-slot:cell(index)="data">
        <span>{{ data.index + 1 }}</span>
      </template>

      <template v-slot:cell(minion)="data">
        <div class="name_wrapper">
          <div class="card_wrapper">
            <img
            :id="data.value"
            :src="getMinionImgUrl(data.value)"
            :alt="data.value"
            :thumbnail="getMinionImgUrl('thumbnail')" />
            
            <b-popover
            :target="data.value"
            triggers="hover focus"
            placement="right">
              <img :src="(lang == 'en') ? getCardEnImgUrl(data.value) : getCardKrImgUrl(data.value)" alt="" />
            </b-popover>
          </div>
          <b class="text-info show-modal">{{ $t(data.value) }} <b-icon-chat class="icon" font-scale="1.2"></b-icon-chat></b>
        </div>
        
        <!--<b class="text-info show-modal" @click="showDetailMinion(data.value)">{{ $t(capitalizeFLetter(data.value)) }} <b-icon-chat class="icon" font-scale="1.2"></b-icon-chat></b>-->
      </template>

      <template v-slot:cell(used_count)="data">
        <span class="text-success">{{ data.value }}</span>
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
    :items="minionList"
    :fields="minionSmallFields"
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
      <template v-slot:head(minion)="data">{{ $t(data.label) }}</template>
      <template v-slot:head(avg)="data">{{ $t(data.label) }}</template>
      <template v-slot:head(crown_ratio)="data">{{ $t(data.label) }}</template>
      <template v-slot:head(win_ratio)="data">{{ $t(data.label) }}</template>

      <!-- tbody template -->
      <template v-slot:cell(index)="data">
        <span>{{ data.index + 1 }}</span>
      </template>

      <template v-slot:cell(minion)="data">
        
        <div class="name_wrapper">
          <div class="card_wrapper">
            <img :src="getMinionImgUrl(data.value)" :alt="data.value" :thumbnail="getMinionImgUrl('thumbnail')" />
          </div>
          <b class="text-info show-modal cut-text">{{ $t(data.value) }} <b-icon-chat class="icon" font-scale="1.2"></b-icon-chat></b>
        </div>
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
    ref="minion-modal"
    size="lg"
    header-class="modal-header-custom"
    header-bg-variant="secondary"
    header-text-variant="white"
    hide-footer
    scrollable
    centered>
      <template v-slot:modal-header>
        <h5><b-icon-info-square class="icon"></b-icon-info-square> {{ minionDetail }}</h5>
      </template>
      <div class="d-block text-center">
        <v-chart class="wide-center" :options="minionPlacement" />
      </div>
    </b-modal>
  </div>
</template>

<script>
//import ECharts from 'vue-echarts';
import i18n from '@/plugins/i18n';
import common from '@/mixins/common';
import axios from 'axios';
//import LogData from '@/json/data_0317.json';

//import 'echarts/lib/chart/pie';
//import 'echarts/lib/component/tooltip';

export default {
  name: 'minion-data',
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
      isBusy: true,
      windowWidth: 0,
      maxMinionRatio: 20,
      maxRatio: 100,
      minionDetail: 'Afk',
      minionList: [],
      minionFields: [
        {
          key: 'index',
          label: '#',
          sortable: false
        },
        
        {
          key: 'minion',
          label: 'minion',
          sortable: false
        },
        {
          key: 'used_count',
          label: 'used_count',
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
      minionSmallFields: [
        {
          key: 'index',
          label: '#',
          sortable: false
        },
        
        {
          key: 'minion',
          label: 'minion',
          sortable: false
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
      minionPlacement: {}   //  detail minion chart option
    }
  },
  computed: {
    playerId () {
      return parseInt(sessionStorage.getItem('playerId'), 10);
    },
    lang () {
      return i18n.locale;
    }
  },
  watch: {
    startDate () {
      this.isBusy = true;
      this.get_minion_list();
    },
    endDate () {
      this.isBusy = true;
      this.get_minion_list();
    }
  },
  mounted () {
    this.get_minion_list();
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    async get_minion_list () {
      try {
        const json = {
          player_id: this.playerId,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate)
        };
        let response = await axios.get('http://battlegroundlab.com/api/minion.php' + this.jsonToParam(json));
        if (response.data.resultJson.length > 0) {
          this.minionList = [];
          //const sum = response.data.resultJson.map(el => el.used_cnt).reduce((a, b) => a + b, 0);
          response.data.resultJson.forEach((el) => {
            const data = {
              minion: el.minion,
              crown_count: el.crown_cnt,
              win_count: el.win_cnt,
              used_count: el.used_cnt,
              crown_ratio: (el.crown_cnt / el.game_cnt * 100),
              win_ratio: (el.win_cnt / el.game_cnt * 100),
              avg: el.minion_avg,
              is_gold: el.is_gold,
              sum: 0
            };
            this.minionList.push(data);
            this.isBusy = false;
          });
          //this.minionList = response.data.resultJson;
        } else {
          this.minionList = [];
          this.isBusy = false;
        }
      } catch(err) {
        console.log(err);
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
  .name_wrapper {
    display: flex;
    margin: -5px 0;
    .card_wrapper {
      max-width: 30px;
      max-height: 30px;
      padding: 2px;
      margin-right: 5px;
      position: relative;
      border-radius: 5px;
      border: 1px solid #777;
      overflow: hidden;
      display: flex;
      >img {
        max-width: 100%;
        max-height: 100%;
        transform: scale(1.7);
      }
    }
    b {
      line-height: 2.2em;
    }
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
  .placement-list {
    font-size: 0.8em;
    .name_wrapper {
      max-width: 110px;
      .card_wrapper {
        min-width: 30px;
      }
    }
  }
}
</style>
