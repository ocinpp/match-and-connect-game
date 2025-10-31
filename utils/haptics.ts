/**
 * Haptic Feedback Utilities
 * Provides vibration feedback for mobile interactions
 */

import { GAME_CONFIG } from '~/config/gameConfig'

/**
 * Check if haptic feedback is supported by the device
 */
export const isHapticSupported = (): boolean => {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator
}

/**
 * Trigger haptic feedback
 * @param duration - Vibration duration in milliseconds
 */
export const triggerHaptic = (duration: number): void => {
  // Early return if haptics disabled in config
  if (!GAME_CONFIG.DRAG_HAPTIC_ENABLED) {
    return
  }
  
  // Early return if not supported
  if (!isHapticSupported()) {
    return
  }
  
  // Trigger vibration
  try {
    navigator.vibrate(duration)
  } catch (error) {
    // Silently fail - haptics are non-critical
    console.debug('Haptic feedback failed:', error)
  }
}

/**
 * Predefined haptic patterns for common interactions
 */
export const haptics = {
  /**
   * Long press activated - medium vibration
   */
  longPressActivated: () => {
    triggerHaptic(GAME_CONFIG.HAPTIC_PATTERNS.LONG_PRESS_ACTIVATED)
  },
  
  /**
   * Over drop zone - light tap
   */
  overDropZone: () => {
    triggerHaptic(GAME_CONFIG.HAPTIC_PATTERNS.OVER_DROP_ZONE)
  },
  
  /**
   * Successful drop - heavy vibration
   */
  successfulDrop: () => {
    triggerHaptic(GAME_CONFIG.HAPTIC_PATTERNS.SUCCESSFUL_DROP)
  },
  
  /**
   * Invalid drop - medium vibration
   */
  invalidDrop: () => {
    triggerHaptic(GAME_CONFIG.HAPTIC_PATTERNS.INVALID_DROP)
  },
}

