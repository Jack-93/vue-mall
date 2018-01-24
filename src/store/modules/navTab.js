const home = resolve => require(['@/modules/demo/view'], resolve);

const state = {
    activeTabName: 'home',
    tabList: [{
        label: '主页',
        name: 'home',
        disabled: false,
        closable: false,
        component: home
    }]
};

const mutations = {
    setActiveTabName(state, name) {
        state.activeTabName = name;
    },
    addTab(state, tab) {
        if (state.tabList.filter(f => f.name == tab.name) == 0) {
            let component = resolve => require([`@/modules/${tab.src}`], resolve);
            state.tabList.push({
                label: tab.label,
                name: tab.name,
                disabled: false,
                closable: true,
                component: component
            });
        }
        state.activeTabName = tab.name;
    },
    closeTab(state, name) {
        let tabs = state.tabList;
        let activeName = state.activeTabName;
        if (activeName === name) {
            tabs.forEach((tab, index) => {
                if (tab.name === name) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeName = nextTab.name;
                    }
                }
            });
        }

        state.activeTabName = activeName;
        state.tabList = tabs.filter(tab => tab.name !== name);

    }
};

export default {
    namespaced: true,
    state,
    mutations
};
