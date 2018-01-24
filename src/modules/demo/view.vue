<style lang="stylus" src="./view.styl" scoped></style>
<template lang="html" src="./view.html"></template>

<script>
import Utils from '@/common/app.utils.js'
import Model from './view.model.js';

export default {
    data () {
        return {

        }
    },

    watch: {
      
    },

    mounted: function () {
        this.init();
    },

    methods: {

        async init () {
            //let result = await Model.xxxAjax();
        },
    }
}
</script>
