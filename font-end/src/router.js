import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';

import HomePage from '@/views/layout/HomePage.vue';

Vue.use(iView);
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
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
        name: 'index'
      }
    },
    {
      path: '/index',
      component: HomePage,
      children: [{
        name: 'index',
        path: '',
        component: () => import('@/views/activity/Index.vue'),
      }, 
      {
        name: 'index-detail',
        path: 'index/detail',
        component: () => import('@/views/activity/Detail.vue'),
      }, 
    ]
    },
    {
      name: 'find',
      path: '/find',
      component: HomePage,
      children: [
        {
          path: '',
          component: () => import('@/views/activity/Filter.vue'),
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
  iView.LoadingBar.update('50%');
  iView.LoadingBar.finish();
});


export default router;