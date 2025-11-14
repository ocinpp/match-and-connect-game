<template>
  <Teleport to="body">
    <div class="particle-container">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="{
          left: particle.x + 'px',
          top: particle.y + 'px',
          background: particle.color,
          animationDelay: particle.delay + 's',
          transform: `rotate(${particle.rotation}deg)`,
        }"
      ></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  trigger: boolean;
  x?: number;
  y?: number;
}

const props = withDefaults(defineProps<Props>(), {
  trigger: false,
  x: 0,
  y: 0,
});

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
  rotation: number;
}

const particles = ref<Particle[]>([]);

const colors = [
  "#00d9ff", // cyber-blue
  "#ff006e", // neon-purple
  "#ffd60a", // matrix-green
  "#00ff9f", // neon-mint
  "#ff3366", // hot-pink
];

const createParticles = (centerX: number, centerY: number) => {
  const newParticles: Particle[] = [];
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = 50 + Math.random() * 100;
    const x = centerX + Math.cos(angle) * velocity;
    const y = centerY + Math.sin(angle) * velocity;

    newParticles.push({
      id: Date.now() + i,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.2,
      rotation: Math.random() * 360,
    });
  }

  particles.value = newParticles;

  // Clear particles after animation completes
  setTimeout(() => {
    particles.value = [];
  }, 3000);
};

watch(
  () => props.trigger,
  (newVal) => {
    if (newVal) {
      // Use provided coordinates or center of screen
      const x = props.x || window.innerWidth / 2;
      const y = props.y || window.innerHeight / 2;
      createParticles(x, y);
    }
  }
);
</script>

<style scoped>
.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: particle-float 3s ease-out forwards;
  box-shadow: 0 0 10px currentColor;
}

@keyframes particle-float {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-150px) scale(0);
    opacity: 0;
  }
}
</style>

