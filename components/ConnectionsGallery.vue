<template>
  <Teleport to="body">
    <Transition name="gallery">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/95 backdrop-blur-md"
          @click="handleClose"
        ></div>

        <!-- Gallery Content -->
        <div
          class="relative bg-gradient-to-br from-card-bg to-dark-bg border-2 border-cyber-blue rounded-xl max-w-6xl w-full max-h-[90vh] shadow-glow-highlight overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between p-6 border-b border-cyber-blue/30"
          >
            <div>
              <h2 class="text-3xl font-bold text-cyber-blue mb-1">
                🔗 All Connections
              </h2>
              <p class="text-gray-400 text-sm">
                {{ discoveredCount }}/{{ totalRelationships }} Relationships
                Discovered
              </p>
            </div>
            <button
              class="p-2 hover:bg-white/10 rounded-lg transition-colors"
              @click="handleClose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-gray-400 hover:text-white"
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

          <!-- Scrollable Grid -->
          <div class="flex-1 overflow-y-auto p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Relationship Card -->
              <div
                v-for="(relationship, index) in relationships"
                :key="index"
                class="bg-dark-bg/50 border rounded-lg p-4 transition-all hover:border-neon-purple hover:shadow-glow-highlight"
                :class="
                  isDiscovered(relationship)
                    ? 'border-matrix-green/50'
                    : 'border-gray-700/50 opacity-50'
                "
              >
                <!-- Cards Preview -->
                <div class="flex items-center gap-3 mb-3">
                  <!-- Card 1 -->
                  <div
                    class="flex-1 flex items-center gap-2 bg-card-bg/50 rounded-lg p-2"
                  >
                    <img
                      v-if="getCard(relationship.cardIds[0])"
                      :src="getCard(relationship.cardIds[0])!.imageUrl"
                      :alt="getCard(relationship.cardIds[0])!.title"
                      class="hidden md:block w-12 h-12 rounded object-cover"
                    />
                    <span class="text-sm font-medium text-white truncate">
                      {{ getCard(relationship.cardIds[0])?.title }}
                    </span>
                  </div>

                  <!-- Connection Icon -->
                  <div class="flex-shrink-0">
                    <svg
                      v-if="isDiscovered(relationship)"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-matrix-green"
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
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <!-- Card 2 -->
                  <div
                    class="flex-1 flex items-center gap-2 bg-card-bg/50 rounded-lg p-2"
                  >
                    <img
                      v-if="getCard(relationship.cardIds[1])"
                      :src="getCard(relationship.cardIds[1])!.imageUrl"
                      :alt="getCard(relationship.cardIds[1])!.title"
                      class="hidden md:block w-12 h-12 rounded object-cover"
                    />
                    <span class="text-sm font-medium text-white truncate">
                      {{ getCard(relationship.cardIds[1])?.title }}
                    </span>
                  </div>
                </div>

                <!-- Relationship Info -->
                <div v-if="isDiscovered(relationship)">
                  <!-- Type Badge -->
                  <div class="mb-2">
                    <span
                      class="inline-block px-2 py-1 text-xs font-semibold rounded bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                    >
                      {{ relationship.type }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 class="text-lg font-bold text-white mb-2">
                    {{ relationship.title }}
                  </h3>

                  <!-- Description -->
                  <p class="text-sm text-gray-300 leading-relaxed">
                    {{ relationship.description }}
                  </p>
                </div>

                <!-- Locked State -->
                <div v-else class="text-center py-4">
                  <p class="text-gray-500 text-sm">🔒 Not yet discovered</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="p-6 border-t border-cyber-blue/30 bg-dark-bg/50">
            <button
              class="w-full py-3 px-6 bg-gradient-to-r from-cyber-blue to-neon-purple hover:from-cyber-blue/80 hover:to-neon-purple/80 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              @click="handlePlayAgain"
            >
              🔄 Play Again
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
  relationships: Relationship[];
  cards: Card[];
  discoveredRelationshipIds: Set<string>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  playAgain: [];
}>();

// Computed
const totalRelationships = computed(() => props.relationships.length);

const discoveredCount = computed(() => props.discoveredRelationshipIds.size);

// Methods
const getCard = (cardId: string): Card | undefined => {
  return props.cards.find((card) => card.id === cardId);
};

const getRelationshipId = (cardId1: string, cardId2: string): string => {
  return [cardId1, cardId2].sort().join("-");
};

const isDiscovered = (relationship: Relationship): boolean => {
  const relId = getRelationshipId(
    relationship.cardIds[0]!,
    relationship.cardIds[1]!
  );
  return props.discoveredRelationshipIds.has(relId);
};

const handleClose = () => {
  emit("close");
};

const handlePlayAgain = () => {
  emit("playAgain");
};

// Close on Escape key
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && props.isOpen) {
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
.gallery-enter-active,
.gallery-leave-active {
  transition: opacity 0.3s ease;
}

.gallery-enter-from,
.gallery-leave-to {
  opacity: 0;
}

.gallery-enter-active .relative,
.gallery-leave-active .relative {
  transition: transform 0.3s ease;
}

.gallery-enter-from .relative,
.gallery-leave-to .relative {
  transform: scale(0.95);
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 255, 0.3);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 255, 0.5);
}
</style>
