(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-638a63a6"],{"1da1":function(t,r,e){"use strict";e.d(r,"a",(function(){return a}));e("d3b7"),e("e6cf");function n(t,r,e,n,a,o,i){try{var c=t[o](i),s=c.value}catch(u){return void e(u)}c.done?r(s):Promise.resolve(s).then(n,a)}function a(t){return function(){var r=this,e=arguments;return new Promise((function(a,o){var i=t.apply(r,e);function c(t){n(i,a,o,c,s,"next",t)}function s(t){n(i,a,o,c,s,"throw",t)}c(void 0)}))}}},2532:function(t,r,e){"use strict";var n=e("23e7"),a=e("5a34"),o=e("1d80"),i=e("ab13");n({target:"String",proto:!0,forced:!i("includes")},{includes:function(t){return!!~String(o(this)).indexOf(a(t),arguments.length>1?arguments[1]:void 0)}})},"381f":function(t,r,e){"use strict";e.r(r);var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"game-detail-data"},[0!=t.gid?e("div",{staticClass:"info-wrapper"},[e("ul",{staticClass:"game-info box"},[e("li",{staticClass:"_date first-info above cut-text"},[t._v(t._s(t.gameInfo.dt_now))]),e("li",{staticClass:"_hero first-info above cut-text"},[t._v(t._s(t.$t(t.gameInfo.hero))),e("span",{staticStyle:{color:"#c9c9c9"}},[t._v(t._s("#"+t.gameInfo.game))])]),e("li",{staticClass:"_placement first-info above"},[t._v(t._s(t.$t("placement"))+": "+t._s(t.gameInfo.placement))]),e("li",{staticClass:"_back first-info above"},[e("b-button",{attrs:{variant:"danger",size:"sm"},on:{click:t.go_back}},[t._v(t._s(t.$t("back")))])],1)]),e("ul",{staticClass:"round-list"},t._l(t.turnCount,(function(r){return e("li",{key:r,staticClass:"secondary"},[e("ul",{staticClass:"game-item"},[e("li",{staticClass:"turn_no"},[t._v("Turn "+t._s(r))]),e("li",{staticClass:"used_card"},[e("div",{staticClass:"board-tag"},[t._v("Used")]),t._l(t.pop_card("used",r-1),(function(n,a){return e("div",{key:n+r+a,staticClass:"card_wrapper",class:"check-power-"+n.card_id+"-"+t.gameInfo.hero},[1==n.is_gold?e("div",{staticClass:"gold"},[e("img",{attrs:{src:t.getImgUrl("star")}})]):t._e(),"HeroPower"!=n.card_id?e("img",{attrs:{src:t.getMinionImgUrl(n.card_id),thumbnail:t.getMinionImgUrl("thumbnail"),alt:t.$t(n.card_id),id:"used-"+r+"-"+a,title:t.$t(n.card_id)}}):e("img",{attrs:{src:t.getPowerImgUrl(t.gameInfo.hero),thumbnail:t.getPowerImgUrl("thumbnail"),alt:t.$t(n.card_id),title:t.$t(n.card_id)}}),e("b-popover",{attrs:{target:"used-"+r+"-"+a,triggers:"hover focus",content:"Placement "+n.card_id}},[e("img",{attrs:{src:t.getCardImgUrl(n.card_id,t.lang),alt:""}})])],1)}))],2),e("li",{staticClass:"turn_board"},[r!=t.turnCount?e("div",{staticClass:"board primary-dark"},[e("div",{staticClass:"board-tag"},[t._v("Board")]),t._l(t.pop_card("board",r),(function(n,a){return e("div",{key:n+r+a,staticClass:"card_wrapper"},[1==n.is_gold?e("div",{staticClass:"gold"},[e("img",{attrs:{src:t.getImgUrl("star")}})]):t._e(),e("img",{attrs:{src:t.getMinionImgUrl(n.card_id),thumbnail:t.getMinionImgUrl("thumbnail"),alt:t.$t(n.card_id),id:"board-"+r+"-"+a,title:t.$t(n.card_id)}}),e("b-popover",{attrs:{target:"board-"+r+"-"+a,triggers:"hover focus",placement:"left"}},[e("img",{attrs:{src:t.getCardImgUrl(n.card_id,t.lang),alt:""}})])],1)}))],2):e("div",{staticClass:"board warning-dark"},[e("div",{staticClass:"board-tag"},[t._v("Board")]),t._l(7,(function(r){return e("div",{directives:[{name:"show",rawName:"v-show",value:null!=t.lastBoard["minion_"+(r-1)],expression:"lastBoard[`minion_${n - 1}`] != null"}],key:r,staticClass:"card_wrapper"},[t.check_gold(t.lastBoard["minion_"+(r-1)])?e("div",{staticClass:"gold"},[e("img",{attrs:{src:t.getImgUrl("star")}})]):t._e(),e("img",{attrs:{src:t.getMinionImgUrl(t.lastBoard["minion_"+(r-1)]),thumbnail:t.getMinionImgUrl("thumbnail"),alt:t.$t(t.lastBoard["minion_"+(r-1)]),id:"last-minion_"+(r-1),title:t.$t(t.lastBoard["minion_"+(r-1)])}}),e("b-popover",{attrs:{target:"last-minion_"+(r-1),cardid:t.lastBoard["minion_"+(r-1)],triggers:"hover focus",placement:"left"}},[e("img",{attrs:{src:t.getCardImgUrl(t.lastBoard["minion_"+(r-1)],t.lang),alt:""}})])],1)}))],2)])])])})),0)]):e("div",{staticClass:"empty"},[t._v(" Not Found Error. ")])])},a=[],o=(e("4de4"),e("caad"),e("d81d"),e("2532"),e("96cf"),e("1da1")),i=e("d3a4"),c=e("a18c"),s=e("872c"),u=e("bc3a"),l=e.n(u),d={name:"game-detail-data",mixins:[s["a"]],data:function(){return{gameInfo:[],turnCount:0,roundList:[],lastBoard:[],goldList:[],hoverImage:{}}},computed:{gid:function(){return parseInt(sessionStorage.getItem("gid"),10)||0},lang:function(){return i["a"].locale}},mounted:function(){this.get_game_info(),this.get_round_info(),this.get_last_board()},methods:{get_gold_card_list:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var e;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,l.a.get("http://battlegroundlab.com/api/goldcard.php");case 3:e=r.sent,e.data.resultJson.length>0?(t.goldList=[],t.goldList=e.data.resultJson):t.goldList=[],r.next=10;break;case 7:r.prev=7,r.t0=r["catch"](0),console.log(r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})))()},get_game_info:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var e,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,e={game_id:t.gid},r.next=4,l.a.get("http://battlegroundlab.com/api/game.php"+t.jsonToParam(e));case 4:n=r.sent,n.data.resultJson.length>0?(t.gameInfo=[],t.gameInfo=n.data.resultJson[0],t.turnCount=t.gameInfo.turn_count+1):t.gameInfo=[],r.next=11;break;case 8:r.prev=8,r.t0=r["catch"](0),console.log(r.t0);case 11:case"end":return r.stop()}}),r,null,[[0,8]])})))()},get_round_info:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var e,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,e={game_id:t.gid},r.next=4,l.a.get("http://battlegroundlab.com/api/game_detail.php"+t.jsonToParam(e));case 4:n=r.sent,n.data.resultJson.length>0?(t.roundList=[],t.roundList=n.data.resultJson):t.roundList=[],r.next=11;break;case 8:r.prev=8,r.t0=r["catch"](0),console.log(r.t0);case 11:case"end":return r.stop()}}),r,null,[[0,8]])})))()},get_last_board:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var e,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,e={game_id:t.gid},r.next=4,l.a.get("http://battlegroundlab.com/api/game.php"+t.jsonToParam(e));case 4:n=r.sent,n.data.resultJson.length>0?(t.lastBoard=[],t.lastBoard=n.data.resultJson[0]):t.lastBoard=[],r.next=11;break;case 8:r.prev=8,r.t0=r["catch"](0),console.log(r.t0);case 11:case"end":return r.stop()}}),r,null,[[0,8]])})))()},pop_card:function(t,r){return this.roundList.filter((function(e){return t==e.chk&&r==e.turn}))},check_gold:function(t){return this.goldList.map((function(t){return t.id})).includes(t)},go_back:function(){c["a"].go(-1)}}},f=d,h=(e("82a9"),e("2877")),g=Object(h["a"])(f,n,a,!1,null,"6c9eccd8",null);r["default"]=g.exports},"4de4":function(t,r,e){"use strict";var n=e("23e7"),a=e("b727").filter,o=e("1dde"),i=e("ae40"),c=o("filter"),s=i("filter");n({target:"Array",proto:!0,forced:!c||!s},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},"5a34":function(t,r,e){var n=e("44e7");t.exports=function(t){if(n(t))throw TypeError("The method doesn't accept regular expressions");return t}},"6b7a":function(t,r,e){},"82a9":function(t,r,e){"use strict";var n=e("6b7a"),a=e.n(n);a.a},"96cf":function(t,r,e){var n=function(t){"use strict";var r,e=Object.prototype,n=e.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function s(t,r,e,n){var a=r&&r.prototype instanceof p?r:p,o=Object.create(a.prototype),i=new O(n||[]);return o._invoke=k(t,e,i),o}function u(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(n){return{type:"throw",arg:n}}}t.wrap=s;var l="suspendedStart",d="suspendedYield",f="executing",h="completed",g={};function p(){}function m(){}function v(){}var _={};_[o]=function(){return this};var y=Object.getPrototypeOf,b=y&&y(y(j([])));b&&b!==e&&n.call(b,o)&&(_=b);var w=v.prototype=p.prototype=Object.create(_);function x(t){["next","throw","return"].forEach((function(r){t[r]=function(t){return this._invoke(r,t)}}))}function L(t){function r(e,a,o,i){var c=u(t[e],t,a);if("throw"!==c.type){var s=c.arg,l=s.value;return l&&"object"===typeof l&&n.call(l,"__await")?Promise.resolve(l.__await).then((function(t){r("next",t,o,i)}),(function(t){r("throw",t,o,i)})):Promise.resolve(l).then((function(t){s.value=t,o(s)}),(function(t){return r("throw",t,o,i)}))}i(c.arg)}var e;function a(t,n){function a(){return new Promise((function(e,a){r(t,n,e,a)}))}return e=e?e.then(a,a):a()}this._invoke=a}function k(t,r,e){var n=l;return function(a,o){if(n===f)throw new Error("Generator is already running");if(n===h){if("throw"===a)throw o;return P()}e.method=a,e.arg=o;while(1){var i=e.delegate;if(i){var c=C(i,e);if(c){if(c===g)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===l)throw n=h,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=f;var s=u(t,r,e);if("normal"===s.type){if(n=e.done?h:d,s.arg===g)continue;return{value:s.arg,done:e.done}}"throw"===s.type&&(n=h,e.method="throw",e.arg=s.arg)}}}function C(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator["return"]&&(e.method="return",e.arg=r,C(t,e),"throw"===e.method))return g;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var a=u(n,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,g;var o=a.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,g):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function I(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function E(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(I,this),this.reset(!0)}function j(t){if(t){var e=t[o];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function e(){while(++a<t.length)if(n.call(t,a))return e.value=t[a],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:P}}function P(){return{value:r,done:!0}}return m.prototype=w.constructor=v,v.constructor=m,v[c]=m.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var r="function"===typeof t&&t.constructor;return!!r&&(r===m||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(L.prototype),L.prototype[i]=function(){return this},t.AsyncIterator=L,t.async=function(r,e,n,a){var o=new L(s(r,e,n,a));return t.isGeneratorFunction(e)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},x(w),w[c]="Generator",w[o]=function(){return this},w.toString=function(){return"[object Generator]"},t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){while(r.length){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=j,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],r=t.completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function a(n,a){return c.type="throw",c.arg=t,e.next=n,a&&(e.method="next",e.arg=r),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(s&&u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var a=this.tryEntries[e];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=r,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),g},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),E(e),g}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var a=n.arg;E(e)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:j(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),g}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}},ab13:function(t,r,e){var n=e("b622"),a=n("match");t.exports=function(t){var r=/./;try{"/./"[t](r)}catch(e){try{return r[a]=!1,"/./"[t](r)}catch(n){}}return!1}},b727:function(t,r,e){var n=e("0366"),a=e("44ad"),o=e("7b0b"),i=e("50c4"),c=e("65f0"),s=[].push,u=function(t){var r=1==t,e=2==t,u=3==t,l=4==t,d=6==t,f=5==t||d;return function(h,g,p,m){for(var v,_,y=o(h),b=a(y),w=n(g,p,3),x=i(b.length),L=0,k=m||c,C=r?k(h,x):e?k(h,0):void 0;x>L;L++)if((f||L in b)&&(v=b[L],_=w(v,L,y),t))if(r)C[L]=_;else if(_)switch(t){case 3:return!0;case 5:return v;case 6:return L;case 2:s.call(C,v)}else if(l)return!1;return d?-1:u||l?l:C}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},caad:function(t,r,e){"use strict";var n=e("23e7"),a=e("4d64").includes,o=e("44d2"),i=e("ae40"),c=i("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:!c},{includes:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),o("includes")},d81d:function(t,r,e){"use strict";var n=e("23e7"),a=e("b727").map,o=e("1dde"),i=e("ae40"),c=o("map"),s=i("map");n({target:"Array",proto:!0,forced:!c||!s},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-638a63a6.d8f653ab.js.map