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
import SignIn from "@/components/pages/SignIn.vue"
import Registration from "@/components/pages/Registration.vue"
import Profile from "@/components/pages/Profile.vue"
import {initializeApp} from "firebase/app";
import {useAuthStore} from "@/stores/auth.js";

const routes = [
    {
        path: '/', component: MainPage, name: 'main', meta: {
            auth: true
        }
    },
    {
        path: '/profile', component: Profile, name: 'profile', meta: {
            auth: true
        }
    },
    {
        path: '/signin', component: SignIn, name: 'signin', meta: {
            auth: false
        }
    },
    {
        path: '/registration', component: Registration, name: 'registration', meta: {
            auth: false
        }
    },
    {
        path: '/search', component: Search, name: 'search', meta: {
            auth: true
        }
    },
    {
        path: '/film/:id', component: Item, name: 'item', meta: {
            auth: true
        }
    },
    {
        path: '/premier', component: Premier, name: 'premier', props: true, meta: {
            auth: true
        }
    },
    {
        path: '/news', component: News, name: 'news', meta: {
            auth: true
        }
    },
    {
        path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: {
            auth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

const pinia = createPinia()

const firebaseConfig = {
    apiKey: "AIzaSyCy_tc_KY4ScmNfLNAYMYDEJ5zOxBtqrao",
    authDomain: "filmoteka-evans.firebaseapp.com",
    projectId: "filmoteka-evans",
    storageBucket: "filmoteka-evans.firebasestorage.app",
    messagingSenderId: "992624755114",
    appId: "1:992624755114:web:0b27d6df080506b84eabd3",
    measurementId: "G-0QTYQW628E",
    databaseURL: "https://filmoteka-evans-default-rtdb.europe-west1.firebasedatabase.app/"
};

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.auth && !authStore.userInfo.token) {
        next('/signin')
    } else if (!to.meta.auth && authStore.userInfo.token) {
        next('/')
    } else {
        next();
    }
})

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).use(createMetaManager()).use(pinia).use(VueAwesomePaginate).mount('#app')


