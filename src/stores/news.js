import {defineStore} from "pinia"
import {ref} from "vue"
import axios from "axios"


export const useNewsStore = defineStore('newsStore', () => {
    const newsData = ref([])
    const currentPage = ref(localStorage.getItem('currentPage') ? +localStorage.getItem('currentPage') : 1)
    const getNews = async () => {
        const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=${currentPage.value}`, {
            headers: {
                "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
                "Content-Type": "application/json",
            },
        })
        if (data.totalPages !== currentPage.value) {
            currentPage.value = data.totalPages
            localStorage.setItem('currentPage', currentPage.value)
            await getLastNews()
        } else {
            newsData.value = data.items
        }

    }

    const getLastNews = async () => {
        const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=${currentPage.value}`, {
            headers: {
                "X-API-KEY": "9e52d931-b757-457b-a1ea-0d872ae51d51",
                "Content-Type": "application/json",
            },
        })
        newsData.value = data.items
    }

    return {newsData, getNews}
})