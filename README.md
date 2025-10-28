# Cyber Match - Card Connection Game

A stylish card matching game built with Nuxt 4 and Tailwind CSS, featuring cyber/futuristic themed cards and interactive drag-and-drop gameplay.

## Features

- **3-Row Board Layout**: Two rows for available cards with horizontal scrolling, and one row for matching slots
- **Drag-and-Drop**: Drag cards to slots or tap/click to select and place (mobile-friendly)
- **Card Relationships**: Discover connections between cards with detailed relationship information
- **Animations**: Smooth transitions, glow effects, shake animations, and match celebrations
- **Responsive Design**: Works on desktop and mobile devices
- **Cyber/Futuristic Theme**: Stylish design with neon colors and modern aesthetics

## Tech Stack

- **Nuxt 4.2.0** - Vue.js framework
- **Vue 3.5.22** - Progressive JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development

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

1. **View Cards**: Browse through the cards in Row 1 and Row 2 (scroll horizontally if needed)
2. **Select Cards**:
   - **Desktop**: Drag cards from the rows to the slots below
   - **Mobile**: Tap a card to select it, then tap a slot to place it
3. **Match Cards**: Fill both slots with cards you think are connected
4. **Check Match**: Click the "Check Match" button to see if the cards have a relationship
5. **View Results**:
   - If matched: A modal will show the relationship details
   - If not matched: A toast notification will appear and slots will shake
6. **Continue**: Cards stay in slots after a match - manually remove them to try new combinations

## Project Structure

```
drop-and-match/
├── components/
│   ├── GameBoard.vue       # Main game board component
│   ├── GameCard.vue         # Individual card component
│   ├── DropSlot.vue         # Drop slot component
│   ├── MatchModal.vue       # Match result modal
│   └── ToastNotification.vue # Toast notification component
├── composables/
│   └── useGameState.ts      # Game state management
├── data/
│   └── cards.json           # Card and relationship data
├── assets/
│   └── css/
│       └── main.css         # Global styles and Tailwind config
├── app.vue                  # Root component
├── nuxt.config.ts           # Nuxt configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## Customization

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
  // Add your custom colors here
}
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## License

MIT

## Credits

- Images from [Unsplash](https://unsplash.com)
- Built with [Nuxt](https://nuxt.com) and [Tailwind CSS](https://tailwindcss.com)
