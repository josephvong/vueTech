import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <div>
        <p>{{radioCheck}}</p>
        <input type="radio" value="one" v-model="radioCheck" />
        <input type="radio" value="two" v-model="radioCheck" />
      </div>
      <div>
        <p> {{arr.join(',')}} </p>
        <input type="checkbox" :value="1" v-model="arr" />
        <input type="checkbox" :value="2" v-model="arr" />
        <input type="checkbox" :value="3" v-model="arr" />
      </div>
      <div>
        <p>{{number}}</p>
        <input type="text" v-model.number="number" />
      </div>
    </div>
  `,
  data () {
    return {
      radioCheck: '',
      arr: [2, 3],
      number: 0
    }
  }
})
