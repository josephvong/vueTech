<template>
  <div id="app">
    
    <div id="cover"></div>
    <Header></Header>
    <router-link to="/app">app</router-link> 
    <router-link to="/login">login</router-link>
    <router-link to="/login/exact">login</router-link> 
    <p @click="clickHandle">{{fullName}} + {{firstName}}</p> 
    <p>{{count}}</p>
    <p>{{a}} {{b}}</p> 
    <p>{{mctext}}</p>
    <router-view></router-view>
    <!-- <todo></todo> -->
    <Footer></Footer>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex' // , mapActions
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  data () {
    return {
      // firstName: this.$store.state.firstName
      a: this.$store.state.a.text,
      b: this.$store.state.b.text,
      c: this.$store.state.c.mctext
    }
  },
  computed: {
    // fullName () {
    //   return this.$store.getters.fullName
    // },

    ...mapGetters({
      fullName: 'fullName',
      textPlus: 'a/textPlus'
    }),
    ...mapState({
      firstName: 'firstName',
      lastName: 'lastName',
      count: 'count',
      mctext: 'mctext'
    })
  },
  methods: {
    // ...mapActions({
    //   updateCountAsync: 'updateCountAsync',
    //   changeBText: 'b/changeText'
    // }),
    clickHandle () {
      // this.updateAText('34')
      console.log('c')
    },
    ...mapMutations({
      updateCount: 'updateCount',
      updateAText: 'a/updateText'
    })
  },
  created () {
    // this.updateCountAsync({num: 10, time: 2000})
  },
  mounted () {
    console.log(this.textPlus)
    console.log(this.$store.state.c)
    setTimeout(() => {
      this.updateCount(20)
      this.updateAText('34')
      console.log(this.textPlus)
    }, 1000)
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


