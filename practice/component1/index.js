import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: [
    'value',
    'value1'
  ],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1"/>
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

// Vue.component('comp', component)

new Vue({
  el: '#root',
  template: `
    <div>
      <p>{{value}}</p>
      <comp v-model="value"  ></comp>
    </div> 
  `,
  data () {
    return {
      value: 123
    }
  },
  components: {
    comp: component
  },
  methods: {
    listenInput (val){
      this.value = parseInt(val)
    }
  }
})
