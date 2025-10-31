<template>
  <div
    class="game-board min-h-dvh bg-dark-bg text-white p-4 md:p-6 lg:p-8"
    @contextmenu="handleContextMenu"
  >
    <!-- Header -->
    <header class="text-center mb-4 md:mb-6">
      <h1
        class="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-cyber-blue via-neon-purple to-matrix-green bg-clip-text text-transparent"
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
            <div class="flex-1 relative overflow-hidden">
              <div class="overflow-x-auto scrollbar-hide h-full">
                <div class="flex gap-4 min-w-min h-full pr-8">
                  <GameCard
                    v-for="card in cardDistribution.row1"
                    :key="card.id"
                    :card="card"
                    :is-disabled="isCardDisabled(card.id)"
                    :is-selected="selectedCard?.id === card.id"
                    @drag-start="handleDragStart"
                    @click="handleCardClick"
                    @touch-drag-start="handleCardTouchDragStart"
                    @touch-drag-move="handleCardTouchDragMove"
                    @touch-drag-end="handleCardTouchDragEnd"
                  />
                </div>
              </div>
              <!-- Fixed gradient overlay - positioned absolutely, won't scroll -->
              <div
                class="scroll-fade-gradient"
                style="pointer-events: none"
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
            <div class="flex-1 relative overflow-hidden">
              <div class="overflow-x-auto scrollbar-hide h-full">
                <div class="flex gap-4 min-w-min h-full pr-8">
                  <GameCard
                    v-for="card in cardDistribution.row2"
                    :key="card.id"
                    :card="card"
                    :is-disabled="isCardDisabled(card.id)"
                    :is-selected="selectedCard?.id === card.id"
                    @drag-start="handleDragStart"
                    @click="handleCardClick"
                    @touch-drag-start="handleCardTouchDragStart"
                    @touch-drag-move="handleCardTouchDragMove"
                    @touch-drag-end="handleCardTouchDragEnd"
                  />
                </div>
              </div>
              <!-- Fixed gradient overlay - positioned absolutely, won't scroll -->
              <div
                class="scroll-fade-gradient"
                style="pointer-events: none"
              ></div>
            </div>
          </div>
        </div>

        <!-- Right Side: Drop Slots (Desktop) / Bottom (Mobile) -->
        <div
          class="lg:w-auto flex-shrink-0 md:mt-6 lg:mt-0 pt-4 lg:pt-0 border-t-2 lg:border-t-0 lg:border-l-2 border-cyber-blue/30 lg:pl-4 xl:pl-6 lg:relative"
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
            <div class="flex justify-start gap-4 sm:gap-4 flex-1 pr-0">
              <!-- Slot 1 -->
              <div ref="slot1Ref">
                <DropSlot
                  :slot-index="1"
                  :card="slot1"
                  :should-shake="shouldShakeSlots"
                  :touch-position="touchPosition"
                  :is-drag-mode-active="!!activeDragCard"
                  @card-dropped="handleCardDropped"
                  @card-removed="handleCardRemoved"
                  @slot-clicked="handleSlotClick"
                />
              </div>
              <!-- Slot 2 -->
              <div ref="slot2Ref">
                <DropSlot
                  :slot-index="2"
                  :card="slot2"
                  :should-shake="shouldShakeSlots"
                  :touch-position="touchPosition"
                  :is-drag-mode-active="!!activeDragCard"
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
        </div>
      </div>
    </div>

    <!-- Check Match Modal (Auto-opens when slots filled) -->
    <div
      v-if="isCheckMatchModalOpen && areBothSlotsFilled"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click="handleCancelCheckMatch"
    >
      <div
        class="bg-dark-bg border-2 border-cyber-blue rounded-lg p-6 max-w-sm mx-4"
        @click.stop
      >
        <h2 class="text-2xl font-bold text-white mb-4 text-center">
          Check Match?
        </h2>
        <p class="text-gray-300 text-center mb-6">
          Are you ready to check if these cards match?
        </p>
        <div class="flex gap-3">
          <button
            class="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-all duration-200"
            @click="handleCancelCheckMatch"
          >
            Cancel
          </button>
          <button
            class="flex-1 px-4 py-3 bg-gradient-to-r from-cyber-blue to-neon-purple hover:from-cyber-blue/80 hover:to-neon-purple/80 text-white font-bold rounded-lg transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-glow-primary"
            @click="handleCheckMatchFromModal"
          >
            Check
          </button>
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

    <!-- Mobile Drag Ghost - Floating card that follows finger -->
    <Transition name="drag-ghost">
      <div
        v-if="showDragGhost && activeDragCard && touchPosition"
        class="drag-ghost-card"
        :style="{
          left: `${touchPosition.x}px`,
          top: `${touchPosition.y}px`,
        }"
      >
        <!-- Card Image -->
        <div class="absolute inset-0">
          <img
            :src="activeDragCard.imageUrl"
            :alt="activeDragCard.title"
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
            {{ activeDragCard.title }}
          </h3>
        </div>

        <!-- Glow Effect -->
        <div
          class="absolute inset-0 pointer-events-none rounded-lg shadow-glow-card"
        ></div>
      </div>
    </Transition>

    <!-- Onboarding Modal -->
    <OnboardingModal :show="showOnboarding" @close="closeOnboarding" />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch } from "vue";
import { useGameState } from "~/composables/useGameState";
import type { Card, Relationship } from "~/composables/useGameState";
import { haptics } from "~/utils/haptics";
import { GAME_CONFIG } from "~/config/gameConfig";
import { useOnboarding } from "~/composables/useOnboarding";

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

// Onboarding
const { showOnboarding, closeOnboarding } = useOnboarding();

// UI State
const selectedCard = ref<Card | null>(null);
const isModalOpen = ref(false);
const isCheckMatchModalOpen = ref(false);
const currentRelationship = ref<Relationship | null>(null);
const shouldShakeSlots = ref(false);
const toastMessage = ref("");
const toastRef = ref<InstanceType<typeof ToastNotification> | null>(null);
const userCancelledCheckMatch = ref(false);

// ===== NEW STATE - MOBILE TOUCH DRAG =====
const activeDragCard = ref<Card | null>(null);
const touchPosition = ref<{ x: number; y: number } | null>(null);
const slot1Ref = ref<HTMLElement | null>(null);
const slot2Ref = ref<HTMLElement | null>(null);
const showDragGhost = ref(false); // Show floating ghost card

// Detect mobile device
const isMobile = computed(() => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < GAME_CONFIG.MOBILE_BREAKPOINT;
});

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

// Watch for both slots filled - auto-open modal on mobile
watch(
  () => areBothSlotsFilled.value,
  (newVal) => {
    if (newVal && !userCancelledCheckMatch.value) {
      // Auto-open modal on mobile when both slots are filled
      isCheckMatchModalOpen.value = true;
    }
  }
);

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
  // Reset the cancel flag when a card is removed
  userCancelledCheckMatch.value = false;
  // Close modal if it's open
  isCheckMatchModalOpen.value = false;
};

// ===== NEW MOBILE TOUCH DRAG HANDLERS =====

/**
 * Helper to check if touch coordinates are within element bounds
 */
const isTouchInElement = (
  touchX: number,
  touchY: number,
  element: HTMLElement | null
): boolean => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  return (
    touchX >= rect.left &&
    touchX <= rect.right &&
    touchY >= rect.top &&
    touchY <= rect.bottom
  );
};

/**
 * Handle touch drag start from GameCard
 */
const handleCardTouchDragStart = (
  card: Card,
  touchX: number,
  touchY: number
) => {
  activeDragCard.value = card;
  touchPosition.value = { x: touchX, y: touchY };
  showDragGhost.value = true;
};

/**
 * Handle touch drag move from GameCard
 */
const handleCardTouchDragMove = (touchX: number, touchY: number) => {
  if (!activeDragCard.value) return;

  touchPosition.value = { x: touchX, y: touchY };

  // Check if over a drop zone and trigger haptic
  const overSlot1 = isTouchInElement(touchX, touchY, slot1Ref.value);
  const overSlot2 = isTouchInElement(touchX, touchY, slot2Ref.value);

  // Trigger light haptic when entering a drop zone
  // (We'll need to track previous state to avoid repeated haptics)
  if (overSlot1 || overSlot2) {
    // TODO: Add debouncing to prevent repeated haptics
  }
};

/**
 * Handle touch drag end from GameCard
 */
const handleCardTouchDragEnd = (touchX: number, touchY: number) => {
  if (!activeDragCard.value) return;

  // Check which slot (if any) the touch ended over
  const overSlot1 = isTouchInElement(touchX, touchY, slot1Ref.value);
  const overSlot2 = isTouchInElement(touchX, touchY, slot2Ref.value);

  let success = false;

  if (overSlot1 && !slot1.value) {
    // Drop in slot 1
    success = placeCardInSlot(activeDragCard.value, 1);
    if (success) {
      haptics.successfulDrop();
    }
  } else if (overSlot2 && !slot2.value) {
    // Drop in slot 2
    success = placeCardInSlot(activeDragCard.value, 2);
    if (success) {
      haptics.successfulDrop();
    }
  }

  if (!success) {
    // Invalid drop
    haptics.invalidDrop();
  }

  // Reset drag state
  activeDragCard.value = null;
  touchPosition.value = null;
  showDragGhost.value = false;
};

/**
 * Handle context menu - prevent on mobile to avoid interference with touch interactions
 */
const handleContextMenu = (event: MouseEvent) => {
  // Only prevent on mobile devices
  if (isMobile.value) {
    event.preventDefault();
  }
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

// Cancel Check Match Handler (Mobile)
const handleCancelCheckMatch = () => {
  isCheckMatchModalOpen.value = false;
  userCancelledCheckMatch.value = true;
};

// Check Match Handler from Modal (Mobile)
const handleCheckMatchFromModal = async () => {
  isCheckMatchModalOpen.value = false;
  await handleCheckMatch();
};

// Modal Close Handler
const handleModalClose = () => {
  isModalOpen.value = false;
  currentRelationship.value = null;
  // Note: Cards stay in slots as per user preference (Option A)
};
</script>

<style scoped>
/* Mobile-specific: Prevent text selection and context menu */
@media (max-width: 1023px) {
  .game-board {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none; /* Disable iOS callout on long press */
    -webkit-tap-highlight-color: transparent; /* Remove tap highlight */
  }
}

.card-row {
  @apply relative;
}

/* Fixed gradient overlay - separate element that doesn't scroll */
.scroll-fade-gradient {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 6rem; /* 96px - wider gradient */
  background: linear-gradient(
    to left,
    rgb(10, 14, 39) 0%,
    rgba(10, 14, 39, 0.8) 30%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 10;
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

/* Mobile Drag Ghost Card */
.drag-ghost-card {
  position: fixed;
  width: 150px;
  height: 225px;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%) scale(1.1);
  opacity: 0.9;
  border: 2px solid rgb(139, 92, 246);
  border-radius: 0.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.8),
    0 0 60px rgba(139, 92, 246, 0.4);
  filter: brightness(1.1);
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
}

/* Drag ghost transition */
.drag-ghost-enter-active,
.drag-ghost-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.drag-ghost-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}

.drag-ghost-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}

/* Larger ghost on desktop for better visibility */
@media (min-width: 768px) {
  .drag-ghost-card {
    width: 180px;
    height: 270px;
  }
}
</style>
