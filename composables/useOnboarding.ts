import { ref, onMounted } from "vue";

const ONBOARDING_KEY = "match-and-connect-onboarding-seen";
const ONBOARDING_VERSION = "v1"; // Increment to re-show tutorial after updates

export const useOnboarding = () => {
  const showOnboarding = ref(false);

  /**
   * Check if user has seen the onboarding
   */
  const hasSeenOnboarding = (): boolean => {
    if (typeof window === "undefined") return true;

    try {
      const seen = localStorage.getItem(ONBOARDING_KEY);
      return seen === ONBOARDING_VERSION;
    } catch (error) {
      console.warn("Failed to read onboarding status from localStorage:", error);
      return false;
    }
  };

  /**
   * Mark onboarding as seen
   */
  const markOnboardingAsSeen = () => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(ONBOARDING_KEY, ONBOARDING_VERSION);
    } catch (error) {
      console.warn("Failed to save onboarding status to localStorage:", error);
    }
  };

  /**
   * Reset onboarding (for testing or user request)
   */
  const resetOnboarding = () => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(ONBOARDING_KEY);
    } catch (error) {
      console.warn("Failed to reset onboarding status:", error);
    }
  };

  /**
   * Initialize onboarding - check if should show
   */
  const initOnboarding = () => {
    if (!hasSeenOnboarding()) {
      showOnboarding.value = true;
    }
  };

  /**
   * Close onboarding and mark as seen
   */
  const closeOnboarding = () => {
    showOnboarding.value = false;
    markOnboardingAsSeen();
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
    resetOnboarding,
    hasSeenOnboarding,
  };
};

