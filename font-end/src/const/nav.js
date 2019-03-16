export default [
  {
    title: '首页',
    icon: 'ios-school',
    name: 'home',
    to: {
      path: '/',
    },
  },
  {
    title: '发现',
    icon: 'md-infinite',
    name: 'find',
    to: {
      path: '/activities',
    },
  },
  {
    title: '发布',
    icon: 'logo-dribbble',
    name: 'publish',
    children: [
      {
        to: {
          path: '/publish/activity',
        },
        title: '发布线上活动',
        name: 'online',
      },
      {
        to: {
          path: '/publish/offline',
        },
        title: '发布线下活动',
        name: 'vote',
      },
    ],
  },
  {
    title: '个人主页',
    icon: 'md-aperture',
    name: 'user',
    to: {
      path: '/user',
    },
  },
  {
    title: '联系我们',
    icon: '',
    name: '/concat',
    to: {
      path: 'concat'
    }
  }
];
