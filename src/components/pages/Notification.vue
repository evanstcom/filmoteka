<template>
  <section class="container mx-auto p-1">
    <Title title="Уведомления"/>
    <div class="mb-4">
      <h3 class="text-sm break-words text-orange-600">Token</h3>
      <h3 v-if="token" class="text-sm break-words">{{ token }}</h3>
      <h3 v-else class="text-sm break-words">Токен не найден</h3>
      <div class="text-center">
        <button v-if="token" @click="copyText"
                class="my-2 rounded-full bg-orange-600 px-4 py-2 text-center">Скопировать токен
        </button>
      </div>
    </div>
    <div>
      <h3 class="text-sm break-words text-orange-600">Уведомления</h3>
      <h3 class="text-sm break-words">{{ notification }}</h3>
      <div class="text-center">
        <button v-if="notificationRequest" @click="notificationPermission"
                class="my-2 rounded-full bg-orange-600 px-4 py-2 text-center">Разрешить
          уведомления
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import Title from "@/components/Title.vue";
import {onMounted, ref} from "vue";
import {initializeApp} from "firebase/app";
import {getToken, onMessage} from "firebase/messaging";
import {getMessaging} from "firebase/messaging/sw";

const token = ref(localStorage.getItem('token') ? localStorage.getItem('token') : '');
const notification = ref('')
const notificationRequest = ref(false)

const notificationPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Разрешение на уведомления получено!');
      notification.value = 'Разрешение на уведомления получено'
      notificationRequest.value = false
    } else {
      console.log('Разрешение на уведомления отклонено.');
      notification.value = 'Разрешение на уведомления отклонено'
      notificationRequest.value = true
    }
  });
}

const copyText = () => {
  navigator.clipboard.writeText(token.value).then(() => {
    console.log('Текст скопирован в буфер обмена');
  })
}

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

const messaging = getMessaging();

const tokenNotification = ref(localStorage.getItem('token') ? localStorage.getItem('token') : '');

const getTokenNotification = () => {
  getToken(messaging, {vapidKey: 'BPLWoA5EryQNWtQIwl6EnJjvpufIc4h2QlIc6YuvB3TGmwB-whOjddQLHS9afM6-0J62JvQQ8U7KkdE6PUATyBk'}).then((currentToken) => {
    if (currentToken) {
      console.log('currentToken', currentToken);
      tokenNotification.value = currentToken
      localStorage.setItem('token', currentToken)
      token.value = currentToken
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

onMounted(() => {
  notificationPermission()
  if (!token.value) getTokenNotification()
})
</script>

<style lang="scss" scoped>

</style>