<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <div
          class="relative bg-card-bg border-2 border-matrix-green rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-glow-highlight animate-match-pulse"
        >
          <!-- Header -->
          <div
            class="sticky top-0 bg-card-bg border-b border-matrix-green/30 p-6 z-10"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 text-matrix-green"
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
                  <h2 class="text-3xl font-bold text-matrix-green">
                    Match Found!
                  </h2>
                </div>
                <!-- <p class="text-cyber-blue text-sm">{{ relationship?.type }}</p> -->
              </div>

              <button
                class="ml-4 w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center transition-colors"
                @click="close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-white"
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
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="p-6 space-y-6">
            <!-- Relationship Title -->
            <div>
              <h3 class="text-2xl font-bold text-white mb-2">
                {{ relationship?.title }}
              </h3>
            </div>

            <!-- Cards Display -->
            <div class="flex items-start justify-center gap-3 md:gap-6">
              <!-- Card 1 -->
              <div class="flex-shrink-0 flex-grow-0">
                <div
                  class="w-24 h-full md:w-32 md:h-48 rounded-lg overflow-hidden border-2 border-cyber-blue"
                >
                  <img
                    :src="card1?.imageUrl"
                    :alt="card1?.title"
                    class="w-full h-full object-cover"
                  />
                </div>
                <p
                  class="w-24 md:w-32 text-center text-white font-semibold mt-2 break-words md:break-normal"
                >
                  {{ card1?.title }}
                </p>
              </div>

              <!-- Connection Arrow -->
              <div class="flex flex-col items-center my-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-12 h-12 text-neon-purple animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
                <p
                  class="text-center text-neon-purple text-sm font-semibold mt-2"
                >
                  {{ relationship?.type }}
                </p>
              </div>

              <!-- Card 2 -->
              <div class="flex-shrink-0 flex-grow-0">
                <div
                  class="w-24 h-full md:w-32 md:h-48 rounded-lg overflow-hidden border-2 border-cyber-blue"
                >
                  <img
                    :src="card2?.imageUrl"
                    :alt="card2?.title"
                    class="w-full h-full object-cover"
                  />
                </div>
                <p
                  class="w-24 md:w-32 text-center text-white font-semibold mt-2 break-words md:break-normal"
                  lang="en"
                >
                  {{ card2?.title }}
                </p>
              </div>
            </div>

            <!-- Description -->
            <div
              class="bg-dark-bg/50 rounded-lg p-6 border border-cyber-blue/30"
            >
              <h4 class="text-cyber-blue font-semibold mb-3 text-lg">
                Relationship Details
              </h4>
              <p class="text-gray-300 leading-relaxed">
                {{ relationship?.description }}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="sticky bottom-0 bg-card-bg border-t border-matrix-green/30 p-6"
          >
            <button
              class="w-full py-3 px-6 bg-matrix-green hover:bg-matrix-green/80 text-dark-bg font-bold rounded-lg transition-colors transform hover:scale-105 active:scale-95"
              @click="close"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Card, Relationship } from "~/composables/useGameState";

interface Props {
  isOpen: boolean;
  relationship: Relationship | null;
  card1: Card | null;
  card2: Card | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const close = () => {
  emit("close");
};

// Close on Escape key
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && props.isOpen) {
      close();
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
