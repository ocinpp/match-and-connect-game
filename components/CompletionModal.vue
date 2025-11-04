<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

        <!-- Modal Content -->
        <div
          class="relative bg-gradient-to-br from-card-bg to-dark-bg border-2 border-matrix-green rounded-xl max-w-xl w-full shadow-glow-highlight animate-match-pulse overflow-hidden"
        >
          <!-- Confetti/Celebration Background Effect -->
          <div class="absolute inset-0 opacity-20 pointer-events-none">
            <div
              class="absolute top-0 left-1/4 w-2 h-2 bg-neon-purple rounded-full animate-ping"
            ></div>
            <div
              class="absolute top-1/4 right-1/4 w-2 h-2 bg-cyber-blue rounded-full animate-ping"
              style="animation-delay: 0.2s"
            ></div>
            <div
              class="absolute bottom-1/4 left-1/3 w-2 h-2 bg-matrix-green rounded-full animate-ping"
              style="animation-delay: 0.4s"
            ></div>
          </div>

          <!-- Content -->
          <div class="relative p-8 text-center">
            <!-- Trophy Icon -->
            <div class="mb-6 flex justify-center">
              <div class="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-24 h-24 text-matrix-green animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <!-- Glow effect -->
                <div
                  class="absolute inset-0 bg-matrix-green/30 blur-xl rounded-full"
                ></div>
              </div>
            </div>

            <!-- Title -->
            <h2 class="text-4xl md:text-5xl font-bold text-matrix-green mb-3">
              Congratulations!
            </h2>
            <p class="text-xl text-white mb-8">All Connections Discovered!</p>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4 mb-8">
              <!-- Final Time -->
              <div
                class="bg-dark-bg/50 rounded-lg p-4 border border-neon-purple/30"
              >
                <div class="flex items-center justify-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-neon-purple"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p class="text-xs text-gray-400 uppercase tracking-wide">
                    Final Time
                  </p>
                </div>
                <p class="text-2xl font-mono font-bold text-white">
                  {{ formattedTime }}
                </p>
              </div>

              <!-- Total Matches -->
              <div
                class="bg-dark-bg/50 rounded-lg p-4 border border-matrix-green/30"
              >
                <div class="flex items-center justify-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-matrix-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p class="text-xs text-gray-400 uppercase tracking-wide">
                    Matches
                  </p>
                </div>
                <p class="text-2xl font-bold text-white">
                  {{ totalMatches }}/{{ totalMatches }}
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                class="flex-1 py-3 px-6 bg-gradient-to-r from-cyber-blue to-neon-purple hover:from-cyber-blue/80 hover:to-neon-purple/80 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
                @click="handlePlayAgain"
              >
                🔄 Play Again
              </button>
              <button
                class="flex-1 py-3 px-6 bg-matrix-green/20 hover:bg-matrix-green/30 text-matrix-green border border-matrix-green font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
                @click="handleClose"
              >
                ✨ Continue Exploring
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean;
  formattedTime: string;
  totalMatches: number;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
  playAgain: [];
}>();

const handleClose = () => {
  emit("close");
};

const handlePlayAgain = () => {
  emit("playAgain");
};

// Close on Escape key
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  window.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    window.removeEventListener("keydown", handleEscape);
  });
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9);
}
</style>
