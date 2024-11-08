import './assets/base.sass'
import {createApp} from 'vue'
import App from './App.vue'
import Item from '@/components/Item.vue'
import MainPage from '@/components/MainPage.vue'
import Search from '@/components/Search.vue'
import NotFound from '@/components/NotFound.vue'

import {createWebHistory, createRouter} from 'vue-router'
import Premier from "@/components/Premier.vue";


const routes = [
    {path: '/', component: MainPage, name: 'main'},
    {path: '/search', component: Search, name: 'search'},
    {path: '/film/:id', component: Item, name: 'item'},
    {path: '/premier', component: Premier, name: 'premier', props: true},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound}
]

const router = createRouter({
    history: createWebHistory('/filmoteka/'),
    routes,
})

createApp(App).use(router).mount('#app')
