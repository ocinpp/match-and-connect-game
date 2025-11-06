<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isVisible"
        class="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg"
      >
        <div class="flex flex-col items-center gap-6 px-6">
          <!-- Spinner -->
          <div class="relative w-20 h-20 md:w-24 md:h-24">
            <!-- Outer spinning ring -->
            <div
              class="absolute inset-0 rounded-full border-4 border-transparent border-t-cyber-blue border-r-neon-purple animate-spin"
            ></div>
            <!-- Inner pulsing circle -->
            <div
              class="absolute inset-2 rounded-full bg-gradient-to-br from-cyber-blue/20 to-neon-purple/20 animate-pulse"
            ></div>
            <!-- Center icon -->
            <div
              class="absolute inset-0 flex items-center justify-center text-cyber-blue"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-10 h-10 md:w-12 md:h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <!-- Loading Text -->
          <div class="text-center">
            <h2
              class="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-cyber-blue via-neon-purple to-matrix-green bg-clip-text text-transparent"
            >
              Loading Cards
            </h2>
            <p class="text-gray-400 text-sm md:text-base">
              {{ loadingMessage }}
            </p>
          </div>

          <!-- Progress Bar -->
          <div class="w-64 md:w-80">
            <div class="h-2 bg-card-bg rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-cyber-blue to-neon-purple transition-all duration-300 ease-out"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 text-center mt-2">
              {{ loadedCount }}/{{ totalCount }} images loaded
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  isVisible: boolean;
  loadedCount: number;
  totalCount: number;
}

const props = defineProps<Props>();

const progress = computed(() => {
  if (props.totalCount === 0) return 0;
  return Math.round((props.loadedCount / props.totalCount) * 100);
});

const loadingMessage = computed(() => {
  if (props.loadedCount === 0) {
    return "Preparing your cards...";
  } else if (props.loadedCount < props.totalCount) {
    return `Loading ${progress.value}%...`;
  } else {
    return "Ready to play!";
  }
});
</script>

<style scoped>
/* Fade transition for loading screen */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Pulse animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

