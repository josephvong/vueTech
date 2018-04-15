import Vuex from 'vuex'
import state from './state/state'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV !== 'development'

export default () => { // 封装一个输出Vuex 实例的 函数 并输出
  const store = new Vuex.Store({
    strict: isDev, // 在生产环境下 开启vuex的严格模式
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 12
        },
        mutations: {
          updateText (state, data) { // 此处的state为 module_A 内部的state
            state.text = data
          }
        },
        getters: {
          textPlus (state) {
            return state.text + 1
          }
        },
        actions: {
          add ({state, commit, rootState}) {
            commit('updateText', rootState.count)
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

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './getters/getters',
      './mutations/mutations',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newGetters = require('./getters/getters').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      store.hotUpdate({
        state: newState,
        getters: newGetters,
        mutations: newMutations,
        actions: newActions
      })
    })
  }
  return store
}
