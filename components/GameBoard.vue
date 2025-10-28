<template>
  <div class="game-board min-h-screen bg-dark-bg text-white p-4 md:p-6 lg:p-8">
    <!-- Header -->
    <header class="text-center mb-4 md:mb-6">
      <h1
        class="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-cyber-blue via-neon-purple to-matrix-green bg-clip-text text-transparent"
      >
        Cyber Match
      </h1>
      <p class="text-gray-400 text-sm md:text-base lg:text-lg">
        Drag cards to slots to discover their connections
      </p>
    </header>

    <!-- Main Game Area -->
    <div class="max-w-7xl mx-auto space-y-4 md:space-y-6">
      <!-- Row 1: Cards -->
      <div class="card-row">
        <h2
          class="text-lg md:text-xl font-semibold text-cyber-blue mb-2 md:mb-3 flex items-center gap-2"
        >
          <span
            class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-cyber-blue/20 flex items-center justify-center text-xs md:text-sm"
            >1</span
          >
          <span class="text-sm md:text-base lg:text-xl"
            >Available Cards - Row 1</span
          >
        </h2>
        <div class="overflow-x-auto pb-2 md:pb-3">
          <div class="flex gap-4 min-w-min">
            <GameCard
              v-for="card in cardDistribution.row1"
              :key="card.id"
              :card="card"
              :is-disabled="isCardDisabled(card.id)"
              :is-selected="selectedCard?.id === card.id"
              @drag-start="handleDragStart"
              @click="handleCardClick"
            />
          </div>
        </div>
      </div>

      <!-- Row 2: Cards -->
      <div class="card-row">
        <h2
          class="text-lg md:text-xl font-semibold text-cyber-blue mb-2 md:mb-3 flex items-center gap-2"
        >
          <span
            class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-cyber-blue/20 flex items-center justify-center text-xs md:text-sm"
            >2</span
          >
          <span class="text-sm md:text-base lg:text-xl"
            >Available Cards - Row 2</span
          >
        </h2>
        <div class="overflow-x-auto pb-2 md:pb-3">
          <div class="flex gap-4 min-w-min">
            <GameCard
              v-for="card in cardDistribution.row2"
              :key="card.id"
              :card="card"
              :is-disabled="isCardDisabled(card.id)"
              :is-selected="selectedCard?.id === card.id"
              @drag-start="handleDragStart"
              @click="handleCardClick"
            />
          </div>
        </div>
      </div>

      <!-- Row 3: Drop Slots -->
      <div
        class="drop-slots-row mt-6 md:mt-8 pt-4 md:pt-6 border-t-2 border-cyber-blue/30"
      >
        <h2
          class="text-lg md:text-xl font-semibold text-neon-purple mb-2 md:mb-3 flex items-center gap-2"
        >
          <span
            class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-xs md:text-sm"
            >3</span
          >
          <span class="text-sm md:text-base lg:text-xl">Match Slots</span>
        </h2>
        <div class="flex gap-4 md:gap-6 lg:gap-8 justify-center">
          <DropSlot
            :slot-index="1"
            :card="slot1"
            :should-shake="shouldShakeSlots"
            @card-dropped="handleCardDropped"
            @card-removed="handleCardRemoved"
            @slot-clicked="handleSlotClick"
          />
          <DropSlot
            :slot-index="2"
            :card="slot2"
            :should-shake="shouldShakeSlots"
            @card-dropped="handleCardDropped"
            @card-removed="handleCardRemoved"
            @slot-clicked="handleSlotClick"
          />
        </div>

        <!-- Check Match Button -->
        <div class="text-center mt-4 md:mt-6">
          <button
            v-if="areBothSlotsFilled"
            class="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyber-blue to-neon-purple hover:from-cyber-blue/80 hover:to-neon-purple/80 text-white font-bold text-base md:text-lg rounded-lg transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
            style="box-shadow: 0 0 20px rgba(0, 240, 255, 0.5)"
            @click="handleCheckMatch"
          >
            Check Match
          </button>
        </div>
      </div>
    </div>

    <!-- Match Modal -->
    <MatchModal
      :is-open="isModalOpen"
      :relationship="currentRelationship"
      :card1="slot1"
      :card2="slot2"
      @close="handleModalClose"
    />

    <!-- Toast Notification -->
    <ToastNotification
      v-if="toastMessage"
      ref="toastRef"
      :message="toastMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useGameState } from "~/composables/useGameState";
import type { Card, Relationship } from "~/composables/useGameState";

const {
  slot1,
  slot2,
  cardDistribution,
  areBothSlotsFilled,
  isCardDisabled,
  placeCardInSlot,
  removeCardFromSlot,
  checkMatch,
} = useGameState();

// UI State
const selectedCard = ref<Card | null>(null);
const targetSlot = ref<number | null>(null);
const isModalOpen = ref(false);
const currentRelationship = ref<Relationship | null>(null);
const shouldShakeSlots = ref(false);
const toastMessage = ref("");
const toastRef = ref<InstanceType<typeof ToastNotification> | null>(null);

// Drag and Drop Handlers
const handleDragStart = (card: Card) => {
  selectedCard.value = card;
};

// Card Click Handler (for tap-to-select on mobile)
const handleCardClick = (card: Card) => {
  if (isCardDisabled(card.id)) {
    return;
  }

  // If no card selected, select this card
  if (!selectedCard.value) {
    selectedCard.value = card;
    return;
  }

  // If same card clicked, deselect
  if (selectedCard.value.id === card.id) {
    selectedCard.value = null;
    return;
  }

  // If different card clicked, change selection
  selectedCard.value = card;
};

// Slot Click Handler (for tap-to-place on mobile)
const handleSlotClick = (slotIndex: number) => {
  if (!selectedCard.value) {
    return;
  }

  // Try to place the selected card in the clicked slot
  const success = placeCardInSlot(selectedCard.value, slotIndex);
  if (success) {
    selectedCard.value = null;
  }
};

// Card Dropped Handler
const handleCardDropped = (card: Card, slotIndex: number) => {
  placeCardInSlot(card, slotIndex);
  selectedCard.value = null;
};

// Card Removed Handler
const handleCardRemoved = (slotIndex: number) => {
  removeCardFromSlot(slotIndex);
};

// Check Match Handler
const handleCheckMatch = async () => {
  const relationship = checkMatch();

  if (relationship) {
    // Match found!
    currentRelationship.value = relationship;
    isModalOpen.value = true;
  } else {
    // No match - show toast and shake slots
    toastMessage.value = "No connection found between these cards!";
    nextTick(() => {
      toastRef.value?.show();
    });

    // Trigger shake animation
    shouldShakeSlots.value = true;
    setTimeout(() => {
      shouldShakeSlots.value = false;
    }, 500);
  }
};

// Modal Close Handler
const handleModalClose = () => {
  isModalOpen.value = false;
  currentRelationship.value = null;
  // Note: Cards stay in slots as per user preference (Option A)
};
</script>

<style scoped>
.card-row {
  @apply relative;
}

/* Custom scrollbar for card rows */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  @apply bg-dark-bg rounded-full;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  @apply bg-cyber-blue/50 rounded-full;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-cyber-blue;
}
</style>
