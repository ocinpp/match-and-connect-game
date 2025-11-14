<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Enhanced Backdrop -->
        <div class="absolute inset-0 bg-black/85 backdrop-blur-md"></div>

        <!-- Modal Content with Enhanced Glass Effect -->
        <div
          class="relative glass-enhanced rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-match-pulse"
          style="
            background: linear-gradient(
              135deg,
              rgba(26, 31, 58, 0.95) 0%,
              rgba(21, 26, 51, 0.95) 100%
            );
            border: 2px solid;
            border-image: linear-gradient(
                135deg,
                rgba(255, 214, 10, 0.8),
                rgba(0, 255, 159, 0.6),
                rgba(255, 214, 10, 0.8)
              )
              1;
            box-shadow: 0 0 40px rgba(255, 214, 10, 0.4),
              0 0 80px rgba(0, 255, 159, 0.2),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
          "
        >
          <!-- Header -->
          <div
            class="sticky top-0 border-b border-neon-mint/20 p-6 z-10"
            style="
              background: linear-gradient(
                180deg,
                rgba(26, 31, 58, 0.98) 0%,
                rgba(26, 31, 58, 0.95) 100%
              );
              backdrop-filter: blur(10px);
            "
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
                  <div>
                    <h2
                      class="text-3xl font-bold text-neon-mint"
                      style="
                        text-shadow: 0 0 20px rgba(0, 255, 159, 0.5),
                          0 0 40px rgba(0, 255, 159, 0.3);
                      "
                    >
                      Match Found!
                    </h2>
                    <p
                      v-if="!isNewDiscovery"
                      class="text-yellow-400 text-sm mt-1 flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      Already Discovered
                    </p>
                    <p
                      v-else
                      class="text-neon-purple text-sm mt-1 flex items-center gap-1 animate-pulse"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                      New Discovery!
                    </p>
                  </div>
                </div>
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
  isNewDiscovery?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isNewDiscovery: true,
});

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
