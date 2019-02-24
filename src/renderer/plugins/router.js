import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'lp',
            component: require('@/components/LandingPage').default
        },
        {
            path: '/demos',
            name: 'demos',
            component: require('@/components/Demos/Demos').default
        },
        {
            path: '/friends',
            name: 'friends',
            component: require('@/components/Friends/Friends').default
        },
        {
            path: '/settings',
            name: 'settings',
            component: require('@/components/Settings/Settings').default
        },
        {
            path: '/system-information',
            name: 'system-information',
            component: require('@/components/SystemInformation').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
