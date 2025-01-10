import {initializeApp} from 'firebase/app';
import {getMessaging} from 'firebase/messaging';

const firebaseMessagingSw = {
    apiKey: "AIzaSyD036jwFy2asDyY4AvY6UIQwXwzejynCfM",
    authDomain: "filmoteka-by-evans.firebaseapp.com",
    projectId: "filmoteka-by-evans",
    storageBucket: "filmoteka-by-evans.firebasestorage.app",
    messagingSenderId: "652707479711",
    appId: "1:652707479711:web:b7185b679a324a2b2a62aa"
};
const app = initializeApp(firebaseMessagingSw);
const messaging = getMessaging(app);

export {messaging};
