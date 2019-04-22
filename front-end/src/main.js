import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import VueMoment from 'vue-moment';
import moment from 'moment'
import {Table, TableColumn} from 'element-ui';


import 'iview/dist/styles/iview.css';
import './css/index.less';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(iView);
Vue.use(VueMoment, { moment });
Vue.component('Table', Table);
Vue.component('Column', TableColumn);
Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')