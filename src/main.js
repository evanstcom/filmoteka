import './assets/base.sass'
import {createApp} from 'vue'
import {createWebHistory, createRouter} from 'vue-router'

import {createMetaManager} from 'vue-meta'

import {createPinia} from "pinia";

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import App from './App.vue'
import Item from '@/components/pages/Item.vue'
import MainPage from '@/components/pages/MainPage.vue'
import Search from '@/components/pages/Search.vue'
import NotFound from '@/components/pages/NotFound.vue'
import Premier from "@/components/pages/Premier.vue"
import News from "@/components/pages/News.vue"
import Pinia from "@/components/pages/Pinia.vue"
import Store from "@/components/pages/Store.vue"

const routes = [
    {path: '/', component: MainPage, name: 'main'},
    {path: '/search', component: Search, name: 'search'},
    {path: '/film/:id', component: Item, name: 'item'},
    {path: '/premier', component: Premier, name: 'premier', props: true},
    {path: '/news', component: News, name: 'news'},
    {path: '/pinia', component: Pinia, name: 'pinia'},
    {path: '/store', component: Store, name: 'store'},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound}
]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

const pinia = createPinia()

/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://evanstcom.github.io/filmoteka/firebase-messaging-sw.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((err) => {
        console.log('Service Worker registration failed:', err);
    });
}
*/

createApp(App).use(router).use(createMetaManager()).use(pinia).use(VueAwesomePaginate).mount('#app')


