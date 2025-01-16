<template>
  <TransitionRoot as="template" :show="openPopup">
    <Dialog class="relative z-10" @close="handleClick">
      <TransitionChild as="template"
                       enter="duration-300 ease-out"
                       enter-from="opacity-0"
                       enter-to="opacity-100"
                       leave="duration-200 ease-in"
                       leave-from="opacity-100"
                       leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-900/45 r-0 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full justify-center items-center p-4 text-center sm:items-center">
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all flex flex-col w-full sm:my-8">
              <div class="bg-gray-900 px-4 pb-4 pt-4">
                <div class="items-center justify-center relative">
                  <div class="mt-3">
                    <DialogTitle as="h3" class="text-base font-semibold text-center">Изменить имя
                    </DialogTitle>
                  </div>
                  <div v-if="error"
                       class="absolute left-1/2 -translate-x-1/2 w-full -bottom-6 flex items-center justify-center gap-2">
                    <ExclamationTriangleIcon class="size-4 text-red-500" aria-hidden="true"/>
                    <div class="text-center text-xs text-red-500">
                      {{ error }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-900 px-4 pb-4 pt-4">
                <label for="name" class=" text-sm/6 font-medium">Новое имя</label>
                <div class="mt-2">
                  <input v-model="name" type="text" name="name" id="name" autocomplete="name" required
                         class="w-full px-3 rounded-md bg-gray-900 py-1.5 text-base outline outline-1 outline-white -outline-offset-1 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"/>
                </div>
              </div>
              <div class="bg-gray-900 px-4 py-4 items-center flex flex-col ">
                <button
                    v-if="!authStore.loader"
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-orange-600 outline-none py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:w-auto"
                    @click="async() =>{
                    await updateUser()
                    if (!error) handleClick()}">
                  Изменить имя
                </button>
                <Loading v-else :full-screen="false"/>
                <button type="button"
                        class="mt-3 inline-flex text-center justify-center rounded-md w-full  py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-900 sm:w-auto"
                        @click="handleClick" ref="cancelButtonRef">Закрыть без изменений
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";
import {ref} from "vue";
import Loading from "@/components/Loading.vue";
import {ExclamationTriangleIcon} from "@heroicons/vue/24/outline/index.js";

const name = ref('')

const error = ref('123')

const router = useRouter()

const authStore = useAuthStore()

defineProps({
  openPopup: {
    type: Boolean,
    required: true
  },
  handleClick: {
    type: Function,
    required: true
  }
})

const updateUser = async () => {
  if (!name.value) {
    return error.value = 'Имя не может быть пустым'
  } else {
    error.value = ''
    await authStore.updateUser(name.value)
    name.value = ''
  }
}

</script>




