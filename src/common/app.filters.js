import Vue from 'vue';

let filter = {

    toFixed(price) {
        return price.toFixed(2);
    },

    //单价，价格格式化
    priceFormat(val) {
        return '¥ ' + val.toFixed(2);
    },

    //小计格式化 1位小数
    amountFormat(val) {
        return '¥ ' + val.toFixed(1);
    },

}

Vue.filter('pctFormat', filter.priceFormat);
Vue.filter('toFixed', filter.toFixed);
Vue.filter('amountFormat', filter.amountFormat);
