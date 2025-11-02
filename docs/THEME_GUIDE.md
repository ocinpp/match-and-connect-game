# Theme Guide

This game supports multiple themes with different card sets and relationships.

## Available Themes

### 1. **Sci-Fi Tech** (Default)
- **Theme ID**: `scifi`
- **File**: `data/cards.json`
- **Cards**: Quantum Core, Neural Network, AI Consciousness, Plasma Reactor, etc.
- **Style**: Futuristic technology and cyberpunk aesthetics

### 2. **Mythology & Legends**
- **Theme ID**: `mythology`
- **File**: `data/cards-mythology.json`
- **Cards**: Zeus, Thor, Phoenix, Dragon, Medusa, Kraken, Excalibur, etc.
- **Style**: Gods, mythical creatures, and legendary artifacts from various cultures

### 3. **Ecosystem & Nature**
- **Theme ID**: `ecosystem`
- **File**: `data/cards-ecosystem.json`
- **Cards**: Sun, Rain, Tree, Bee, Flower, River, Mushroom, etc.
- **Style**: Natural ecosystems and environmental relationships

### 4. **Fantasy RPG**
- **Theme ID**: `fantasy-rpg`
- **File**: `data/cards-fantasy-rpg.json`
- **Cards**: Warrior, Mage, Rogue, Sword, Spell Book, Dragon, Castle, etc.
- **Style**: Classic fantasy role-playing game elements

## How to Switch Themes

### Method 1: Edit Configuration File (Recommended)

1. Open `config/gameConfig.ts`
2. Find the `THEME` setting (around line 13)
3. Change the value to your desired theme:

```typescript
export const GAME_CONFIG = {
  // ===== Theme Settings =====
  
  /**
   * Active theme
   * - 'scifi': Sci-Fi/Futuristic Tech (default)
   * - 'mythology': Mythology & Legends
   * - 'ecosystem': Ecosystem & Nature
   * - 'fantasy-rpg': Fantasy RPG
   */
  THEME: 'mythology' as 'scifi' | 'mythology' | 'ecosystem' | 'fantasy-rpg',
  
  // ... rest of config
}
```

4. Save the file
5. The dev server will automatically reload with the new theme

### Method 2: Environment Variable (For Production)

You can also set the theme via environment variable (future enhancement):

```bash
NUXT_PUBLIC_THEME=mythology npm run dev
```

## Theme Structure

Each theme file (`data/cards-*.json`) contains:

```json
{
  "cards": [
    {
      "id": "unique-card-id",
      "title": "Card Title",
      "imageUrl": "https://..."
    }
    // ... 15 cards total
  ],
  "relationships": [
    {
      "cardIds": ["card-id-1", "card-id-2"],
      "type": "Relationship Type",
      "title": "Relationship Title",
      "description": "Detailed description of the relationship"
    }
    // ... ~20 relationships
  ]
}
```

## Creating Custom Themes

To create your own theme:

1. **Create a new JSON file** in the `data/` directory (e.g., `data/cards-custom.json`)
2. **Follow the structure** shown above with 15 cards and 15-20 relationships
3. **Add theme to config**:
   - Edit `composables/useGameState.ts`
   - Add your theme to the `THEME_DATA` object
   - Update the `GAME_CONFIG.THEME` type in `config/gameConfig.ts`
4. **Add theme name** to `composables/useTheme.ts` in the `themeNames` object

### Tips for Creating Themes

- **15 cards** is the recommended number for good gameplay
- **15-20 relationships** provides enough connections without making it too easy
- **Not all pairs should match** - this creates challenge and discovery
- **Use high-quality images** from Unsplash or similar sources
- **Write engaging descriptions** that tell a story or teach something interesting
- **Vary relationship types** (Powers, Feeds, Protects, Evolves Into, etc.)

## Theme Examples

### Quick Theme Switch Examples

```typescript
// Sci-Fi Tech (Default)
THEME: 'scifi'

// Mythology & Legends
THEME: 'mythology'

// Ecosystem & Nature
THEME: 'ecosystem'

// Fantasy RPG
THEME: 'fantasy-rpg'
```

## Troubleshooting

### Theme not loading?
- Check that the theme ID matches exactly (case-sensitive)
- Verify the JSON file exists in the `data/` directory
- Check browser console for import errors

### Images not showing?
- Verify image URLs are accessible
- Check that URLs use HTTPS
- Consider using Unsplash with proper dimensions (`?w=400&h=600&fit=crop`)

### Game crashes after theme switch?
- Ensure all card IDs in relationships exist in the cards array
- Verify JSON syntax is valid (use a JSON validator)
- Check that cardIds arrays have exactly 2 elements

## Future Enhancements

Potential features for theme system:

- [ ] In-game theme selector UI
- [ ] Theme preview before switching
- [ ] Save theme preference to localStorage
- [ ] Smooth transition animations between themes
- [ ] Theme-specific color schemes
- [ ] Multiple language support per theme

