import {createRouter, createWebHashHistory} from "vue-router";
import simpleList from '@/components/simple-list.vue';
import performerProductList from '@/components/performerProductList.vue';
import productItem from '@/components/product_item.vue';


const routes = [
    {
        path: '/',
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
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;