import { ref, onMounted } from "vue";

export const useOnboarding = () => {
  const showOnboarding = ref(false);

  /**
   * Initialize onboarding - always show on every page load
   */
  const initOnboarding = () => {
    // Always show onboarding on every page load/refresh
    showOnboarding.value = true;
  };

  /**
   * Close onboarding (no longer marks as seen since we always show)
   */
  const closeOnboarding = () => {
    showOnboarding.value = false;
    // Removed: markOnboardingAsSeen() - we want to show every time
  };

  /**
   * Manually show onboarding (e.g., from a "Show Tutorial" button)
   */
  const openOnboarding = () => {
    showOnboarding.value = true;
  };

  // Auto-initialize on mount
  onMounted(() => {
    initOnboarding();
  });

  return {
    showOnboarding,
    closeOnboarding,
    openOnboarding,
  };
};

