import Vue from 'vue'

// 创建一个实例
const app = new Vue({
  // el: '#root', // 实例的挂载 节点 ‘#root’
  data(){
    return {
      text:0,
      obj:{}
    }   
  },
  template: '<div>hello world {{text}} {{obj.a}}</div>' 
})
app.$mount('#root')
// export default app


/*console.log(app.$el)
console.log(app.$root)

const unWatch = app.$watch("text",(oldVal,newVal)=>{
  console.log(oldVal)
  console.log(newVal)
})

console.log(unWatch)
*/
let i = 0
setInterval(()=>{
  i += 1
  //app.data = i
  //app.obj.a =  i
  app.$set(app.obj, 'a', i)
  //app.$forceUpdate()
}, 1000)