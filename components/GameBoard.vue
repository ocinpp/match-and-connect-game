<template>
  <div class="game-board min-h-screen bg-dark-bg text-white p-4 md:p-6 lg:p-8">
    <!-- Header -->
    <header class="text-center mb-4 md:mb-6">
      <h1
        class="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-cyber-blue via-neon-purple to-matrix-green bg-clip-text text-transparent"
      >
        Match and Connect
      </h1>
      <p class="text-gray-400 text-sm md:text-base lg:text-lg">
        Drag cards to slots to discover their connections
      </p>
    </header>

    <!-- Main Game Area - Horizontal Layout -->
    <div class="max-w-7xl mx-auto">
      <!-- Desktop: Side by side layout, Mobile: Stacked -->
      <div class="flex flex-col lg:flex-row gap-4 md:gap-6">
        <!-- Left Side: Card Rows -->
        <div class="flex-1 flex flex-col gap-4 lg:min-w-0">
          <!-- Row 1: Cards -->
          <div class="card-row flex gap-2 items-stretch flex-1">
            <!-- Vertical Row Title -->
            <div
              class="flex-shrink-0 flex items-center justify-center bg-cyber-blue/10 rounded-lg px-1"
            >
              <h2
                class="text-sm md:text-base font-semibold text-cyber-blue flex items-center gap-2"
                style="writing-mode: sideways-lr"
              >
                <span
                  class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-cyber-blue/20 flex items-center justify-center text-xs"
                  >1</span
                >
                <span>Row 1</span>
              </h2>
            </div>
            <!-- Cards Container -->
            <div class="flex-1 overflow-x-auto scrollbar-hide relative">
              <div class="flex gap-4 min-w-min h-full pr-8">
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
              <!-- Scroll indicator gradient -->
              <div
                class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dark-bg to-transparent pointer-events-none"
              ></div>
            </div>
          </div>

          <!-- Row 2: Cards -->
          <div class="card-row flex gap-2 items-stretch flex-1">
            <!-- Vertical Row Title -->
            <div
              class="flex-shrink-0 flex items-center justify-center bg-cyber-blue/10 rounded-lg px-1"
            >
              <h2
                class="text-sm md:text-base font-semibold text-cyber-blue flex items-center gap-2"
                style="writing-mode: sideways-lr"
              >
                <span
                  class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-cyber-blue/20 flex items-center justify-center text-xs"
                  >2</span
                >
                <span>Row 2</span>
              </h2>
            </div>
            <!-- Cards Container -->
            <div class="flex-1 overflow-x-auto scrollbar-hide relative">
              <div class="flex gap-4 min-w-min h-full pr-8">
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
              <!-- Scroll indicator gradient -->
              <div
                class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dark-bg to-transparent pointer-events-none"
              ></div>
            </div>
          </div>
        </div>

        <!-- Right Side: Drop Slots (Desktop) / Bottom (Mobile) -->
        <div
          class="lg:w-auto flex-shrink-0 mt-6 lg:mt-0 pt-4 lg:pt-0 border-t-2 lg:border-t-0 lg:border-l-2 border-cyber-blue/30 lg:pl-4 xl:pl-6 lg:relative"
        >
          <!-- Mobile: Horizontal layout with title on left -->
          <div class="lg:hidden flex gap-2 items-stretch">
            <!-- Mobile: Horizontal title on left -->
            <div
              class="flex-shrink-0 flex items-center justify-center bg-neon-purple/10 rounded-lg px-1"
            >
              <h2
                class="text-sm md:text-base font-semibold text-neon-purple flex items-center gap-2"
                style="writing-mode: sideways-lr"
              >
                <span
                  class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-neon-purple/20 flex items-center justify-center text-xs"
                  >3</span
                >
                <span>Match Slots</span>
              </h2>
            </div>
            <!-- Slots container - take remaining space -->
            <div class="flex gap-3 sm:gap-4 flex-1">
              <!-- Slot 1 -->
              <div class="flex-1">
                <DropSlot
                  :slot-index="1"
                  :card="slot1"
                  :should-shake="shouldShakeSlots"
                  @card-dropped="handleCardDropped"
                  @card-removed="handleCardRemoved"
                  @slot-clicked="handleSlotClick"
                />
              </div>
              <!-- Slot 2 -->
              <div class="flex-1">
                <DropSlot
                  :slot-index="2"
                  :card="slot2"
                  :should-shake="shouldShakeSlots"
                  @card-dropped="handleCardDropped"
                  @card-removed="handleCardRemoved"
                  @slot-clicked="handleSlotClick"
                />
              </div>
            </div>
          </div>

          <!-- Desktop: Vertical layout aligned with rows -->
          <div class="hidden lg:flex lg:flex-col gap-4 justify-start">
            <!-- Slot 1 - Aligns with Row 1 -->
            <div class="flex gap-2 items-stretch flex-1">
              <!-- Vertical Slot Title (Desktop only) -->
              <div
                class="hidden lg:flex flex-shrink-0 items-center justify-center bg-neon-purple/10 rounded-lg px-1"
              >
                <h2
                  class="text-sm md:text-base font-semibold text-neon-purple flex items-center gap-2"
                  style="writing-mode: sideways-lr"
                >
                  <span
                    class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-neon-purple/20 flex items-center justify-center text-xs"
                    >1</span
                  >
                  <span>Slot 1</span>
                </h2>
              </div>
              <DropSlot
                :slot-index="1"
                :card="slot1"
                :should-shake="shouldShakeSlots"
                @card-dropped="handleCardDropped"
                @card-removed="handleCardRemoved"
                @slot-clicked="handleSlotClick"
              />
            </div>

            <!-- Slot 2 - Aligns with Row 2 -->
            <div class="flex gap-2 items-stretch flex-1">
              <!-- Vertical Slot Title (Desktop only) -->
              <div
                class="hidden lg:flex flex-shrink-0 items-center justify-center bg-neon-purple/10 rounded-lg px-1"
              >
                <h2
                  class="text-sm md:text-base font-semibold text-neon-purple flex items-center gap-2"
                  style="writing-mode: sideways-lr"
                >
                  <span
                    class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-neon-purple/20 flex items-center justify-center text-xs"
                    >2</span
                  >
                  <span>Slot 2</span>
                </h2>
              </div>
              <DropSlot
                :slot-index="2"
                :card="slot2"
                :should-shake="shouldShakeSlots"
                @card-dropped="handleCardDropped"
                @card-removed="handleCardRemoved"
                @slot-clicked="handleSlotClick"
              />
            </div>
          </div>

          <!-- Check Match Button - Mobile: below slots, Desktop: absolutely positioned -->
          <div
            class="flex justify-center mt-4 md:mt-6 lg:absolute lg:-bottom-20 lg:left-0 lg:right-0 lg:ml-[calc(1rem+0.5rem)] lg:px-4 xl:px-6"
          >
            <button
              v-if="areBothSlotsFilled"
              class="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-cyber-blue to-neon-purple hover:from-cyber-blue/80 hover:to-neon-purple/80 text-white font-bold text-base md:text-lg rounded-lg transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-glow-primary"
              @click="handleCheckMatch"
            >
              Check Match
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Match Modal -->
    <MatchModal
      :is-open="isModalOpen"
      :relationship="currentRelationship"
      :card1="orderedCard1"
      :card2="orderedCard2"
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
import { ref, nextTick, computed } from "vue";
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

// Computed properties to get cards in the correct order based on relationship
const orderedCard1 = computed(() => {
  if (!currentRelationship.value || !slot1.value || !slot2.value) {
    return slot1.value;
  }

  const cardIds = currentRelationship.value.cardIds;
  // Return the card that matches the first ID in the relationship
  if (slot1.value.id === cardIds[0]) {
    return slot1.value;
  } else if (slot2.value.id === cardIds[0]) {
    return slot2.value;
  }
  return slot1.value;
});

const orderedCard2 = computed(() => {
  if (!currentRelationship.value || !slot1.value || !slot2.value) {
    return slot2.value;
  }

  const cardIds = currentRelationship.value.cardIds;
  // Return the card that matches the second ID in the relationship
  if (slot1.value.id === cardIds[1]) {
    return slot1.value;
  } else if (slot2.value.id === cardIds[1]) {
    return slot2.value;
  }
  return slot2.value;
});

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

/* Hide scrollbar but keep scrolling functionality */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Custom scrollbar for card rows (fallback if not using scrollbar-hide) */
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
