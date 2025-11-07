<template>
  <div class="overscroll-none">
    <NuxtRouteAnnouncer />
    <GameBoard />
  </div>
</template>

<script setup lang="ts">
// Add Google Fonts
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
    },
  ],
});

// Disable browser swipe-to-go-back gesture
onMounted(() => {
  let startX = 0;
  let startY = 0;

  const handleTouchStart = (e: TouchEvent) => {
    startX = e.touches[0]!.clientX;
    startY = e.touches[0]!.clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;

    const currentX = e.touches[0]!.clientX;
    const currentY = e.touches[0]!.clientY;
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    // Check if horizontal swipe from edge (swipe-to-go-back gesture)
    const isSwipeFromLeftEdge = startX < 50 && deltaX > 0;
    const isSwipeFromRightEdge = startX > window.innerWidth - 50 && deltaX < 0;
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

    // Prevent swipe navigation from edges
    if (isHorizontalSwipe && (isSwipeFromLeftEdge || isSwipeFromRightEdge)) {
      e.preventDefault();
    }

    // Prevent pull-to-refresh (vertical swipe from top)
    const isAtTop = window.scrollY === 0;
    const isPullingDown = deltaY > 0;
    if (isAtTop && isPullingDown && Math.abs(deltaY) > Math.abs(deltaX)) {
      e.preventDefault();
    }
  };

  // Add passive: false to allow preventDefault
  document.addEventListener("touchstart", handleTouchStart, { passive: false });
  document.addEventListener("touchmove", handleTouchMove, { passive: false });

  onUnmounted(() => {
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchmove", handleTouchMove);
  });
});
</script>

<style>
/* Disable overscroll behavior (swipe to navigate) */
html,
body {
  overscroll-behavior: none;
  overscroll-behavior-x: none;
  overscroll-behavior-y: none;
}
</style>
