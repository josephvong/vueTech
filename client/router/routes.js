// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/index.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: () => import('../views/todo/todo.vue'), // Todo,
    beforeEnter (to, from, next) {
      console.log('app route before enter')
      next()
    }
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/login/exact',
    component: () => import('../views/login/index.vue')
  }
]
