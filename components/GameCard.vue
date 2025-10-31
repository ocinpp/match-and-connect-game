<template>
  <div
    :class="[
      'game-card',
      'relative w-[150px] h-[225px] md:w-[180px] md:h-[270px] rounded-lg overflow-hidden cursor-pointer',
      'border-2 transition-all duration-300',
      isDisabled
        ? 'opacity-40 cursor-not-allowed border-gray-600'
        : isSelected
        ? 'border-neon-purple ring-neon-purple'
        : 'border-cyber-blue hover:border-neon-purple',
      isDragging ? 'opacity-50 scale-95' : '',
      isDragMode ? 'drag-mode-active' : '',
      isLongPressing ? 'long-pressing' : '',
    ]"
    :draggable="!isDisabled"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @click="handleClick"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchCancel"
    @contextmenu="handleContextMenu"
  >
    <!-- Card Image -->
    <div class="absolute inset-0">
      <img
        :src="card.imageUrl"
        :alt="card.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent"
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

    <!-- Glow Effect when not disabled -->
    <div
      v-if="!isDisabled"
      class="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 shadow-glow-card"
    ></div>

    <!-- Disabled Overlay -->
    <div
      v-if="isDisabled"
      class="absolute inset-0 bg-dark-bg/60 flex items-center justify-center"
    >
      <div class="text-gray-400 text-sm font-semibold">In Use</div>
    </div>

    <!-- Long Press Progress Ring (Mobile Only) -->
    <div
      v-if="showProgressRing && isMobile"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <svg class="long-press-ring" width="80" height="80" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          stroke="rgba(139, 92, 246, 0.3)"
          stroke-width="4"
        />
        <circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          stroke="rgb(139, 92, 246)"
          stroke-width="4"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="
            circumference - (longPressProgress / 100) * circumference
          "
          class="progress-circle"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { Card } from "~/composables/useGameState";
import { GAME_CONFIG, isDragModeEnabled } from "~/config/gameConfig";
import { haptics } from "~/utils/haptics";

interface Props {
  card: Card;
  isDisabled?: boolean;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isSelected: false,
});

const emit = defineEmits<{
  dragStart: [card: Card];
  dragEnd: [];
  click: [card: Card];
  // New mobile drag events
  touchDragStart: [card: Card, touchX: number, touchY: number];
  touchDragMove: [touchX: number, touchY: number];
  touchDragEnd: [touchX: number, touchY: number];
}>();

// ===== EXISTING STATE - DO NOT MODIFY =====
const isDragging = ref(false);
const isMobile = ref(false);

// ===== NEW STATE - MOBILE LONG PRESS & DRAG =====
const longPressTimer = ref<number | null>(null);
const showProgressRingTimer = ref<number | null>(null);
const isLongPressing = ref(false);
const showProgressRing = ref(false); // Only show ring after delay
const isDragMode = ref(false);
const dragStartPos = ref<{ x: number; y: number } | null>(null);
const longPressProgress = ref(0);
const progressInterval = ref<number | null>(null);

// Calculate circumference for progress ring (2 * PI * radius)
const circumference = computed(() => 2 * Math.PI * 35);

// Detect if device is mobile
onMounted(() => {
  isMobile.value = window.innerWidth < GAME_CONFIG.MOBILE_BREAKPOINT;
});

// Cleanup timers on unmount
onUnmounted(() => {
  clearLongPressTimer();
  clearProgressInterval();
});

// ===== EXISTING DESKTOP HANDLERS - DO NOT MODIFY =====
const handleDragStart = (event: DragEvent) => {
  if (props.isDisabled || isMobile.value) {
    event.preventDefault();
    return;
  }

  isDragging.value = true;

  // Set drag data
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("application/json", JSON.stringify(props.card));
  }

  emit("dragStart", props.card);
};

const handleDragEnd = () => {
  isDragging.value = false;
  emit("dragEnd");
};

const handleClick = () => {
  if (!props.isDisabled) {
    emit("click", props.card);
  }
};

// ===== NEW MOBILE TOUCH HANDLERS =====

/**
 * Clear long press timer
 */
const clearLongPressTimer = () => {
  if (longPressTimer.value !== null) {
    clearTimeout(longPressTimer.value);
    longPressTimer.value = null;
  }
};

/**
 * Clear progress interval
 */
const clearProgressInterval = () => {
  if (progressInterval.value !== null) {
    clearInterval(progressInterval.value);
    progressInterval.value = null;
  }
};

/**
 * Clear show progress ring timer
 */
const clearShowProgressRingTimer = () => {
  if (showProgressRingTimer.value !== null) {
    clearTimeout(showProgressRingTimer.value);
    showProgressRingTimer.value = null;
  }
};

/**
 * Reset all mobile drag state
 */
const resetMobileDragState = () => {
  clearLongPressTimer();
  clearProgressInterval();
  clearShowProgressRingTimer();
  isLongPressing.value = false;
  showProgressRing.value = false;
  isDragMode.value = false;
  dragStartPos.value = null;
  longPressProgress.value = 0;
};

/**
 * Handle touch start - begin long press detection
 */
const handleTouchStart = (event: TouchEvent) => {
  // Guard: only execute on mobile
  if (!isMobile.value) return;
  if (props.isDisabled) return;
  if (!isDragModeEnabled()) return;

  const touch = event.touches[0];
  if (!touch) return;

  // Store initial touch position
  dragStartPos.value = {
    x: touch.clientX,
    y: touch.clientY,
  };

  // Start long press detection (internal state)
  isLongPressing.value = true;
  longPressProgress.value = 0;

  // DELAY showing the progress ring to avoid showing it during quick scrolls
  // Only show ring if user holds still for the configured delay
  showProgressRingTimer.value = window.setTimeout(() => {
    if (isLongPressing.value) {
      showProgressRing.value = true;
    }
  }, GAME_CONFIG.PROGRESS_RING_DELAY);

  // Animate progress
  const startTime = Date.now();
  progressInterval.value = window.setInterval(() => {
    const elapsed = Date.now() - startTime;
    longPressProgress.value = Math.min(
      (elapsed / GAME_CONFIG.LONG_PRESS_DURATION) * 100,
      100
    );
  }, 16); // ~60fps

  // Set timer for long press activation
  longPressTimer.value = window.setTimeout(() => {
    // Long press activated!
    isLongPressing.value = false;
    showProgressRing.value = false;
    isDragMode.value = true;
    clearProgressInterval();
    clearShowProgressRingTimer();

    // Haptic feedback
    haptics.longPressActivated();

    // Emit drag start
    if (dragStartPos.value) {
      emit(
        "touchDragStart",
        props.card,
        dragStartPos.value.x,
        dragStartPos.value.y
      );
    }
  }, GAME_CONFIG.LONG_PRESS_DURATION);
};

/**
 * Handle touch move - track position or cancel if scrolling
 */
const handleTouchMove = (event: TouchEvent) => {
  // Guard: only execute on mobile
  if (!isMobile.value) return;
  if (!dragStartPos.value) return;

  const touch = event.touches[0];
  if (!touch) return;

  const deltaX = Math.abs(touch.clientX - dragStartPos.value.x);
  const deltaY = Math.abs(touch.clientY - dragStartPos.value.y);
  const totalMovement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // If in long press phase and user moves AT ALL, cancel immediately
  if (isLongPressing.value) {
    // Cancel on ANY movement (using Euclidean distance for accuracy)
    // This prevents accidental activation during scrolling
    if (totalMovement > GAME_CONFIG.LONG_PRESS_MIN_DISTANCE) {
      // User is moving their finger, cancel long press
      resetMobileDragState();
      return;
    }
  }

  // If in drag mode, emit move event and prevent scrolling
  if (isDragMode.value) {
    event.preventDefault(); // Prevent scrolling while dragging
    emit("touchDragMove", touch.clientX, touch.clientY);
  }
};

/**
 * Handle touch end - complete drag or cancel
 */
const handleTouchEnd = (event: TouchEvent) => {
  // Guard: only execute on mobile
  if (!isMobile.value) return;

  const touch = event.changedTouches[0];

  // If in drag mode, emit drop event
  if (isDragMode.value && touch) {
    emit("touchDragEnd", touch.clientX, touch.clientY);
  }

  // Reset state
  resetMobileDragState();
};

/**
 * Handle touch cancel - reset state
 */
const handleTouchCancel = () => {
  // Guard: only execute on mobile
  if (!isMobile.value) return;

  resetMobileDragState();
};

/**
 * Handle context menu - prevent on mobile to avoid interference with long press
 */
const handleContextMenu = (event: MouseEvent) => {
  // Only prevent on mobile devices
  if (isMobile.value) {
    event.preventDefault();
  }
};
</script>

<style scoped>
.game-card {
  flex-shrink: 0;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none; /* Disable iOS callout (context menu) on long press */
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight on mobile */
}

.game-card:active {
  cursor: grabbing;
}

/* Long press state - subtle scale */
.game-card.long-pressing {
  transform: scale(1.01);
}

/* Drag mode active - lifted appearance WITHOUT scaling */
.game-card.drag-mode-active {
  opacity: 0.85;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.8),
    0 0 60px rgba(139, 92, 246, 0.4);
  filter: brightness(1.1);
  z-index: 1000;
  transition: opacity 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

/* Progress ring animation */
.long-press-ring {
  filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.8));
}

.progress-circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.016s linear;
}
</style>
