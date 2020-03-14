import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoMain from '@/views/main.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/todo',
    name: 'todo',
    component: TodoMain
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    console.log(0)
    router.push({ path: '/todo' })
  }
  next()
})
export default router
