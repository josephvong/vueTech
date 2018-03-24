import Vue from 'vue'
 

const component = {
  data() {
    return {
      style: {
        width:'200px',
        height: '200px',
        border: '1px solid red'
      },
     
    }
  }, 
  template: `
    <div :style="style">
      <slot></slot>
    </div>
  `,
  
}

// Vue.component('comp', component)

new Vue({
  el: '#root',
  /*template: `
    <div>
      <comp> 
        <div  > header {{value}}</div>
      </comp>
    </div> 
  `,*/
  render (h) {
    return h('comp', {ref: 'comp'}, [
      h('span', {ref: 'span'}, this.value)
    ])
  },
  data () {
    return {
      value: '22sdfg2'
    }
  },
  components: {
    comp: component
  } 
})
