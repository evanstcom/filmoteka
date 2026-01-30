<template>
  <div class="">
    <div class="fixed z-50 top-4 left-4">
      <div @click="$emit('leave-game')" class="cursor-pointer h-8 inline-block p-2 rounded-md">
        <img src="/right_arrow.svg" alt="back" class="rotate-180 w-4">
      </div>
    </div>
    <div v-if="!board.length" class="text-black text-center">Загрузка игры...</div>
    <div v-else class="text-black mt-8 ">
      <div class="flex flex-col gap-2 mb-14">
        <div :class="currentPlayer === 'white' ? 'text-gray-50' : 'text-red-600'"
             class="w-1/2 self-center text-lg bg-gray-300 rounded-md flex justify-center text-gray-50">
          {{ isMyTurn ? 'Ваш ход' : 'Ход соперника' }}
        </div>
        <div>
          <p>Комната: <strong>{{ roomId }}</strong></p>
          <p>Вы: <strong>{{ localRole === 'white' ? 'Белые' : 'Черные' }}</strong></p>
        </div>
      </div>

      <div class="board" :class="{ 'wait-turn': !isMyTurn }">
        <div v-for="(row, r) in board" :key="r" class="board-row">
          <div
              v-for="(cell, c) in row"
              :key="c"
              class="square"
              :class="[(r + c) % 2 === 0 ? 'light' : 'dark', { 'target': isHighlight(r, c) }]"
              @click="handleSquareClick(r, c)"
          >
            <div
                v-if="cell"
                class="piece"
                :class="[cell.color, { 'king': cell.isKing, 'selected': isSelected(r, c) }]"
            ></div>
            <div v-if="isHighlight(r, c)" class="dot"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PopupEndGame :handle-click="handlePopup" :open-popup="openPopup" :text="endGameText"/>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import {getDatabase, ref as dbRef, onValue, update, off} from 'firebase/database';
import PopupEndGame from "@/components/popups/PopupEndGame.vue";
import {useRouter} from "vue-router";


const props = defineProps({
  roomId: {type: String, required: true},
  user: {type: Object, required: true}
});

const emit = defineEmits(['leave-game']);

const db = getDatabase();
const roomRef = dbRef(db, `rooms/${props.roomId}`);

// Реактивное состояние
const board = ref([]);
const currentPlayer = ref('white');
const mustJumpFrom = ref(null);
const selectedPiece = ref(null);
const validMoves = ref([]);
const localRole = ref(null);
const openPopup = ref(false);

const endGameText = ref('Игра завершена')

const router = useRouter()

const isMyTurn = computed(() => currentPlayer.value === localRole.value);
const isSelected = (r, c) => selectedPiece.value?.r === r && selectedPiece.value?.c === c;
const isHighlight = (r, c) => validMoves.value.some(m => m.r === r && m.c === c);

const handlePopup = () => {
  openPopup.value = !openPopup.value
}

onMounted(() => {
  // Подписываемся на изменения комнаты
  onValue(roomRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // Определяем роль игрока на основе его email, если она еще не определена
    if (data.whitePlayer === props.user.email) localRole.value = 'white';
    else if (data.redPlayer === props.user.email) localRole.value = 'red';

    board.value = JSON.parse(data.board);
    currentPlayer.value = data.turn;
    mustJumpFrom.value = data.mustJumpFrom || null;

    // Проверка на завершение игры
    checkGameOver();
  });
});

onUnmounted(() => {
  off(roomRef); // Отключаем слушатель при выходе
});

// --- ЛОГИКА ШАШЕК ---

function handleSquareClick(r, c) {
  if (!isMyTurn.value) return;

  const move = validMoves.value.find(m => m.r === r && m.c === c);
  if (move) {
    executeMove(move);
    return;
  }

  const piece = board.value[r][c];
  if (piece && piece.color === localRole.value) {
    if (mustJumpFrom.value && (mustJumpFrom.value.r !== r || mustJumpFrom.value.c !== c)) return;
    selectedPiece.value = {r, c};
    validMoves.value = calculateMoves(r, c, piece);
  }
}

function calculateMoves(r, c, piece) {
  let moves = [];
  const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

  dirs.forEach(([dr, dc]) => {
    if (piece.isKing) {
      let enemy = null;
      for (let i = 1; i < 8; i++) {
        let nr = r + dr * i, nc = c + dc * i;
        if (nr < 0 || nr > 7 || nc < 0 || nc > 7) break;
        let cell = board.value[nr][nc];
        if (!cell) {
          if (!enemy) moves.push({r: nr, c: nc, type: 'move'});
          else moves.push({r: nr, c: nc, type: 'jump', killR: enemy.r, killC: enemy.c});
        } else {
          if (cell.color === piece.color) break;
          if (enemy) break;
          enemy = {r: nr, c: nc};
        }
      }
    } else {
      // Обычная шашка
      let nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && !board.value[nr][nc]) {
        if ((piece.color === 'white' && dr === -1) || (piece.color === 'red' && dr === 1)) {
          moves.push({r: nr, c: nc, type: 'move'});
        }
      }
      let jr = r + dr * 2, jc = c + dc * 2;
      if (jr >= 0 && jr < 8 && jc >= 0 && jc < 8 && !board.value[jr][jc]) {
        let mid = board.value[r + dr][c + dc];
        if (mid && mid.color !== piece.color) {
          moves.push({r: jr, c: jc, type: 'jump', killR: r + dr, killC: c + dc});
        }
      }
    }
  });

  const jumps = moves.filter(m => m.type === 'jump');
  return jumps.length > 0 ? jumps : (mustJumpFrom.value ? [] : moves);
}

async function executeMove(move) {
  const newBoard = JSON.parse(JSON.stringify(board.value));
  let piece = {...newBoard[selectedPiece.value.r][selectedPiece.value.c]};

  newBoard[selectedPiece.value.r][selectedPiece.value.c] = 0;
  if (move.type === 'jump') newBoard[move.killR][move.killC] = 0;

  // Дамка
  if (!piece.isKing && ((piece.color === 'white' && move.r === 0) || (piece.color === 'red' && move.r === 7))) {
    piece.isKing = true;
  }
  newBoard[move.r][move.c] = piece;

  // Проверка на серийный бой
  let canJumpAgain = false;
  if (move.type === 'jump') {
    // Временная подмена для расчета
    const tempBoard = board.value;
    board.value = newBoard;
    const nextJumps = calculateMoves(move.r, move.c, piece).filter(m => m.type === 'jump');
    board.value = tempBoard;
    if (nextJumps.length > 0) canJumpAgain = true;
  }

  await update(roomRef, {
    board: JSON.stringify(newBoard),
    turn: canJumpAgain ? piece.color : (piece.color === 'white' ? 'red' : 'white'),
    mustJumpFrom: canJumpAgain ? {r: move.r, c: move.c} : null
  });

  selectedPiece.value = null;
  validMoves.value = [];
}

// Проверка на победу
function checkGameOver() {
  let whitePieces = 0;
  let redPieces = 0;

  board.value.forEach(row => {
    row.forEach(cell => {
      if (cell.color === 'white') whitePieces++;
      if (cell.color === 'red') redPieces++;
    });
  });

  if (whitePieces === 0 || redPieces === 0) {
    const winner = whitePieces === 0 ? 'Черные' : 'Белые';
    endGameText.value = `Игра окончена! Победили ${winner}`;
    update(roomRef, {status: 'finished'});
    openPopup.value = true
  }
}
</script>

<style scoped>
.board {
  --square-size: 11.5vw; /* Размер клетки зависит от ширины экрана */
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  border: 2px solid #000000;
  background: #3d2b1f;
  touch-action: manipulation; /* Убирает задержку клика на мобилках */
}

/* На больших экранах ограничиваем размер доски */
@media (min-width: 500px) {
  .board {
    --square-size: 60px;
  }
}

.board-row {
  display: flex;
}

.square {
  width: var(--square-size);
  height: var(--square-size);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.piece {
  width: 85%;
  height: 85%;
  border-radius: 50%;
  z-index: 2;
  transition: transform 0.1s;
}

/* Увеличиваем размер дамки для наглядности */
.piece.king::after {
  font-size: calc(var(--square-size) * 0.5);
  content: '👑';
  color: #f1c40f;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.dot {
  width: 30%;
  height: 30%;
  background: #2ecc71;
  border-radius: 50%;
  border: 2px solid white;
}

.board.wait-turn {
  opacity: 0.7;
  pointer-events: none;
  filter: contrast(0.8);
}

.dark {
  background: #a4a9b0;
}

.light {
  background: #ffffff;
}


.piece.white {
  background: radial-gradient(circle at 15px 15px, #fff, #d5d5d5);
  border: 1px solid #bbbbbb;
}

.piece.red {
  background: radial-gradient(circle at 15px 15px, #504f4f, #1e1b1b);
  border: 1px solid #151010;
}

.piece.selected {
  transform: scale(1.15);
  box-shadow: 0 0 15px #f1c40f;
  border: 2px solid #f1c40f;
}

</style>