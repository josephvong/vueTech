import Vue from 'vue'
const childComp = {
  template: `<div>this is child </div>`
}

const component = {
  data() {
    return {
      style: {
        width:'200px',
        height: '200px',
        border: '1px solid red'
      },
      test: 'ccs3'
    }
  }, 
  template: `
    <div :style="style">
      <div class="header"><slot name="header"></slot></div>
      <div class="body"><slot name="body" :test="test"></slot></div>
      <childComp></childComp>
    </div>
  `,
  components: {
    childComp
  } 
}

// Vue.component('comp', component)

new Vue({
  el: '#root',
  template: `
    <div>
      <comp>
        <div slot="body" slot-scope="prop"> this is body {{value}} {{prop.test}}</div>
        <div slot="header"> header {{value}}</div>
      </comp>
    </div> 
  `,
  data () {
    return {
      value: '222'
    }
  },
  components: {
    comp: component
  } 
})
