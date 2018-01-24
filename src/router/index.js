import Router from 'vue-router';
import Utils from '@/common/app.utils.js';

const router = new Router();
let columns = [
    {
        path: '/',
        meta: {
            name: 'frame'
        },
        component: function (resolve) {
            require(['@/modules/base/frame/view'], resolve);
        }
    },
    {
        path: '/login',
        meta: {
            name: 'login',
            notRequireAuth: true
        },
        component: function (resolve) {
            require(['@/modules/base/login/view'], resolve);
        }
    }
]
window.$routeMenu = columns;
router.addRoutes(columns);
// 根据登录状态重定向路由
/*router.beforeEach((to, from, next) => {
    // 不需要登录
    if (to.meta.notRequireAuth) {
        if (window.localStorage.user) {
            next(false);
        }
        else {
            next();
        }
    }
    // 需要登录
    else {
        // 已登录,根据用户菜单设置重定向
        let token = window.localStorage.token ? JSON.parse(window.localStorage.token) : {};
        if (token) {
            if (token.expires_in < new Date().getTime())
                window.localStorage.removeItem('user')
        }
        if (window.localStorage.user) {
            window.$user = window.$user || JSON.parse(window.localStorage.user);
            window.$menu = window.$menu || Utils.createUserMenu();
            if (!window.$menu.length) {
                next(false);
            }
            else {
                switch (to.path) {
                    case '/':
                        next();
                        break;
                    default:
                    //next();
                }
            }
            next();
        }
        // 未登录跳转到登录页面
        else {
            next({
                path: '/login',
                // query: {redirect: to.fullPath}
            });
        }
    }
});*/
// 模块导出
export default router;
