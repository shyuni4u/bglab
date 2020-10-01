<template>
  <div class="auto-complete-name">
    <div class="search-wrapper">
      <input type="text"
      class="search-text"
      v-on:input="nameFilter=$event.target.value"
      :placeholder="$t('player_name')"
      @focus="searchFocus = true"
      @blur="searchFocus = false"
      @keyup="get_filted_list"
      />
      <div class="search-select" v-show="nameFilter != '' && filtedList.length > 0">
        <ul>
          <li
          v-for="(el, idx) of filtedList"
          :key="el.value"
          @click="goStaticById(el.value)"
          :class="idx == nameIndex ? 'selected_name' : ''"
          v-html="$options.filters.filterForName(el.text, nameFilter)"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router/index';
import common from '@/mixins/common';
import axios from 'axios';

export default {
  name: 'auto-complete-name',
  mixins: [common],
  data: () => {
    return {
      nameFilter: '',
      searchFocus: false,
      nameIndex: -1,
      filtedList: [{value: -1, text: '검색 결과를 찾을 수 없습니다.'}]
    }
  },
  filters: {
    filterForName (val, nf) {
      if (nf == '') return val;
      const text = val.toUpperCase();
      const token = nf.toUpperCase();

      let reg = new RegExp(token, 'g');
      let resultMatched = reg.exec(text);
      if (resultMatched != null) {
        const tokenPrev = 0;
        const tokenStart = resultMatched.index;
        const tokenAfter = resultMatched.index + token.length;
        let resultArray = [val.substr(tokenPrev, tokenStart), '<span style="color:red;">', val.substr(tokenStart, token.length), '</span>', val.substr(tokenAfter)];
        let rsText = resultArray.join('');

        const tagMatched = /#/g.exec(rsText);
        if (tagMatched != null) {
          const tagIndex = tagMatched.index;
          const tag = rsText.substr(tagIndex);
          resultArray = [rsText.substr(0, tagIndex), '<span style="color:#c9c9c9;">', tag , '</span>'];
          rsText = resultArray.join('');
        }
        return rsText;
      }
      return val;
    }
  },
  methods: {
    async get_filted_list (event) {
      if (this.nameFilter.length > 0) {
        if (this.filtedList.length > 0
          && (event.key == 'Enter' || event.key == 'ArrowDown' || event.key == 'ArrowUp')) {
          if (event.key == 'Enter') {
            this.nameIndex = (this.nameIndex == -1) ? 0 : this.nameIndex;
            this.goStaticById(this.filtedList[this.nameIndex].value);
          }
          else if (event.key == 'ArrowDown')
            this.nameIndex = (this.nameIndex == this.filtedList.length - 1) ? this.filtedList.length - 1 : ++this.nameIndex;
          else if (event.key == 'ArrowUp')
            this.nameIndex = (this.nameIndex == -1) ? -1 : --this.nameIndex;
        } else {
          this.nameIndex = -1;
          try {
            let response = await axios.get('http://battlegroundlab.com/api/search_player.php?player=' + this.nameFilter);
            if (response.data.resultJson.length > 0) {
              this.filtedList = response.data.resultJson;
            } else {
              this.filtedList = [{value: -1, text: '검색 결과를 찾을 수 없습니다.'}]
            }
          } catch(err) {
            console.log(err);
          }
        }
      } else {
        this.filtedList = [{value: -1, text: ''}]
      }
    },
    goStaticById (val) {
      if (val != -1) {
        sessionStorage.setItem('playerId', val);
        router.push({name:'player'});
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search-wrapper {
  width: 100%;
  .search-text {
    width: 100%;
    padding: 3px 6px;
  }
  .search-select {
    width: calc(100% - 2px);
    margin-left: 1px;
    background-color: #fff;
    position: sticky;
    z-index: 999;
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      li {
        text-align: left;
        padding: 4px 6px;
        font-size: 0.9em;
        &:hover {
          background-color: #e8f5fe;
          cursor: pointer;
        }
        &.selected_name {
          background-color: #e8f5fe;
        }
        span.highlight {
          color: red;
        }
      }
    }
  }
}
</style>
