import Vue from 'vue'

const app = new Vue({
  data () {
    return {
      text: 0
    }
  },
  // template: '<div>hello world {{text}}</div>',

  beforeCreate () {
    console.log(this, 'beforeCreate')
  },
  created () {
    console.log(this, 'created')
  },
  beforeMount () {
    console.log(this, 'beforeMount')
  },

  render (h) {
    return h('div', {}, this.text)
  },

  mounted () {
    console.log(this, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  /*
  activated () {
    console.log(this, 'beforeCreate')
  },
  deactivated () {
    console.log(this, 'beforeCreate')
  },
  */
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  }

})

app.$mount('#root')