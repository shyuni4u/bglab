<template>
  <div class="manual">
    <div class="contents">
      <detail-manual />
    </div>
  </div>
</template>

<script>
import DetailManual from '@/components/Manual.vue'
import common from '@/mixins/common';

export default {
  name: 'manual',
  mixins: [common],
  components: {
    'detail-manual': DetailManual
  }
}
</script>

<style scoped lang="scss">
.contents {
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
}

@media (max-width: 1280px) {
  .contents {
    margin: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
