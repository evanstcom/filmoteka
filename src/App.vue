<script setup>
import Header from "@/components/layouts/Header.vue"
import {initializeApp} from "firebase/app";
import {getToken, onMessage} from "firebase/messaging";
import {getMessaging} from "firebase/messaging/sw";
import {onMounted} from "vue";

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
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

getToken(messaging, {vapidKey: 'BPLWoA5EryQNWtQIwl6EnJjvpufIc4h2QlIc6YuvB3TGmwB-whOjddQLHS9afM6-0J62JvQQ8U7KkdE6PUATyBk'}).then((currentToken) => {
  if (currentToken) {
    console.log('currentToken', currentToken);
    alert(currentToken);
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

function requestNotificationPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Разрешение на уведомления получено!');
      // Здесь можно инициализировать Firebase Cloud Messaging
    } else {
      console.log('Разрешение на уведомления отклонено.');
    }
  });
}

// Вызываем функцию, когда пользователь готов получить уведомления

onMounted(() => {
  requestNotificationPermission();
})
</script>

<template>
  <Header/>
  <main class="mt-2">
    <RouterView/>
  </main>
</template>

<style scoped lang="sass">
</style>