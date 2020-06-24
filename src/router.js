import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

//라우터별 가드를 통해 main 컴포넌트 이동 시에 token값 체크
const authentication = () => (to, from, next) => {
  console.log("token")
  if(store.state.token !==null){
    console.log("router.js::authentication=")
    console.log(store.state.token)
    return next()
  }
  next('/')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 일단은 main에 들어갈 때만 가드 적용
      beforeEnter: authentication(),
      component: () => import(/* webpackChunkName: "about" */ './views/Main.vue'),
      children: [
        {
          path : 'companyInfo',
          name : 'companyInfo',
          component: () => import(/* webpackChunkName: "about" */ './views/CompanyInfo.vue')
        },
        {
          path : 'vocInfo',
          name : 'vocInfo',
          component: () => import(/* webpackChunkName: "about" */ './views/VocInfo.vue')
        },
        {
          path : 'error',
          name : 'error',
          component: () => import(/* webpackChunkName: "about" */ './views/Error.vue')
        },
        {
          path : 'dashboard',
          name : 'dashboard',
          component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
        }
      ] 
    },
  ]
})
