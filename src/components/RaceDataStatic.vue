<script>
import RaceData from '@/components/RaceData.vue';
import axios from 'axios';

export default {
  name: 'race-data-static',
  extends: RaceData,
  props: {
    placement: {
      type: Number,
      default: 9
    },
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
    placement () {
      this.get_race_info();
    },
    minMMR () {
      this.get_race_info();
    },
    maxMMR () {
      this.get_race_info();
    },
    startDate () {
      this.get_race_info();
    },
    endDate () {
      this.get_race_info();
    }
  },
  methods: {
    async get_race_info () {
      try {
        const json = {
          min_mmr: this.minMMR,
          max_mmr: this.maxMMR,
          start_date: this.getYYYY_MM_DD(this.startDate),
          end_date: this.getYYYY_MM_DD(this.endDate),
          placement: this.placement
        };
        let response = await axios.get('http://battlegroundlab.com/api/race.php' + this.jsonToParam(json));
        if (response.data.resultJson != undefined && response.data.resultJson.length > 0) {
          this.raceList = response.data.resultJson;
          this.set_option();
        } else {
          this.raceList = [];
          this.set_option();
          this.emptyResult = 'Not Found';
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>