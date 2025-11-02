import { computed } from 'vue'
import { GAME_CONFIG } from '~/config/gameConfig'

/**
 * Theme configuration and utilities
 */
export const useTheme = () => {
  const currentTheme = computed(() => GAME_CONFIG.THEME)

  const themeNames = {
    'scifi': 'Sci-Fi Tech',
    'mythology': 'Mythology & Legends',
    'ecosystem': 'Ecosystem & Nature',
    'fantasy-rpg': 'Fantasy RPG',
    'space': 'Space Exploration',
    'anime': 'Japanese Anime',
    'architecture': 'Architecture & Cities',
    'color': 'Color Theory',
    'photography': 'Photography',
    'ai': 'Artificial Intelligence',
  } as const

  const currentThemeName = computed(() => themeNames[GAME_CONFIG.THEME])

  return {
    currentTheme,
    currentThemeName,
    themeNames,
  }
}

