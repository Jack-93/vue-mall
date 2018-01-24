// 样式引用
import 'img/icon/iconfont.css';
import 'css/global.styl';

// 模块引用
import Vue from 'vue';
import VueRouter from 'vue-router';
import Utils from 'common/app.utils.js';

// Vue自定义模块配置
import './app.directives.js';
import './app.filters.js';
import '../components/index.js';

// Vue插件配置
Vue.use(VueRouter);

// 生成全局事件通信总线实例
window.$bus = new Vue();

// 导出
export default {
    ready(callback) {
        Utils.checkBrowser();

        // 从本地存储获取用户数据
        if (window.localStorage.user) {
            window.$user = JSON.parse(window.localStorage.user);
        }

        callback();
    }
}
