<template>
  <div class="static">

    <div class="filter">
      <div class="div-form">
        <b-form class="filter-form">
          <ul class="filter-list">
            <li class="mmr-form">
              <b-form-group :label="$t('mmr')">
                <b-form-radio-group
                v-model="mmr_selected"
                :options="mmr_options"
                name="mmr-options-slots"
                stacked>
                </b-form-radio-group>
              </b-form-group>
            </li>
            <li class="date-form">
              <b-form-group :label="$t('date')">
                <b-form-radio-group
                v-model="date_selected"
                :options="date_options"
                name="date-options-slots"
                stacked>
                </b-form-radio-group>
              </b-form-group>
            </li>
            <!--
            <li class="plc-form" v-show="tabIndex == 0">
              <b-form-group :label="$t('race')">
                <b-form-radio-group
                v-model="plc_selected"
                :options="plc_options"
                name="plc-options-slots"
                stacked>
                </b-form-radio-group>
              </b-form-group>
            </li>
            -->
          </ul>
        </b-form>
      </div>
    </div>

    <div class="data-component">
      <div class="box">
        <b-tabs card>
          <!--
          <b-tab :title="$t('race')" no-body active @click="tabIndex = 0">
            <race-data
            :placement="plc_selected"
            :minMMR="paramMinMMR"
            :maxMMR="paramMaxMMR"
            :startDate="paramStartDate"
            :endDate="paramEndDate"/>
          </b-tab>
          -->

          <b-tab :title="$t('hero')" no-body active @click="tabIndex = 1">
            <hero-data
            :minMMR="paramMinMMR"
            :maxMMR="paramMaxMMR"
            :startDate="paramStartDate"
            :endDate="paramEndDate"/>
          </b-tab>

          <b-tab :title="$t('minion')" no-body @click="tabIndex = 2">
            <minion-data
            :minMMR="paramMinMMR"
            :maxMMR="paramMaxMMR"
            :startDate="paramStartDate"
            :endDate="paramEndDate"/>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    
    <!-- <b-alert
      v-model="showBottom"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger"
      dismissible>
      {{ $t('millhouse_warning') }}
    </b-alert> -->

  </div>
</template>

<script>
import i18n from '@/plugins/i18n';

import HeroDataStatic from '@/components/HeroDataStatic.vue'
import MinionDataStatic from '@/components/MinionDataStatic.vue'
//import RaceDataStatic from '@/components/RaceDataStatic.vue'

import common from '@/mixins/common';

export default {
  name: 'static',
  mixins: [common],
  components: {
    'hero-data': HeroDataStatic,
    'minion-data': MinionDataStatic
    //'race-data': RaceDataStatic
  },
  data: () => {
    var today = new Date();
    return {
      tabIndex: 0,
      // showBottom: true,
      mmr_selected: 0,
      mmr_options: [
        { text: i18n.t('total'), min: 1, max: 20000, value: 0 },
        { text: '11000 ~ ', min: 11000, max: 20000, value: 1 },
        { text: '9000 ~ 11000', min: 9000, max: 11000, value: 2 },
        { text: '6000 ~ 9000', min: 6000, max: 9000, value: 3 },
        { text: ' ~ 6000', min: 1, max: 6000, value: 4 }
      ],
      date_selected: 1,
      date_options: [
        { text: i18n.t('last_month'), start: new Date().setMonth(today.getMonth() - 1), end: today, value: 0 },
        { text: i18n.t('last_week'), start: new Date().setDate(today.getDate() - 7), end: today, value: 1 },
        { text: i18n.t('today'), start: today, end: today, value: 2 }
      ],
      plc_selected: 9,
      plc_options: [
        { text: i18n.t('total'), value: 9 },
        { text: i18n.t('win'), value: 5 },
        { text: i18n.t('crown'), value: 2 }
      ]
    }
  },
  computed: {
    paramMinMMR () {
      return this.mmr_options[this.mmr_selected].min;
    },
    paramMaxMMR () {
      return this.mmr_options[this.mmr_selected].max;
    },
    paramStartDate () {
      return new Date(this.date_options[this.date_selected].start);
    },
    paramEndDate () {
      return new Date(this.date_options[this.date_selected].end);
    },
  },
  created () {
    this.clearPlayerId();
  },
  methods: {
    clearPlayerId () {
      sessionStorage.setItem('playerId', null)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/common.scss';
div.filter {
  margin: 0px;
  background-color: #333;
  color: #fff;
  font-size: 0.9rem;
  display: flex;
  .div-form {
    flex: 100% 1 1;
    padding: 10px 0px;
    margin: 0;
    ul.filter-list {
      display: flex;
      li {
        flex: 20% 1 1;
        padding: 0px 20px;
        border-right: 1px solid #e5e5e5;
        &.mmr-form, &.date-form, &.plc-form {
          flex: 200px 0 1;
        }
        &:last-child {
          border-right: 0px;
        }
      }
    }
  }
}
@media (max-width: 1280px) {
  div.filter {
    .div-form {
      padding: 0px;
      ul.filter-list {
        flex-direction: column;
        li {
          flex: 90% 1 1;
          padding: 0px 20px;
          border-right: 0px;
          border-bottom: 1px solid #e5e5e5;
          &.mmr-form, &.date-form, &.plc-form {
            padding-left: 40px;
            flex: 90% 1 1;
          }
          &:last-child {
            border-bottom: 0px;
          }
        }
      }
    }
  }
  div.data-component {
    .box {
      padding: 0px;
    }
  }
}
</style>
