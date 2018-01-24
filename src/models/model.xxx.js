import Http from '@/common/app.http.js';

export default {
    // 获取验证码
    sendVerifyCode: new Http({
        url: '',
        method: 'get',
        intercept: false
    })
}
