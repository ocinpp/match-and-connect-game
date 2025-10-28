<template>
  <div
    :class="[
      'drop-slot',
      'relative w-[150px] h-[225px] md:w-[180px] md:h-[270px] rounded-lg',
      'border-2 border-dashed transition-all duration-300',
      isDragOver
        ? 'border-matrix-green bg-matrix-green/10 scale-105'
        : 'border-cyber-blue/50 bg-slot-bg',
      hasCard ? 'border-solid border-neon-purple' : '',
      shouldShake ? 'animate-shake' : '',
    ]"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.prevent="handleDrop"
    @click="handleClick"
  >
    <!-- Empty Slot State -->
    <div
      v-if="!card"
      class="absolute inset-0 flex flex-col items-center justify-center text-cyber-blue/50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-16 h-16 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      <p class="text-sm font-semibold">Slot {{ slotIndex }}</p>
      <p class="text-xs mt-1">Drop or Tap Card</p>
    </div>

    <!-- Card in Slot -->
    <div v-else class="absolute inset-0 cursor-pointer group">
      <!-- Card Image -->
      <div class="absolute inset-0">
        <img
          :src="card.imageUrl"
          :alt="card.title"
          class="w-full h-full object-cover rounded-lg"
        />
        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent rounded-lg"
        ></div>
      </div>

      <!-- Card Title -->
      <div class="absolute bottom-0 left-0 right-0 p-2 md:p-4">
        <h3
          class="text-white font-bold text-sm md:text-base lg:text-lg text-center drop-shadow-lg"
        >
          {{ card.title }}
        </h3>
      </div>

      <!-- Remove Button -->
      <button
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        @click.stop="handleRemove"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-white"
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

      <!-- Glow Effect -->
      <div
        class="absolute inset-0 pointer-events-none rounded-lg animate-glow-pulse"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Card } from "~/composables/useGameState";

interface Props {
  slotIndex: number;
  card: Card | null;
  shouldShake?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  card: null,
  shouldShake: false,
});

const emit = defineEmits<{
  cardDropped: [card: Card, slotIndex: number];
  cardRemoved: [slotIndex: number];
  slotClicked: [slotIndex: number];
}>();

const isDragOver = ref(false);
const hasCard = ref(!!props.card);

// Watch for card changes
watch(
  () => props.card,
  (newCard) => {
    hasCard.value = !!newCard;
  }
);

const handleDragOver = (event: DragEvent) => {
  if (props.card) {
    // Don't allow drop if slot is already filled
    event.dataTransfer!.dropEffect = "none";
    return;
  }

  isDragOver.value = true;
  event.dataTransfer!.dropEffect = "move";
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false;

  if (props.card) {
    // Slot already has a card
    return;
  }

  try {
    const cardData = event.dataTransfer?.getData("application/json");
    if (cardData) {
      const card: Card = JSON.parse(cardData);
      emit("cardDropped", card, props.slotIndex);
    }
  } catch (error) {
    console.error("Error parsing dropped card data:", error);
  }
};

const handleRemove = () => {
  emit("cardRemoved", props.slotIndex);
};

const handleClick = () => {
  emit("slotClicked", props.slotIndex);
};
</script>

<style scoped>
.drop-slot {
  flex-shrink: 0;
  user-select: none;
  -webkit-user-select: none;
}
</style>
