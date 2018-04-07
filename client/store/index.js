import Vuex from 'vuex'

export default () => { // 封装一个输出Vuex 实例的 函数 并输出
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      updateCount (state, num) {
        state.count = num
      }
    }
  })
}
