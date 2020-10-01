<script>
import MinionData from '@/components/MinionData.vue';
import axios from 'axios';

export default {
  name: 'minion-data-static',
  extends: MinionData,
  props: {
    minMMR: {
      type: Number,
      default: 0
    },
    maxMMR: {
      type: Number,
      default: 20000
    },
    startDate: {
      type: Date,
      default: new Date(),
      required: true
    },
    endDate: {
      type: Date,
      default: new Date(),
      required: true
    }
  },
  watch: {
    minMMR () {
      this.get_minion_list();
      this.isBusy = true;
    },
    maxMMR () {
      this.get_minion_list();
      this.isBusy = true;
    },
    startDate () {
      this.get_minion_list();
      this.isBusy = true;
    },
    endDate () {
      this.get_minion_list();
      this.isBusy = true;
    }
  },
  methods: {
    async get_minion_list () {
      try {
        const json = {
          min_mmr: this.minMMR,
          max_mmr: this.maxMMR,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate)
        };
        let response = await axios.get('http://battlegroundlab.com/api/minion.php' + this.jsonToParam(json));
        if (response.data.resultJson != undefined && response.data.resultJson.length > 0) {
          this.minionList = [];
          //const sum = response.data.resultJson.map(el => el.total_cnt).reduce((a, b) => a + b, 0);
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
        } else {
          this.minionList = [];
          this.isBusy = false;
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>