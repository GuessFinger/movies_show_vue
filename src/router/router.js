import {createRouter, createWebHashHistory} from "vue-router";
import simpleList from '@/components/simple-list.vue';
import performerProductList from '@/components/performerProductList.vue';
import productItem from '@/components/product_item.vue';
import loginItem from '@/components/login_item.vue';
import store from "store2";
import {performerHotUseStore} from "@/store/project_store.js";

let hotUseStore;


const routes = [
    {
        path: '/',
        redirect: '/list'
    },
    {
        path: '/list',
        component: simpleList,
    },
    {
        name: 'performer',
        path: '/performerDetail/:id',
        component: performerProductList,
        children: [
            {
                name: 'product',
                path: ':num',
                component: productItem
            }
        ]
    },
    {
        path: '/login',
        component: loginItem
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {

        return new Promise((resolve) => {
            let savedPositionObject;
            if (savedPosition) {
                savedPositionObject = {behavior: 'smooth', ...savedPosition};
            } else {
                savedPositionObject = {top: 0};
            }
            setTimeout(() => resolve(savedPositionObject), 1000);
        })
    },
});

router.beforeEach((to, from, next) => {

    if (to.path !== '/login' && !store.get('token')) {
        next('/login');
    } else {
        if (!hotUseStore) {
            hotUseStore = performerHotUseStore();
        }

        // 判断 pinia 里面有没有值
        const performerHot = hotUseStore.performerHot;
        const {length} = Object.keys(performerHot);
        if (length === 0) {
            const savedHot = store.get('performerHot');
            if (savedHot) hotUseStore.performerHot = JSON.parse(savedHot);
        }
        next();
    }
});

export default router;