import Vue from 'vue';

const directive = {
    modal: {
        bind: function (el, binding, vnode) {
            el.addEventListener('click', function () {
                const modalName = binding.arg;
                if (binding.modifiers.open) {
                    vnode.context.$root.$modal[modalName].open();
                }
                else if (binding.modifiers.close) {
                    vnode.context.$root.$modal[modalName].close();
                }
            });
        }
    },


    open: {
        bind: function (el, binding, vnode) {
            el.addEventListener('click', function () {
                let obj = binding.value;
                if (obj.modal) {
                    let uiComponent = vnode.context.$ui.$modal[obj.modal];
                    uiComponent.open();
                }
            });
        }
    },
    close: {
        bind: function (el, binding, vnode) {
            el.addEventListener('click', function () {
                let obj = binding.value;
                if (obj.modal) {
                    let uiComponent = vnode.context.$ui.$modal[obj.modal];
                    uiComponent.close();
                }
            });
        }
    }
}

// 全局指令注册
Vue.directive('modal', directive.modal);
Vue.directive('open', directive.open);
Vue.directive('close', directive.close);
