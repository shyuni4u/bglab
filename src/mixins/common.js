export default {
  filters: {
    format_number (val) {
      if (typeof(val) == 'number' && val % 1 === 0) return val;
      return parseFloat(val).toFixed(2);
    },
    capitalizeFLetter (str) {
      if (typeof(str) != 'string') return str;
      return str[0].toUpperCase() + str.slice(1);
    },
    filterForName (val) {
      if (val == '') return val;
      const tagMatched = /#/g.exec(val);
      let resultArray = [];
      if (tagMatched != null) {
        const tagIndex = tagMatched.index;
        const tag = val.substr(tagIndex);
        resultArray = [val.substr(0, tagIndex), '<span style="color:#c9c9c9;">', tag , '</span>'];
        val = resultArray.join('');
      }
      return val;
    }
  },
  methods: {
    /********************* util start *********************/
    getBasePath () {
      return 'http://battlegroundlab.com/';
    },
    getSitemap (routes) {
      let list = [];
      routes.filter((el) => {
        let url = '<url><loc>';
        url += this.getBasePath().substr(0, this.getBasePath().length - 1) + el.path;
        url += '</loc></url>';
        if (url.indexOf('/:') == -1 && url.indexOf('*') == -1)  list.push(url);
      });
      const sitemap = list.join('\r\n');
      return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        ${sitemap}
      </urlset>`;
    },
    load_adfit () {
      let scriptEl = document.createElement('script');
      scriptEl.setAttribute('src', '//t1.daumcdn.net/kas/static/ba.min.js');
      scriptEl.async = true;
      document.head.appendChild(scriptEl);
      document.body.appendChild(scriptEl);
    },
    jsonToParam (json) {
      let rs = [];
      for (let key in json) {
        rs.push(key + '=' + json[key]);
      }
      return '?' + rs.join('&');
    },
    getYYYY_MM_DD (obj = new Date()) {
      if (typeof(obj) == 'string') return obj;
      if (obj == null) obj = new Date();
      let mm = obj.getMonth() + 1;
      let dd = obj.getDate();

      return [obj.getFullYear(),
          (mm > 9 ? '' : '0') + mm,
          (dd > 9 ? '' : '0') + dd
        ].join('-');
    },
    getImgUrl (path) {
      let image = require.context('@/assets/', false, /\.png$/);
      try {
        return image('./' + path + '.png');
      } catch {
        return null;
      }
    },
    getManualImgUrl (path) {
      let image = require.context('@/assets/manual/', false, /\.png$/);
      try {
        return image('./' + path + '.png');
      } catch {
        return null;
      }
    },
    getCardImgUrl (path, type = 'en') {
      let image = require.context('@/assets/card/' + type + '/', false, /\.png$/);
      try {
        return image('./' + path + '.png');
      } catch {
        return null;
      }
    },
    getCardEnImgUrl (path) {
      let image = require.context('@/assets/card/en/', false, /\.png$/);
      try {
        return image('./' + path + '.png');
      } catch {
        return null;
      }
    },
    getCardKrImgUrl (path) {
      let image = require.context('@/assets/card/kr/', false, /\.png$/);
      try {
        return image('./' + path + '.png');
      } catch {
        return null;
      }
    },
    getPowerImgUrl (path) {
      let image = require.context('@/assets/power/', false, /\.png$/);
      try {
        return image('./' + path + '.png');
      } catch {
        return null;
      }
    },
    getHeroImgUrl (path) {
      let image = require.context('@/assets/hero/', false, /\.png$/);
      try {
        return image('./' + path + '.png');
      } catch {
        return null;
      }
    },
    getMinionImgUrl (path) {
      let image = require.context('@/assets/minion/', false, /\.jpg$/);
      try {
        return image('./' + path + '.jpg');
      } catch {
        return null;
      }
      //return `https://art.hearthstonejson.com/v1/256x/${path}.jpg`;
    },
    toast (toaster, append = false) {
      this.$bvToast.toast(`Link copied.`, {
        title: `Message`,
        variant: `danger`,
        toaster: toaster,
        solid: true,
        appendToast: append
      })
    },
    setCookie (name, value, exp) {
      let date = new Date();
      date.setTime(date.getTime() + exp*24*60*60*1000);
      document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    },
    getCookie (name) {
      const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return value? value[2] : null;
    },
    setCookieArray (name, values, exp) {
      this.setCookie(name, values.join(','), exp);
    },
    getCookieArray (name) {
      let str = this.getCookie(name);
      if (str === null) return null;
      return str.split(',');
    },
    deleteCookie (name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    },
    getRaceColor (race) {
      return race == 'beast' ? '#c23531' :
        race == 'demon' ? '#2f4554' :
        race == 'mech' ? '#bcc7ee' :
        race == 'menagerie' ? '#bda29a' :
        race == 'murloc' ? '#91c7ae' :
        race == 'dragon' ? '#d48265' :
        race == 'pirate' ? '#61a0a8' :
        race == 'elemental' ? '#fde15c' :
        race == 'neutral' ? '#bdddfd' :
        '#e5e5e5'
      ;
    }
    /********************* util end *********************/
  }
};