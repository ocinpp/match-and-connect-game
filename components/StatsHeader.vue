<template>
  <div
    class="stats-header bg-card-bg border-b-2 border-cyber-blue/30 px-4 py-2 md:px-6 md:py-4"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Mobile Layout (Stacked) -->
      <div class="flex flex-col gap-2 md:hidden">
        <!-- Timer and Match Count -->
        <div class="flex items-center justify-between">
          <!-- Timer -->
          <div class="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-neon-purple"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="text-white font-mono text-base font-bold">
              {{ formattedTime }}
            </span>
          </div>

          <!-- Match Count -->
          <div class="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-matrix-green"
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
            <span class="text-white font-bold text-base">
              {{ matchesFound }}/{{ totalMatches }}
            </span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full">
          <div class="h-1.5 bg-dark-bg rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-cyber-blue to-neon-purple transition-all duration-500 ease-out"
              :style="{ width: `${matchProgress}%` }"
            ></div>
          </div>
          <p class="text-[10px] text-gray-400 text-center mt-0.5">
            {{ matchProgress }}% Complete
          </p>
        </div>
      </div>

      <!-- Desktop Layout (Horizontal) -->
      <div class="hidden md:flex items-center justify-between gap-6">
        <!-- Timer -->
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-neon-purple"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide">Time</p>
            <p class="text-white font-mono text-xl font-bold">
              {{ formattedTime }}
            </p>
          </div>
        </div>

        <!-- Progress Bar (Centered, Flexible) -->
        <div class="flex-1 max-w-md">
          <div class="flex items-center justify-between mb-1">
            <p class="text-xs text-gray-400 uppercase tracking-wide">
              Progress
            </p>
            <p class="text-xs text-gray-400">{{ matchProgress }}%</p>
          </div>
          <div class="h-3 bg-dark-bg rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-cyber-blue to-neon-purple transition-all duration-500 ease-out"
              :style="{ width: `${matchProgress}%` }"
            ></div>
          </div>
        </div>

        <!-- Match Count -->
        <div class="flex items-center gap-3">
          <svg
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide">Matches</p>
            <p class="text-white font-bold text-xl">
              {{ matchesFound }}/{{ totalMatches }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  formattedTime: string;
  matchesFound: number;
  totalMatches: number;
  matchProgress: number;
}

defineProps<Props>();
</script>

<style scoped>
.stats-header {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}
</style>
