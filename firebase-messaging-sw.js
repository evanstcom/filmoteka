importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyD036jwFy2asDyY4AvY6UIQwXwzejynCfM",
    authDomain: "filmoteka-by-evans.firebaseapp.com",
    projectId: "filmoteka-by-evans",
    storageBucket: "filmoteka-by-evans.firebasestorage.app",
    messagingSenderId: "652707479711",
    appId: "1:652707479711:web:b7185b679a324a2b2a62aa"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/img/icons/192x192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});