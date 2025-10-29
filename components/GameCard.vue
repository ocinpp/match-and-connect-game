<template>
  <div
    :class="[
      'game-card',
      'relative w-[150px] h-[225px] md:w-[180px] md:h-[270px] rounded-lg overflow-hidden cursor-pointer',
      'border-2 transition-all duration-300',
      isDisabled
        ? 'opacity-40 cursor-not-allowed border-gray-600'
        : 'border-cyber-blue hover:border-neon-purple',
      isSelected ? 'ring-4 ring-neon-purple' : '',
      isDragging ? 'opacity-50 scale-95' : '',
    ]"
    :draggable="!isDisabled"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @click="handleClick"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Card } from "~/composables/useGameState";

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
}>();

const isDragging = ref(false);
const isMobile = ref(false);

// Detect if device is mobile
onMounted(() => {
  isMobile.value = window.innerWidth < 1024; // lg breakpoint
});

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
</script>

<style scoped>
.game-card {
  flex-shrink: 0;
  user-select: none;
  -webkit-user-select: none;
}

.game-card:active {
  cursor: grabbing;
}
</style>
