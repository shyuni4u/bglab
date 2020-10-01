<template>
  <div class="notice">
    <section class="main-info">
      <div class="box">
        <b-card
        class="mb-2"
        v-for="el in noticeList"
        :key="el.header"
        :title="el.header"
        :sub-title="el.date">
          <b-card-text class="notice-text" v-html="el.content.split('\n').join('<br/>')">
          </b-card-text>

          <b-card-text class="notice-text">{{ el.desc }}</b-card-text>
        </b-card>
      </div>
    </section>
  </div>
</template>

<script>
import i18n from '@/plugins/i18n';
import common from '@/mixins/common';

export default {
  name: 'notice',
  mixins: [common],
  data: () => {
    return {
      noticeList: i18n.t('noticeList')
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.main-info {
  display: flex;
  .box {
    flex: 1280px 1 1;
    border: 1px solid #cdd2d2;
    box-shadow: 0 1px #dcdfdf;
    background: #f2f2f2;
    border-radius: 2px;
    min-height: 800px;
    padding: 10px;
    margin-bottom: 10px;
  }
  .notice-text {
    font-size: 0.8rem;
  }
}

@media screen {
  .for_print {
    display: none;
  }
}
@media print {
  .for_print {
    display: block;
    -webkit-print-color-adjust: exact;
  }
}
</style>