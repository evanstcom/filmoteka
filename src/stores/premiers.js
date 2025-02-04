import {defineStore} from "pinia"
import {ref} from "vue"
import {getDatabase, onValue, ref as dbRef} from "firebase/database";
import {getAuth, onAuthStateChanged} from "firebase/auth";


export const usePremiersStore = defineStore('premiersStore', () => {
    const premiers = ref([])
    const top250 = ref([])
    const topOnMain = ref([])
    const currentPage = ref(1)
    const loader = ref(true)
    const auth = getAuth();
    const db = getDatabase();
    const getPremiers = async () => {
        loader.value = true
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = dbRef(db, `premiers`);
                onValue(starCountRef, (snapshot) => {
                    premiers.value = snapshot.val()
                }, (error) => {
                    console.log(error);
                });
            } else {
                console.log("User logged out")
            }
        })
        loader.value = false
    }

    const getTop250 = async (page) => {
        loader.value = true
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = dbRef(db, `top/${page}`);
                onValue(starCountRef, (snapshot) => {
                    top250.value = snapshot.val()
                }, (error) => {
                    console.log(error);
                });
            } else {
                console.log("User logged out")
            }
        })
        currentPage.value = page
        loader.value = false
    }
    const getTopOnMain = async () => {
        loader.value = true
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = dbRef(db, `top/1`);
                onValue(starCountRef, (snapshot) => {
                    topOnMain.value = snapshot.val()
                }, (error) => {
                    console.log(error);
                });
            } else {
                console.log("User logged out")
            }
        })
        loader.value = false
    }

    /*   const parser = () => {

           getPremiers().then(() => {
               premiers.value.map((item, index) => {
                   set(dbRef(db, `premiers/${index}`), {
                       item
                   }).then(() => console.log('Парсинг завершен'))
               })
           })

       }*/

    return {premiers, getPremiers, getTop250, top250, loader, getTopOnMain, topOnMain, currentPage}
})