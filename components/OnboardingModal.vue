<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="onboarding-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
    >
      <div
        class="onboarding-modal glass-enhanced rounded-2xl max-w-2xl w-full overflow-hidden"
        style="
          background: linear-gradient(
            135deg,
            rgba(26, 31, 58, 0.95) 0%,
            rgba(21, 26, 51, 0.95) 100%
          );
          border: 2px solid;
          border-image: linear-gradient(
              135deg,
              rgba(255, 0, 110, 0.8),
              rgba(0, 217, 255, 0.6),
              rgba(255, 0, 110, 0.8)
            )
            1;
          box-shadow: 0 0 40px rgba(255, 0, 110, 0.4),
            0 0 80px rgba(0, 217, 255, 0.2),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
        "
      >
        <!-- Pages Container with Slide Transition -->
        <div class="relative overflow-hidden min-h-[500px] max-h-[80vh]">
          <!-- Page 1: Welcome Screen -->
          <Transition name="slide">
            <div
              v-if="currentPage === 1"
              key="page1"
              class="page-content absolute inset-0 px-6 py-8 md:py-12 flex flex-col items-center justify-center"
            >
              <!-- Icon/Logo -->
              <div class="text-center mb-6">
                <div
                  class="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyber-blue to-neon-purple mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-10 h-10 md:w-12 md:h-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>

              <!-- Title -->
              <h1
                class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyber-blue via-neon-purple to-matrix-green bg-clip-text text-transparent"
              >
                Drop and Match
              </h1>

              <!-- Tagline -->
              <p class="text-lg md:text-xl text-center text-gray-300 mb-8">
                Match Cards, Discover Connections
              </p>

              <!-- Page Indicators -->
              <div class="flex justify-center gap-2 mb-8">
                <div
                  class="w-2 h-2 rounded-full transition-all duration-300"
                  :class="
                    currentPage === 1 ? 'bg-neon-purple w-6' : 'bg-gray-600'
                  "
                ></div>
                <div
                  class="w-2 h-2 rounded-full transition-all duration-300"
                  :class="
                    currentPage === 2 ? 'bg-neon-purple w-6' : 'bg-gray-600'
                  "
                ></div>
              </div>

              <!-- Buttons -->
              <div class="flex gap-3">
                <button
                  @click="handleSkip"
                  class="flex-1 py-3 px-6 bg-gradient-to-r from-cyber-blue to-neon-purple hover:from-cyber-blue/80 hover:to-neon-purple/80 text-white font-bold rounded-lg transition-all duration-200 active:scale-95"
                >
                  Start
                </button>
                <button
                  @click="goToPage2"
                  class="flex-1 py-3 px-6 border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200 active:scale-95"
                >
                  Instructions
                </button>
              </div>
            </div>
          </Transition>

          <!-- Page 2: Instructions Screen -->
          <Transition name="slide">
            <div
              v-if="currentPage === 2"
              key="page2"
              class="page-content absolute inset-0 px-6 py-6 overflow-y-auto bg-dark-bg flex flex-col"
              style="touch-action: pan-y; -webkit-overflow-scrolling: touch"
            >
              <!-- Title -->
              <h2
                class="text-2xl md:text-3xl font-bold text-center text-neon-purple mb-6"
              >
                How to Play
              </h2>

              <!-- Instructions Content -->
              <div class="space-y-5">
                <!-- Goal Section -->
                <div class="instruction-section">
                  <h3
                    class="text-lg font-bold text-cyber-blue mb-2 flex items-center gap-2"
                  >
                    <span>🎯</span>
                    <span>Goal</span>
                  </h3>
                  <p class="text-sm text-gray-300 leading-relaxed">
                    <strong class="text-white">Discover all connections</strong>
                    between cards.
                    <span class="text-gray-400"
                      >Find all matches to complete the game!</span
                    >
                  </p>
                </div>

                <!-- Divider -->
                <div class="border-t border-cyber-blue/30"></div>

                <!-- How to Play Section - Device Specific -->
                <div class="instruction-section">
                  <h3
                    class="text-lg font-bold text-cyber-blue mb-3 flex items-center gap-2"
                  >
                    <span>🎮</span>
                    <span>How to Play</span>
                  </h3>

                  <!-- Mobile Instructions -->
                  <div v-if="isTouchDevice">
                    <ul class="space-y-2 text-sm text-gray-300">
                      <li class="flex items-start gap-2">
                        <span class="text-neon-purple mt-1 font-bold">•</span>
                        <span>
                          <strong class="text-white">Tap to select:</strong>
                          <span class="text-gray-400 block text-xs mt-0.5"
                            >Tap a card, then tap an empty slot</span
                          >
                        </span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="text-neon-purple mt-1 font-bold">•</span>
                        <span>
                          <strong class="text-white"
                            >Long-press to drag:</strong
                          >
                          <span class="text-gray-400 block text-xs mt-0.5"
                            >Hold for 0.6s (watch the purple ring!), then drag
                            to slot</span
                          >
                        </span>
                      </li>
                    </ul>
                  </div>

                  <!-- Desktop Instructions -->
                  <div v-else>
                    <ul class="space-y-2 text-sm text-gray-300">
                      <li class="flex items-start gap-2">
                        <span class="text-neon-purple mt-1 font-bold">•</span>
                        <span>
                          <strong class="text-white">Drag and drop:</strong>
                          <span class="text-gray-400 block text-xs mt-0.5"
                            >Click and drag cards to the match slots</span
                          >
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Divider -->
                <div class="border-t border-cyber-blue/30"></div>

                <!-- Timer Section -->
                <div class="instruction-section">
                  <h3
                    class="text-lg font-bold text-cyber-blue mb-2 flex items-center gap-2"
                  >
                    <span>⏱️</span>
                    <span>Timer</span>
                  </h3>
                  <p class="text-sm text-gray-300 leading-relaxed">
                    <strong class="text-white">Timer starts</strong> when you
                    first interact with a card.
                    <span class="text-gray-400 block text-xs mt-1"
                      >Try to discover all connections as fast as you can!</span
                    >
                  </p>
                </div>

                <!-- Divider -->
                <div class="border-t border-cyber-blue/30"></div>

                <!-- Managing Cards Section -->
                <div class="instruction-section">
                  <h3
                    class="text-lg font-bold text-cyber-blue mb-2 flex items-center gap-2"
                  >
                    <span>🔄</span>
                    <span>Managing Cards</span>
                  </h3>
                  <ul class="space-y-2 text-sm text-gray-300">
                    <li class="flex items-start gap-2">
                      <span class="text-neon-purple mt-1 font-bold">•</span>
                      <span>
                        <strong class="text-white">Remove cards:</strong>
                        <span class="text-gray-400 block text-xs mt-0.5"
                          >Click/tap the ✕ button to remove a card from a
                          slot</span
                        >
                      </span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-neon-purple mt-1 font-bold">•</span>
                      <span>
                        <strong class="text-white">One match per pair:</strong>
                        <span class="text-gray-400 block text-xs mt-0.5"
                          >Each connection can only be discovered once</span
                        >
                      </span>
                    </li>
                  </ul>
                </div>

                <!-- Divider -->
                <div class="border-t border-cyber-blue/30"></div>

                <!-- Completion Section -->
                <div class="instruction-section">
                  <h3
                    class="text-lg font-bold text-cyber-blue mb-2 flex items-center gap-2"
                  >
                    <span>✨</span>
                    <span>Completion</span>
                  </h3>
                  <p class="text-sm text-gray-300 leading-relaxed">
                    <strong class="text-white"
                      >When all connections are found,</strong
                    >
                    view the gallery to see all relationships.
                    <span class="text-gray-400 block text-xs mt-1"
                      >Then play again to beat your time!</span
                    >
                  </p>
                </div>
              </div>

              <!-- Page Indicators -->
              <div class="flex justify-center gap-2 my-6">
                <div
                  class="w-2 h-2 rounded-full transition-all duration-300"
                  :class="
                    currentPage === 1 ? 'bg-neon-purple w-6' : 'bg-gray-600'
                  "
                ></div>
                <div
                  class="w-2 h-2 rounded-full transition-all duration-300"
                  :class="
                    currentPage === 2 ? 'bg-neon-purple w-6' : 'bg-gray-600'
                  "
                ></div>
              </div>

              <!-- Button -->
              <button
                @click="handleStartPlaying"
                class="w-full py-3 px-6 bg-gradient-to-r from-cyber-blue to-neon-purple hover:from-cyber-blue/80 hover:to-neon-purple/80 text-white font-bold rounded-lg transition-all duration-200 active:scale-95"
              >
                Start Playing
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

interface Props {
  show: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

// Page state
const currentPage = ref(1);

// Device detection - treat iPads and touch devices as mobile
const isTouchDevice = computed(() => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
});

// Navigation
const goToPage2 = () => {
  currentPage.value = 2;
};

const handleSkip = () => {
  emit("close");
};

const handleStartPlaying = () => {
  emit("close");
};

// Reset to page 1 when modal opens
onMounted(() => {
  currentPage.value = 1;
});
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .onboarding-modal,
.modal-leave-active .onboarding-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .onboarding-modal {
  transform: scale(0.9);
  opacity: 0;
}

.modal-leave-to .onboarding-modal {
  transform: scale(0.9);
  opacity: 0;
}

/* Slide transition for pages */
.slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
}

.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

/* Scrollbar styling */
.page-content::-webkit-scrollbar {
  width: 8px;
}

.page-content::-webkit-scrollbar-track {
  background: transparent;
}

.page-content::-webkit-scrollbar-thumb {
  background: rgb(139, 92, 246);
  border-radius: 4px;
}

.page-content::-webkit-scrollbar-thumb:hover {
  background: rgb(124, 58, 237);
}

/* Instruction sections */
.instruction-section {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Prevent text selection on mobile */
@media (max-width: 1023px) {
  .onboarding-modal {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
}
</style>
