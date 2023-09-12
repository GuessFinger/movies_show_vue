import {createRouter, createWebHashHistory} from "vue-router";
import simpleList from '@/components/simple-list.vue';
import performerProductList from '@/components/performerProductList.vue';
import productItem from '@/components/product_item.vue';
import loginItem from '@/components/login_item.vue';
import store from "store2";
import {performerHotUseStore} from "@/store/degreeOfHeat.js";

let hotUseStore;


const routes = [
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
    routes
});

router.beforeEach((to, from, next) => {
    console.log('hello router');
    if (!hotUseStore) {
        hotUseStore = performerHotUseStore();
    }
    // 判断pinia里面有没有值
    const performerHot = hotUseStore.performerHot;
    const {length} = Object.keys(performerHot);
    if (length === 0) {
        const savedHot = store.get('performerHot');
        if (savedHot) {
            hotUseStore.performerHot = JSON.parse(savedHot);
            console.log(hotUseStore.performerHot);
        }
    }
    next();
});

export default router;