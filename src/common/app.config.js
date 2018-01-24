const dev = {
    host: 'http://www.b2b.com',
    api: '/api',
    //图片相关
    imgHost: 'http://120.55.195.152:8080/canzhi/api',
    //获得图片路径  上传图片路径
    imgGetAPI: '/image/p/',
    imgPostAPI: '/image/upload'
};
const prod = {
    host: 'http://www.b2b.com',
    api: '/api',
    //图片相关
    imgHost: 'http://120.55.195.152:8080/canzhi/api',
    //获得图片路径  上传图片路径
    imgGetAPI: '/image/p/',
    imgPostAPI: '/image/upload'
};

let config;

if (process.env.NODE_ENV == 'development') {
    config = dev;
}
else if (process.env.NODE_ENV == 'production') {
    config = prod;
}

export default config;
