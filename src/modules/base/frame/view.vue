<style lang="stylus" src="./view.styl" scoped></style>
<template lang="html" src="./view.html"></template>

<script>
    import Vue from "vue";
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "app",
        data() {
            return {
                isCollapse: false,
                index: 1,
                menuList: [
                    {
                        id: '1',
                        icon: "iconfont icon-sitemap",
                        name: '框架管理',
                        children: [
                            {
                                id: '1-1',
                                name: '平台架构',
                                path: 'demo/view'
                            }
                        ],
                    }
                ]
            };
        },
        computed: {
            activeTabName: {
                get() {
                    return this.$store.state.navTabs.activeTabName;
                },
                set(value) {
                    this.$store.commit("navTabs/setActiveTabName", value);
                }
            },
            ...mapState("navTabs", ["tabList"])
        },
        methods: {
            ...mapMutations("navTabs", ["closeTab", "addTab"]),
            selectHandle(tab) {
                this.addTab({
                    label: tab.name,
                    name: 'tab' + this.index++,
                    src: tab.path
                });
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>
