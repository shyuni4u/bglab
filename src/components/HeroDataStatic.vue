<script>
import HeroData from '@/components/HeroData.vue';
import axios from 'axios';

export default {
  name: 'hero-data-static',
  extends: HeroData,
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
      this.get_hero_list();
      this.isBusy = true;
    },
    maxMMR () {
      this.get_hero_list();
      this.isBusy = true;
    },
    startDate () {
      this.get_hero_list();
      this.isBusy = true;
    },
    endDate () {
      this.get_hero_list();
      this.isBusy = true;
    }
  },
  methods: {
    async get_hero_list () {
      try {
        const json = {
          min_mmr: this.minMMR,
          max_mmr: this.maxMMR,
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
        } else {
          this.heroList = [];
          this.isBusy = false;
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>