// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';
import '@riophae/vue-treeselect/dist/vue-treeselect.min.css'
import './assets/css/global.styl';

import Treeselect from '@riophae/vue-treeselect'
import ElementUI from 'element-ui';
Vue.use(ElementUI, { size: 'mini' });
Vue.use(VueRouter);
Vue.component('treeselect', Treeselect);

const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});

Vue.prototype.tableHeight = 650;

Date.prototype.format = function(fmt = 'yyyy-MM-dd') {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
