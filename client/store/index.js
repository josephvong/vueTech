import Vuex from 'vuex'
import defaultState from './state/state'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV !== 'development'

export default () => { // 封装一个输出Vuex 实例的 函数 并输出
  return new Vuex.Store({
    strict: isDev, // 在生产环境下 开启vuex的严格模式
    state: defaultState,
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 'a'
        },
        mutations: {
          updateText (state, data) { // 此处的state为 module_A 内部的state
            state.text = data
          }
        }
      },
      b: {
        namespaced: true,
        state: {
          text: 'b'
        },
        mutations: {
          changeText (state, data) { state.text = data }
        },
        actions: {
          changeText (store, data) { store.commit('changeText', data) }
        }
      }
    }
  })
}
