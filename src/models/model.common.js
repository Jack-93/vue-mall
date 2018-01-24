import Http from '@/common/app.http.js';

//公共请求
export default {
    // 获取省
    getProvinces: new Http({
        url: '/area/position_provinces',
        method: 'get',
        intercept: true
    }),
    // 获取市
    getCity: new Http({
        url: '/area/position_cities',
        method: 'get',
        intercept: true
    }),
    // 获取区/县
    getCounty: new Http({
        url: '/area/position_counties',
        method: 'get',
        intercept: true
    }),
    // 获取街道/乡镇
    getTowns: new Http({
        url: '/area/position_towns',
        method: 'get',
        intercept: true
    })
}
