import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    {
      path: '/',
      // name: 'index',
      component: () => import('../views/index.vue'),
      meta: {
        title: '首页',
        appType: 'reception',
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/home.vue'),
          meta: {
            title: '首页',
            appType: 'reception',
          },
        },
        {
          path: '/detail',
          name: 'happinessDetail',
          props: true,
          component: () => import('../views/happinessDetail.vue'),
          meta: {
            title: '幸福指数详情',
            appType: 'reception',
          },
        },
        {
          path: '*',
          redirect: (_to) => {
            // 方法接收目标路由作为参数
            // return 重定向的字符串路径/路径对象
            return { path: '/' }
          },
        },
      ],
    },
  ],
})

export default router
