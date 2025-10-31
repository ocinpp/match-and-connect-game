<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="onboarding-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div
        class="onboarding-modal bg-dark-bg border-2 border-neon-purple rounded-2xl shadow-glow-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <!-- Header -->
        <div class="text-center pt-6 pb-4 px-6">
          <h2 class="text-2xl md:text-3xl font-bold text-neon-purple mb-2">
            Welcome to Match and Connect!
          </h2>
          <p class="text-base text-gray-300">
            Discover surprising connections between cards!
          </p>
        </div>

        <!-- Divider -->
        <div class="border-t border-cyber-blue/30 mx-6"></div>

        <!-- Instructions -->
        <div class="px-6 py-4 space-y-4">
          <!-- Mobile Instructions -->
          <div class="instruction-section">
            <div class="flex items-start gap-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-cyber-blue mb-2">
                  On Mobile
                </h3>
                <ul class="space-y-1.5 text-sm text-gray-300">
                  <li class="flex items-start gap-2">
                    <span class="text-neon-purple mt-1">•</span>
                    <span
                      ><strong>Drag:</strong> Hold card for 0.6 seconds, then
                      drag to slot<br />
                      <span class="text-sm text-gray-400"
                        >(watch the purple ring fill!)</span
                      ></span
                    >
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-neon-purple mt-1">•</span>
                    <span><strong>Tap:</strong> Tap card → tap empty slot</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Desktop Instructions -->
          <div class="instruction-section">
            <div class="flex items-start gap-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-cyber-blue mb-2">
                  On Desktop
                </h3>
                <ul class="space-y-1.5 text-sm text-gray-300">
                  <li class="flex items-start gap-2">
                    <span class="text-neon-purple mt-1">•</span>
                    <span>Click and drag cards to slots</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-neon-purple mt-1">•</span>
                    <span>Release to drop</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-cyber-blue/30"></div>

          <!-- Tips -->
          <div class="instruction-section">
            <div class="flex items-start gap-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-cyber-blue mb-2">Tips</h3>
                <ul class="space-y-1.5 text-sm text-gray-300">
                  <li class="flex items-start gap-2">
                    <span class="text-neon-purple mt-1">•</span>
                    <span>Fill both slots to check for a match</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-neon-purple mt-1">•</span>
                    <span>Click "Check Match" to reveal!</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-neon-purple mt-1">•</span>
                    <span>Use ✕ to remove cards</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-neon-purple mt-1">•</span>
                    <span>Not all pairs connect!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 pb-6 pt-3">
          <button
            @click="handleClose"
            class="w-full py-3 px-6 bg-neon-purple hover:bg-neon-purple/80 text-white font-bold text-base rounded-lg transition-all duration-200 shadow-glow-card hover:shadow-glow-card-hover active:scale-95"
          >
            Start Playing!
          </button>
          <p class="text-center text-xs text-gray-500 mt-3">
            This won't show again
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  show: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  emit("close");
};
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .onboarding-modal,
.modal-leave-active .onboarding-modal {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .onboarding-modal {
  transform: scale(0.9);
  opacity: 0;
}

.modal-leave-to .onboarding-modal {
  transform: scale(0.9);
  opacity: 0;
}

/* Scrollbar styling */
.onboarding-modal::-webkit-scrollbar {
  width: 8px;
}

.onboarding-modal::-webkit-scrollbar-track {
  background: transparent;
}

.onboarding-modal::-webkit-scrollbar-thumb {
  background: rgb(139, 92, 246);
  border-radius: 4px;
}

.onboarding-modal::-webkit-scrollbar-thumb:hover {
  background: rgb(124, 58, 237);
}

/* Instruction sections */
.instruction-section {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Prevent text selection on mobile */
@media (max-width: 1023px) {
  .onboarding-modal {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
}
</style>
