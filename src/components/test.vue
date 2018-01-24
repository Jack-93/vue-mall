<template>
  <div id="app">
 <!-- <keep-alive :include="includes">
    <component :is="comps[current]"></component>
  </keep-alive>

					<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-quanxianfenpei"></use>
</svg>
  <input v-model="current" type="number" />-->
      暂无首页设计
</div>
</template>

<script>
import Vue from 'vue'
const comps = ['a1', 'b1', 'c', 'd', 'e', 'f', 'g1', 'h', 'i1', 'j'];

comps.forEach(name => {
  Vue.component(name, {
    template: `<div>{{ name }}</div>`,
    data() {
      return {
        name
      }
    },
    created() {
      console.log(this.name)
    }
  })
})
export default {
  name: 'test',
  data () {
    return {
    comps,
  	index: 0,
    includes: [0]
    }
  },
  computed: {
    current: {
      get() {
        return this.index
      },
      set(value) {
        value = +value
        if (value < 0 || value > 9) return
        this.index = value
        const comp = this.comps[value]
        if (this.includes.indexOf(comp) === -1) {
          this.includes.push(comp)
        }
        if (this.includes.length > 5) {
          this.includes.shift()
        }
        console.info(this.includes)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
