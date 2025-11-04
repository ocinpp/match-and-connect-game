import { ref, computed, onMounted } from 'vue'
import { GAME_CONFIG } from '~/config/gameConfig'

// Import all theme data
import scifiData from '~/data/cards.json'
import mythologyData from '~/data/cards-mythology.json'
import ecosystemData from '~/data/cards-ecosystem.json'
import fantasyRpgData from '~/data/cards-fantasy-rpg.json'
import spaceData from '~/data/cards-space.json'
import animeData from '~/data/cards-anime.json'
import architectureData from '~/data/cards-architecture.json'
import colorData from '~/data/cards-color.json'
import photographyData from '~/data/cards-photography.json'
import aiData from '~/data/cards-ai.json'
import miniData from '~/data/cards-mini.json'

// Theme data map
const THEME_DATA = {
  'scifi': scifiData,
  'mythology': mythologyData,
  'ecosystem': ecosystemData,
  'fantasy-rpg': fantasyRpgData,
  'space': spaceData,
  'anime': animeData,
  'architecture': architectureData,
  'color': colorData,
  'photography': photographyData,
  'ai': aiData,
  'mini': miniData,
} as const

// Get active theme data
const getThemeData = () => {
  return THEME_DATA[GAME_CONFIG.THEME]
}

export interface Card {
  id: string
  title: string
  imageUrl: string
}

export interface Relationship {
  cardIds: string[]
  type: string
  title: string
  description: string
}

export interface SlotState {
  card: Card | null
  slotIndex: number
}

export const useGameState = () => {
  // Load cards and relationships from active theme
  const themeData = getThemeData()
  const allCards = ref<Card[]>(themeData.cards)
  const relationships = ref<Relationship[]>(themeData.relationships)

  // Slot states
  const slot1 = ref<Card | null>(null)
  const slot2 = ref<Card | null>(null)

  // Match tracking - store discovered relationship IDs
  const discoveredRelationships = ref<Set<string>>(new Set())

  // Timer state
  const timerStartTime = ref<number | null>(null)
  const timerElapsed = ref<number>(0)
  const timerInterval = ref<number | null>(null)
  const isTimerRunning = ref<boolean>(false)

  // Disabled cards (cards currently in slots)
  const disabledCardIds = computed(() => {
    const ids: string[] = []
    if (slot1.value) ids.push(slot1.value.id)
    if (slot2.value) ids.push(slot2.value.id)
    return ids
  })

  // Check if a card is disabled
  const isCardDisabled = (cardId: string) => {
    return disabledCardIds.value.includes(cardId)
  }

  // Place card in slot
  const placeCardInSlot = (card: Card, slotIndex: number) => {
    // Don't allow placing if card is already in a slot
    if (isCardDisabled(card.id)) {
      return false
    }

    if (slotIndex === 1) {
      slot1.value = card
    } else if (slotIndex === 2) {
      slot2.value = card
    }

    return true
  }

  // Remove card from slot
  const removeCardFromSlot = (slotIndex: number) => {
    if (slotIndex === 1) {
      slot1.value = null
    } else if (slotIndex === 2) {
      slot2.value = null
    }
  }

  // Check if both slots are filled
  const areBothSlotsFilled = computed(() => {
    return slot1.value !== null && slot2.value !== null
  })

  // Find relationship between two cards
  const findRelationship = (card1Id: string, card2Id: string): Relationship | null => {
    return relationships.value.find(rel => {
      return (
        (rel.cardIds[0] === card1Id && rel.cardIds[1] === card2Id) ||
        (rel.cardIds[0] === card2Id && rel.cardIds[1] === card1Id)
      )
    }) || null
  }

  // Check match and return relationship if found
  const checkMatch = (): Relationship | null => {
    if (!slot1.value || !slot2.value) {
      return null
    }

    return findRelationship(slot1.value.id, slot2.value.id)
  }

  // Generate unique ID for a relationship (sorted card IDs)
  const getRelationshipId = (card1Id: string, card2Id: string): string => {
    return [card1Id, card2Id].sort().join('-')
  }

  // Record a discovered match
  const recordMatch = (relationship: Relationship): boolean => {
    const relId = getRelationshipId(relationship.cardIds[0]!, relationship.cardIds[1]!)

    // Check if already discovered
    if (discoveredRelationships.value.has(relId)) {
      return false // Already discovered
    }

    // Add to discovered set
    discoveredRelationships.value.add(relId)
    return true // Newly discovered
  }

  // Check if a relationship has been discovered
  const isRelationshipDiscovered = (card1Id: string, card2Id: string): boolean => {
    const relId = getRelationshipId(card1Id, card2Id)
    return discoveredRelationships.value.has(relId)
  }

  // Get match statistics
  const totalMatches = computed(() => relationships.value.length)
  const matchesFound = computed(() => discoveredRelationships.value.size)
  const matchProgress = computed(() => {
    if (totalMatches.value === 0) return 0
    return Math.round((matchesFound.value / totalMatches.value) * 100)
  })
  const isGameComplete = computed(() => matchesFound.value === totalMatches.value)

  // Timer methods
  const startTimer = () => {
    if (isTimerRunning.value) return

    timerStartTime.value = Date.now() - timerElapsed.value
    isTimerRunning.value = true

    timerInterval.value = window.setInterval(() => {
      if (timerStartTime.value) {
        timerElapsed.value = Date.now() - timerStartTime.value
      }
    }, 10) // Update every 10ms for millisecond precision
  }

  const stopTimer = () => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
    isTimerRunning.value = false
  }

  const resetTimer = () => {
    stopTimer()
    timerStartTime.value = null
    timerElapsed.value = 0
  }

  const pauseTimer = () => {
    stopTimer()
  }

  const resumeTimer = () => {
    startTimer()
  }

  // Format timer for display (MM:SS.mmm)
  const formattedTime = computed(() => {
    const totalMs = timerElapsed.value
    const minutes = Math.floor(totalMs / 60000)
    const seconds = Math.floor((totalMs % 60000) / 1000)
    const milliseconds = totalMs % 1000

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`
  })

  // Reset game state
  const resetGame = () => {
    slot1.value = null
    slot2.value = null
    discoveredRelationships.value.clear()
    resetTimer()
    cardDistribution.value = distributeCards()
  }

  // Distribute cards randomly across two rows
  const distributeCards = () => {
    const shuffled = [...allCards.value].sort(() => Math.random() - 0.5)
    const midPoint = Math.ceil(shuffled.length / 2)

    return {
      row1: shuffled.slice(0, midPoint),
      row2: shuffled.slice(midPoint)
    }
  }

  // Initialize with empty arrays to avoid SSR hydration mismatch
  const cardDistribution = ref<{ row1: Card[], row2: Card[] }>({
    row1: [],
    row2: []
  })

  // Distribute cards only on client side to avoid hydration mismatch
  onMounted(() => {
    cardDistribution.value = distributeCards()
  })

  return {
    // State
    allCards,
    relationships,
    slot1,
    slot2,
    disabledCardIds,
    cardDistribution,

    // Computed
    areBothSlotsFilled,

    // Methods
    isCardDisabled,
    placeCardInSlot,
    removeCardFromSlot,
    checkMatch,
    findRelationship,

    // Match tracking
    recordMatch,
    isRelationshipDiscovered,
    totalMatches,
    matchesFound,
    matchProgress,
    isGameComplete,
    discoveredRelationships,

    // Timer
    startTimer,
    stopTimer,
    resetTimer,
    pauseTimer,
    resumeTimer,
    formattedTime,
    timerElapsed,
    isTimerRunning,

    // Game control
    resetGame,
  }
}

