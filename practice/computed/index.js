import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <p>name: {{fullName}}</p> 
      <p>name: {{firstName}}</p>
      <p>name: {{lastName}}</p>
      <p>number: {{number}}</p>
      <p><input type="text" v-model="number" /></p>
      <p><input type="text" v-model="fullName" /></p>
      <p><input type="text" v-model="obj.a" /></p>
    </div>
  `,
  data () {
    return {
      firstName: 'joseph',
      lastName: 'Vong',
      number: 0,
      obj: {
        a: 123,
      }
    }
  },
  computed: {
    fullName: {
      // console.log('new name')
      // return `${this.firstName} ${this.lastName}`
      get () {
        return `${this.firstName} ${this.lastName}`
      },
      set (name) { // 传入的参数是 计算属性 fullName的值
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  methods: {
    getName () {
      console.log('fn invoke')
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: {
    fullName: {
      handler (newName, oldName) {
        console.log(newName)
        // this.trueName = newName + ' ' + this.lastName
      },
      immediate: false // 默认为false （为false表示 只在监听属性变化时才触发watch的触发函数）
      // immediate设置true表示：在 watch某个属性时，这个属性在初始化（设置默认值）时就需要执行一次watch的 handler
    },

    obj: {
      handler (newVal, oldVal) {
        console.log(newVal)
      },
      deep: true
    }
  }
})
