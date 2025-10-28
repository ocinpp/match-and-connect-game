<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="isVisible"
        class="fixed top-8 left-1/2 transform -translate-x-1/2 z-50
               bg-red-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-lg
               shadow-2xl border-2 border-red-400 max-w-md"
        style="box-shadow: 0 0 30px rgba(239, 68, 68, 0.5)"
      >
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <p class="font-semibold">{{ message }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  message: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
})

const isVisible = ref(false)
let timeoutId: NodeJS.Timeout | null = null

const show = () => {
  isVisible.value = true
  
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  
  timeoutId = setTimeout(() => {
    isVisible.value = false
  }, props.duration)
}

const hide = () => {
  isVisible.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
}

// Watch for message changes to auto-show
watch(() => props.message, (newMessage) => {
  if (newMessage) {
    show()
  }
})

defineExpose({
  show,
  hide,
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>

