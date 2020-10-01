<script>
import AutoName from '@/components/AutoName.vue'
import router from '@/router/index';

export default {
  name: 'auto-complete-name-self',
  extends: AutoName,
  props: {
    target: {
      type: String,
      required: true
    }
  },
  methods: {
    goStaticById (val) {
      if (val != -1) {
        sessionStorage.setItem('playerId', val);
        if (router.history.current.name == this.target) {
          router.go();
        } else {
          router.push({name:this.target});
        }
      }
    }
  }
}
</script>