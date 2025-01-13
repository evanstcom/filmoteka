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
import Notification from "@/components/pages/Notification.vue"
import SignIn from "@/components/pages/SignIn.vue"
import Registration from "@/components/pages/Registration.vue"
import {initializeApp} from "firebase/app";

const routes = [
    {path: '/', component: MainPage, name: 'main'},
    {path: '/signin', component: SignIn, name: 'signin'},
    {path: '/registration', component: Registration, name: 'registration'},
    {path: '/search', component: Search, name: 'search'},
    {path: '/film/:id', component: Item, name: 'item'},
    {path: '/premier', component: Premier, name: 'premier', props: true},
    {path: '/news', component: News, name: 'news'},
    {path: '/notification', component: Notification, name: 'notification'},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound}
]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

const pinia = createPinia()

const firebaseConfig = {
    apiKey: "AIzaSyCy_tc_KY4ScmNfLNAYMYDEJ5zOxBtqrao",
    authDomain: "filmoteka-evans.firebaseapp.com",
    projectId: "filmoteka-evans",
    storageBucket: "filmoteka-evans.firebasestorage.app",
    messagingSenderId: "992624755114",
    appId: "1:992624755114:web:0b27d6df080506b84eabd3",
    measurementId: "G-0QTYQW628E"
};
// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).use(createMetaManager()).use(pinia).use(VueAwesomePaginate).mount('#app')


