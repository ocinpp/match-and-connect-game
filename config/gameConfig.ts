/**
 * Game Configuration
 * Central configuration for all game settings
 */

export const GAME_CONFIG = {
  // ===== Interaction Settings =====

  /**
   * Mobile interaction mode
   * - 'drag': Long press + drag only
   * - 'tap': Tap to select + tap slot only
   * - 'both': Both methods available (recommended)
   */
  MOBILE_INTERACTION_MODE: 'both' as 'drag' | 'tap' | 'both',

  /**
   * Duration (ms) user must hold card before drag mode activates
   * Increased to 600ms to reduce accidental activation during scrolling
   */
  LONG_PRESS_DURATION: 600,

  /**
   * Delay (ms) before showing progress ring
   * Prevents ring from appearing during quick scrolls
   */
  PROGRESS_RING_DELAY: 150,

  /**
   * Minimum distance (px) finger must move before canceling long press
   * Helps distinguish between drag intent and scroll intent
   * Set to 10px for very sensitive cancellation
   */
  LONG_PRESS_MIN_DISTANCE: 10,

  /**
   * Mobile breakpoint (px) - matches Tailwind 'lg' breakpoint
   * Devices below this width are considered mobile
   */
  MOBILE_BREAKPOINT: 1024,

  // ===== Haptic Feedback =====

  /**
   * Enable haptic feedback (vibration) on mobile
   */
  DRAG_HAPTIC_ENABLED: true,

  /**
   * Haptic patterns (ms)
   */
  HAPTIC_PATTERNS: {
    LONG_PRESS_ACTIVATED: 50,  // Medium vibration when drag mode activates
    OVER_DROP_ZONE: 10,         // Light tap when over valid drop zone
    SUCCESSFUL_DROP: 100,       // Heavy vibration on successful drop
    INVALID_DROP: 50,           // Medium vibration on failed drop
  },

  // ===== Visual Feedback =====

  /**
   * Show "Hold to drag" hint on first visit
   */
  SHOW_DRAG_HINT: true,

  /**
   * Animation durations (ms)
   */
  ANIMATION_DURATIONS: {
    CARD_LIFT: 200,           // Card lift animation when drag activates
    SNAP_BACK: 300,           // Card snap back when dropped in invalid area
    DROP_TO_SLOT: 400,        // Card animate to slot on successful drop
  },

  // ===== Future Settings (Placeholder) =====

  /**
   * Enable sound effects (not implemented yet)
   */
  ENABLE_SOUND: false,

  /**
   * Animation speed multiplier
   */
  ANIMATION_SPEED: 'normal' as 'slow' | 'normal' | 'fast',
} as const

/**
 * Type helper for interaction mode
 */
export type InteractionMode = typeof GAME_CONFIG.MOBILE_INTERACTION_MODE

/**
 * Helper to check if drag mode is enabled
 */
export const isDragModeEnabled = () => {
  return GAME_CONFIG.MOBILE_INTERACTION_MODE === 'drag' ||
    GAME_CONFIG.MOBILE_INTERACTION_MODE === 'both'
}

/**
 * Helper to check if tap mode is enabled
 */
export const isTapModeEnabled = () => {
  return GAME_CONFIG.MOBILE_INTERACTION_MODE === 'tap' ||
    GAME_CONFIG.MOBILE_INTERACTION_MODE === 'both'
}

