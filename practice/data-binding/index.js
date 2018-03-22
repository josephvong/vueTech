import Vue from 'vue'

const app = new Vue({
  data () {
    return {
      isActive: false
    }
  },
  template: `<div>{{isActive ? 'a' : 'b'}}</div>`
})

app.$mount('#root')
