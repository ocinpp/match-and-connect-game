# Match and Connect - Card Connection Game

A stylish card matching game built with Nuxt 4 and Tailwind CSS v4, featuring cyber/futuristic themed cards and interactive drag-and-drop gameplay with advanced mobile touch interactions.

## Features

### Core Gameplay
- **2-Row Board Layout**: Two rows for available cards with horizontal scrolling, and dedicated slots for matching
- **Card Relationships**: Discover surprising connections between cards with detailed relationship information
- **Smart Matching**: Not all card pairs have connections - find the ones that do!
- **Animations**: Smooth transitions, glow effects, shake animations, and match celebrations

### Interaction Modes
- **Desktop Drag & Drop**: Click and drag cards to slots with native HTML5 drag & drop
- **Mobile Long Press Drag**: Hold card for 0.6 seconds (with visual progress ring), then drag to slot
- **Mobile Tap-to-Select**: Tap a card to select, then tap an empty slot to place
- **Hybrid Mode**: Both drag and tap modes available simultaneously on mobile

### Mobile-Optimized Features
- **Long Press Detection**: 600ms hold time with visual progress ring indicator
- **Movement Cancellation**: Automatically cancels long press if finger moves >10px (scroll-friendly)
- **Floating Ghost Card**: Semi-transparent card follows your finger during drag
- **Haptic Feedback**: Vibration feedback for drag activation, successful drops, and invalid drops
- **Context Menu Prevention**: Disabled native context menu and text selection on mobile
- **Touch Callout Disabled**: No iOS callout menu interference

### User Experience
- **Onboarding Modal**: First-time tutorial with localStorage tracking (shows once)
- **Responsive Design**: Optimized for mobile (< 1024px) and desktop
- **Cyber/Futuristic Theme**: Stylish design with neon purple, cyber blue, and matrix green colors
- **Dynamic Viewport Height**: Uses `dvh` units for better mobile browser compatibility

## Tech Stack

- **Nuxt 4.2.0** - Vue.js framework with Nitro 2.12.8
- **Vue 3.5.22** - Progressive JavaScript framework with Composition API
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Vite 6.4.1** - Fast build tool and dev server

## Configuration

The game uses a centralized configuration system in `config/gameConfig.ts`:

```typescript
export const GAME_CONFIG = {
  MOBILE_INTERACTION_MODE: 'both',  // 'drag' | 'tap' | 'both'
  LONG_PRESS_DURATION: 600,         // ms to activate drag
  PROGRESS_RING_DELAY: 150,         // ms before showing progress ring
  LONG_PRESS_MIN_DISTANCE: 10,      // px movement to cancel
  MOBILE_BREAKPOINT: 1024,          // px
  DRAG_HAPTIC_ENABLED: true,
  HAPTIC_PATTERNS: {
    LONG_PRESS_ACTIVATED: 50,
    OVER_DROP_ZONE: 10,
    SUCCESSFUL_DROP: 100,
    INVALID_DROP: 50,
  },
}
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## How to Play

### First Time Users
- An onboarding modal will appear on your first visit explaining the controls
- The tutorial won't show again (stored in localStorage)

### Desktop
1. **Browse Cards**: Scroll through Row 1 and Row 2 horizontally
2. **Drag & Drop**: Click and drag any card to an empty slot
3. **Check Match**: Click "Check Match" when both slots are filled
4. **Remove Cards**: Click the ✕ button on a card in a slot to remove it

### Mobile
1. **Browse Cards**: Swipe through Row 1 and Row 2 horizontally
2. **Place Cards** (two methods):
   - **Long Press Drag**: Hold card for 0.6 seconds (purple ring appears), then drag to slot
   - **Tap-to-Select**: Tap a card to select it (purple border), then tap an empty slot
3. **Check Match**: Tap "Check Match" when both slots are filled
4. **Remove Cards**: Tap the ✕ button on a card in a slot to remove it

### Matching
- Fill both slots with cards you think are connected
- Click/tap "Check Match" to reveal the relationship
- **Match Found**: A modal shows the connection details
- **No Match**: Slots shake and a toast notification appears
- Cards remain in slots after checking - remove them manually to try new combinations

## Project Structure

```plaintext
drop-and-match/
├── components/
│   ├── GameBoard.vue          # Main game board orchestrator
│   ├── GameCard.vue           # Individual card with touch/drag handlers
│   ├── DropSlot.vue           # Drop slot with mobile touch detection
│   ├── MatchModal.vue         # Match result modal
│   ├── OnboardingModal.vue    # First-time tutorial modal
│   └── ToastNotification.vue  # Toast notification component
├── composables/
│   ├── useGameState.ts        # Game state management
│   └── useOnboarding.ts       # Onboarding state with localStorage
├── config/
│   └── gameConfig.ts          # Centralized game configuration
├── utils/
│   └── haptics.ts             # Haptic feedback utilities
├── data/
│   └── cards.json             # Card and relationship data
├── assets/
│   └── css/
│       └── main.css           # Global styles and Tailwind config
├── app.vue                    # Root component
├── nuxt.config.ts             # Nuxt configuration
└── tailwind.config.js         # Tailwind CSS v4 configuration
```

## Customization

### Mobile Interaction Mode

Change the interaction mode in `config/gameConfig.ts`:

```typescript
MOBILE_INTERACTION_MODE: 'both'  // Options: 'drag' | 'tap' | 'both'
```

- `'drag'` - Only long press + drag
- `'tap'` - Only tap-to-select
- `'both'` - Both methods available (recommended)

### Long Press Timing

Adjust the long press duration and sensitivity:

```typescript
LONG_PRESS_DURATION: 600,        // ms to hold before drag activates
PROGRESS_RING_DELAY: 150,        // ms before progress ring appears
LONG_PRESS_MIN_DISTANCE: 10,    // px movement to cancel long press
```

### Haptic Feedback

Enable/disable or customize haptic patterns:

```typescript
DRAG_HAPTIC_ENABLED: true,
HAPTIC_PATTERNS: {
  LONG_PRESS_ACTIVATED: 50,      // ms vibration
  OVER_DROP_ZONE: 10,
  SUCCESSFUL_DROP: 100,
  INVALID_DROP: 50,
}
```

### Adding New Cards

Edit `data/cards.json` to add new cards:

```json
{
  "id": "your-card-id",
  "title": "Your Card Title",
  "imageUrl": "https://your-image-url.com/image.jpg"
}
```

### Adding New Relationships

Add relationships between cards in `data/cards.json`:

```json
{
  "cardIds": ["card-id-1", "card-id-2"],
  "type": "Relationship Type",
  "title": "Relationship Title",
  "description": "Detailed description of how these cards are connected."
}
```

### Customizing Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  'cyber-blue': '#00f0ff',
  'neon-purple': '#b026ff',
  'matrix-green': '#00ff41',
  'dark-bg': '#0a0a0a',
  // Add your custom colors here
}
```

### Onboarding Modal

To force the onboarding modal to show again (e.g., after updates):

1. Increment the version in `composables/useOnboarding.ts`:
   ```typescript
   const ONBOARDING_VERSION = "v2";  // Was "v1"
   ```

2. Or clear localStorage in browser console:
   ```javascript
   localStorage.removeItem('match-and-connect-onboarding-seen');
   ```

## Development Tips

### Testing Mobile Interactions

1. **Chrome DevTools**: Open DevTools → Toggle device toolbar (Cmd+Shift+M)
2. **Network URL**: Access from mobile device on same WiFi using the network URL shown in terminal
3. **Clear Onboarding**: Use browser console to reset tutorial:
   ```javascript
   localStorage.removeItem('match-and-connect-onboarding-seen');
   ```

### Debugging

- **Mobile touch events**: Check console for touch event logs
- **Haptic feedback**: Only works on devices that support `navigator.vibrate()`
- **Long press**: Adjust `LONG_PRESS_DURATION` if too sensitive/slow

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Browser Support

- **Desktop**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari 12+, Chrome for Android, Samsung Internet
- **Features**:
  - HTML5 Drag & Drop API (desktop)
  - Touch Events API (mobile)
  - Vibration API (haptic feedback, optional)
  - localStorage (onboarding tracking)

## Known Issues

- Haptic feedback may not work on all devices (depends on browser support)
- Long press may conflict with browser's native context menu (disabled via CSS/JS)
- Some older browsers may not support `dvh` units (fallback to `vh`)

## License

MIT

## Credits

- Images from [Unsplash](https://unsplash.com)
- Built with [Nuxt](https://nuxt.com) and [Tailwind CSS](https://tailwindcss.com)
- Inspired by modern card matching games with a cyberpunk aesthetic
