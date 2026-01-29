<template>
  <div class="container">
    <div v-if="!currentRoomId">
      <section class="mb-4">
        <Title title="Мои текущие игры" :show-all="false"/>
        <div v-if="myRooms.length === 0" class="text-black text-center">У вас пока нет активных игр</div>
        <div v-else v-for="room in myRooms" :key="room.id" class="relative">
          <div class="text-black flex items-center w-full h-10 relative">
            <div class="flex flex-col">
              <span>Комната: {{ room.id }}</span>
              <span class="text-xs text-gray-400">Против: {{ getOpponent(room) }}</span>
            </div>
            <button
                class="absolute h-10 top-1/2 -translate-y-1/2 right-0 text-s bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 px-4 py-2 rounded-md text-white"
                @click="enterRoom(room.id)"
            >Играть
            </button>
          </div>
          <button @click="enterRoom(room.id)" class="btn-play">Играть</button>
        </div>
      </section>

      <section class="mb-4">
        <Title title="Создать новую игру" :show-all="false"/>

        <div class="relative">
          <input
              class="flex w-full items-center text-sm text-black bg-gray-100 outline-none placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-none sm:text-sm/6 rounded-md"
              v-model="newRoomName"
              placeholder="Название (ID) комнаты"
          />
          <button
              class="absolute top-1/2 -translate-y-1/2 right-0 text-s bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 h-full px-4 py-2 rounded-md text-white"
              @click="createNewRoom"
              :disabled="!newRoomName">Создать
          </button>
        </div>
      </section>

      <section class="mb-4">
        <Title title="Найти комнату по ID" :show-all="false"/>

        <div class="relative">
          <input
              class="flex w-full items-center text-sm text-black bg-gray-100 outline-none placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-none sm:text-sm/6 rounded-md"
              v-model="searchId"
              placeholder="Введите ID для поиска..."
          />
          <button
              class="absolute top-1/2 -translate-y-1/2 right-0 text-s bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 h-full px-4 py-2 rounded-md text-white"
              @click="searchAndJoin"
          >Войти
          </button>
        </div>
      </section>

    </div>

    <GameDetail
        v-else
        :room-id="currentRoomId"
        :user="user"
        @leave-game="currentRoomId = null"
    />
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from 'firebase/auth';
import {getDatabase, ref as dbRef, onValue, get, set, remove} from 'firebase/database';
import GameDetail from './GameDetail.vue';
import Title from "@/components/ui/Title.vue";
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/vue/24/outline/index.js";

const auth = getAuth();
const db = getDatabase();

const user = ref(null);
const currentRoomId = ref(null);
const newRoomName = ref('');
const searchId = ref('');
const myRooms = ref([]);

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u;
    if (u) listenMyRooms();
  });
});

// Слушаем только изменения в комнатах
function listenMyRooms() {
  const roomsRef = dbRef(db, 'rooms');
  onValue(roomsRef, (snapshot) => {
    const data = snapshot.val();
    const active = [];
    if (data) {
      for (let id in data) {
        const room = data[id];
        // Проверяем, участвует ли текущий юзер в этой комнате
        if (room.whitePlayer === user.value.email || room.redPlayer === user.value.email) {
          // Если игра помечена как завершенная — удаляем её
          if (room.status === 'finished') {
            remove(dbRef(db, `rooms/${id}`));
          } else {
            active.push({id, ...room});
          }
        }
      }
    }
    myRooms.value = active;
  });
}

const createNewRoom = async () => {
  const id = newRoomName.value.trim();
  const rRef = dbRef(db, `rooms/${id}`);
  const snap = await get(rRef);

  if (snap.exists()) return alert("Комната с таким ID уже существует");

  // Инициализируем комнату, где создатель — белые
  await set(rRef, {
    whitePlayer: user.value.email,
    redPlayer: null,
    status: 'playing',
    turn: 'white',
    board: JSON.stringify(createInitialBoard())
  });

  currentRoomId.value = id;
  newRoomName.value = '';
};

const searchAndJoin = async () => {
  const id = searchId.value.trim();
  const rRef = dbRef(db, `rooms/${id}`);
  const snap = await get(rRef);

  if (!snap.exists()) return alert("Комната не найдена");

  const data = snap.val();
  // Если мы уже там или есть свободное место
  if (data.whitePlayer !== user.value.email && !data.redPlayer) {
    await set(dbRef(db, `rooms/${id}/redPlayer`), user.value.email);
  }

  currentRoomId.value = id;
  searchId.value = '';
};

const enterRoom = (id) => currentRoomId.value = id;
const getOpponent = (room) => room.whitePlayer === user.value.email ? (room.redPlayer || 'Ожидание...') : room.whitePlayer;
const signIn = () => signInWithPopup(auth, new GoogleAuthProvider());
const logout = () => signOut(auth);

function createInitialBoard() {
  const b = Array(8).fill(null).map(() => Array(8).fill(0));
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 !== 0) {
        if (r < 3) b[r][c] = {color: 'red', isKing: false};
        if (r > 4) b[r][c] = {color: 'white', isKing: false};
      }
    }
  }
  return b;
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  color: #fff;
}

.action-section {
  background: #34495e;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.row {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: none;
}


.room-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c3e50;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
}

.btn-exit {
  background: #c0392b;
  font-size: 12px;
}
</style>