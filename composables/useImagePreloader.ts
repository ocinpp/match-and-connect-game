import { ref } from "vue";
import type { Card } from "~/composables/useGameState";

export const useImagePreloader = () => {
  const isLoading = ref(true);
  const loadedCount = ref(0);
  const totalCount = ref(0);
  const hasError = ref(false);

  /**
   * Preload a single image
   */
  const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        loadedCount.value++;
        resolve();
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        loadedCount.value++; // Still increment to avoid blocking
        reject(new Error(`Failed to load image: ${url}`));
      };
      
      img.src = url;
    });
  };

  /**
   * Preload all card images
   */
  const preloadCards = async (cards: Card[]): Promise<void> => {
    isLoading.value = true;
    loadedCount.value = 0;
    hasError.value = false;
    
    // Get unique image URLs from all cards
    const imageUrls = [...new Set(cards.map((card) => card.imageUrl))];
    totalCount.value = imageUrls.length;

    try {
      // Preload all images in parallel
      await Promise.allSettled(imageUrls.map((url) => preloadImage(url)));
      
      // Check if any images failed
      if (loadedCount.value < totalCount.value) {
        console.warn(
          `Some images failed to load: ${loadedCount.value}/${totalCount.value}`
        );
        hasError.value = true;
      }
    } catch (error) {
      console.error("Error preloading images:", error);
      hasError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Reset the preloader state
   */
  const reset = () => {
    isLoading.value = true;
    loadedCount.value = 0;
    totalCount.value = 0;
    hasError.value = false;
  };

  return {
    isLoading,
    loadedCount,
    totalCount,
    hasError,
    preloadCards,
    reset,
  };
};

