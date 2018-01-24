/**
 * 模块引用
 */
import axios from 'axios';
import Config from './app.config.js';
import {Loading} from 'element-ui';
import {Message} from 'element-ui';
import Sha256 from 'js-sha256';


/**
 * 定义Http请求类
 */
class Http {
    constructor(option) {
        this.option = option;
        this.silence = option.silence || false;
        this.needToken = (typeof option.needToken == 'undefined' || option.needToken) ? true : false;
        this.intercept = (typeof option.intercept == 'undefined' || option.intercept) ? true : false;
        this.implementLock = true;
        this.lock = false;
        this.init();
    }

    // 初始化
    init() {
        // 生成axios http实例
        this.httpInstance = axios.create({
            baseURL: Config.host + Config.api,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        // http请求拦截
        this.reqInterceptor = this.httpInstance.interceptors.request.use((config) => {
            // 显示加载器
            if (!this.silence) {
                //window.$ui.loader.show();
            }
            // 返回请求配置
            return config;
        }, function (error) {
            // 解锁并隐藏加载器
            this.unlockAndHideLoader();
            // 返回错误
            return Promise.reject(error);
        });

        // http响应拦截
        this.resInterceptor = this.httpInstance.interceptors.response.use((response) => {

            // 解锁并隐藏加载器
            this.unlockAndHideLoader();
            // 处理响应数据
            if (response.data.code == 0) {
                return response.data;
            }
            else {
                this.errorHandle(response.data);
            }
        }, (error) => {
            let bol = this.regularity(error.message);
            if (bol) {
                error.message = '网络异常';
            }
            // 解锁并隐藏加载器
            this.unlockAndHideLoader();
            // 处理错误
            this.errorHandle({code: -1, msg: error.message, error: error});
        });
    }

    // 取消拦截器
    ejectInterceptor() {
        this.httpInstance.interceptors.request.eject(this.reqInterceptor);
        this.httpInstance.interceptors.response.eject(this.resInterceptor);
    }

    // 正则匹配网络错误
    regularity(str) {
        let regexp = /[Network Error]/img;
        return regexp.test(str);
    }

    // 错误处理方法
    errorHandle(err) {
        let msg = err.message.match('timeout') ? '请求超时, 您的网络有点慢...' : err.message;

        Message({
            type: 'error',
            center: true,
            message: msg
        })
    }

    // 解锁与隐藏加载器
    unlockAndHideLoader() {
        // 解锁请求
        this.lock = false;

        // 隐藏加载器
        if (!this.silence) {
        }
    }

    // 发送请求获取数据方法
    connect(option) {
        option = option || {};

        // 设置拦截器状态
        this.intercept = option.intercept || this.intercept;
        this.implementLock = option.implementLock || this.implementLock;
        if (!this.intercept) {
            this.ejectInterceptor();
        } else {
            // 锁定请求
            if (this.implementLock && this.lock) {
                return;
            };
            this.lock = true;
        }
        
        // 设置query参数
        option.params = option.params || {};
        option.headers = option.headers || {};

        // 执行请求并返回
        return this.httpInstance(Object.assign({}, this.option, option));
    }
}

/**
 * 导出Http请求类
 */
export default Http;
