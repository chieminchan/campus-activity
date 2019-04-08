import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';

import HomePage from '@/views/layout/HomePage.vue';

Vue.use(iView);
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Index.vue'),
      hidden: true,
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      redirect: {
        name: 'activity'
      }
    },

    // 首页
    {
      path: '/activity',
      component: HomePage,
      children: [{
        name: 'activity',
        path: '',
        component: () => import('@/views/activity/Index.vue'),
      }, 
      {
        name: 'index-detail',
        path: ':aid',
        component: () => import('@/views/activity/ActivityPost.vue'),
      }, 
    ]
    },

    // 发现
    {
      path: '/find',
      component: HomePage,
      children: [
        { 
          name: 'find',
          path: '',
          component: () => import('@/views/activity/ActivityFilter.vue'),
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.config({
    color: '#008bf8',
    failedColor: '#f0ad4e',
    height: 4
  });
  iView.LoadingBar.start();
  next();
});

router.afterEach(() => {
  window.scrollTo(0,0);
  iView.LoadingBar.update('50%');
  iView.LoadingBar.finish();
});


export default router;