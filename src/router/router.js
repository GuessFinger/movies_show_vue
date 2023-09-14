import store from 'store2'
import { createRouter, createWebHashHistory } from 'vue-router'
import loginPage from '@/components/login-page'
import castList from '@/components/cast-list'
import workSummary from '@/components/work-summary'
import workList from '@/components/work-list'
import { performerHeatUseStore } from '@/store/heat-store.js'

let heatUseStore

const routes = [
  {
    path: '/',
    redirect: '/list'
  },
  {
    path: '/list',
    component: castList
  },
  {
    name: 'performer',
    path: '/performerDetail/:id',
    component: workList,
    children: [
      {
        name: 'product',
        path: ':num',
        component: workSummary
      }
    ]
  },
  {
    path: '/login',
    component: loginPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve) => {
      let savedPositionObject
      if (savedPosition) {
        savedPositionObject = { behavior: 'smooth', ...savedPosition }
      } else {
        savedPositionObject = { top: 0 }
      }
      setTimeout(() => resolve(savedPositionObject), 1000)
    })
  }
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    // 如果store里面没有存储token直接干掉
    if (!store.get('token')) {
      return next('/login')
    } else {
      if (!heatUseStore) {
        heatUseStore = performerHeatUseStore()
      }
      // 判断 pinia 里面有没有值
      const { performerHeat } = heatUseStore
      const { length } = Object.keys(performerHeat)
      if (length === 0) {
        const savedHot = store.get('performerHeat')
        if (savedHot) heatUseStore.performerHeat = JSON.parse(savedHot)
      }
    }
  }
  next()
})

export default router
