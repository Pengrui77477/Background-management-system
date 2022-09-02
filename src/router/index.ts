import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect:'/users',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/views/categories/index.vue')
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/goods/index.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/orders/index.vue')
      },
      {
        path: 'params',
        name: 'params',
        component: () => import('@/views/params/index.vue')
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('@/views/reports/index.vue')
      },
      {
        path: 'rights',
        name: 'rights',
        component: () => import('@/views/rights/index.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/roles/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
