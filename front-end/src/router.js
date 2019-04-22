import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';

import HomePage from '@/views/client/layout/HomePage.vue';
import adminHost from '@/views/admin/layout/Index.vue';

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

        // 前台
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
                component: () => import('@/views/client/activity/Index.vue'),
            }]
        },

        // 发现
        {
            path: '/find',
            component: HomePage,
            children: [{
                    name: 'find',
                    path: '',
                    component: () => import('@/views/client/activity/ActivityFilter.vue'),
                },
                {
                    name: 'find-detail',
                    path: ':aid',
                    component: () => import('@/views/client/activity/ActivityPost.vue'),
                },
                {
                    name: 'post-work',
                    path: ':aid/work/new',
                    component: () => import('@/views/client/activity/PostWork.vue'),
                }
            ]
        },

        // 活动发布
        {
            path: '/publish',
            component: HomePage,
            children: [{
                name: 'publish',
                path: '',
                component: () => import('@/views/client/publish/Index.vue'),
            }]
        },

        // 个人主页
        {
            path: '/user',
            component: HomePage,
            children: [{
                name: 'user',
                path: '',
                component: () => import('@/views/client/user/UserPage.vue'),
            }, ]
        },

        // 管理后台
        {
            path: '/admin',
            component: adminHost,
            children: [
                {
                    name: 'admin-activities',
                    path: 'activities',
                    component: () => import('@/views/admin/activities/Index.vue'),
                },
                {
                    name: 'admin-students',
                    path: 'students',
                    component: () => import('@/views/admin/students/Index.vue'),
                },
                {
                    name: 'admin-managers',
                    path: 'managers',
                    component: () => import('@/views/admin/managers/Index.vue'),
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
    window.scrollTo(0, 0);
    iView.LoadingBar.update('50%');
    iView.LoadingBar.finish();
});


export default router;