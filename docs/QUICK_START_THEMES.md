# Quick Start: Switching Themes

## 🎯 How to Switch Themes (30 seconds)

1. **Open** `config/gameConfig.ts`
2. **Find** line ~13 where it says `THEME: 'scifi'`
3. **Change** to one of these values:
   - `'scifi'` - Sci-Fi Tech (default)
   - `'mythology'` - Gods & Legends
   - `'ecosystem'` - Nature & Environment
   - `'fantasy-rpg'` - Fantasy RPG
   - `'space'` - Space Exploration
   - `'anime'` - Japanese Anime (Ultraman & Kamen Rider)
   - `'architecture'` - Architecture & Cities
   - `'color'` - Color Theory (Light & RGB)
   - `'photography'` - Photography Techniques
4. **Save** the file
5. **Done!** The dev server auto-reloads with the new theme

## 📝 Example

**Before:**

```typescript
export const GAME_CONFIG = {
  // ===== Theme Settings =====
  THEME: 'scifi' as 'scifi' | 'mythology' | 'ecosystem' | 'fantasy-rpg' | 'space' | 'anime' | 'architecture' | 'color' | 'photography',
  // ...
}
```

**After (switching to Color):**

```typescript
export const GAME_CONFIG = {
  // ===== Theme Settings =====
  THEME: 'color' as 'scifi' | 'mythology' | 'ecosystem' | 'fantasy-rpg' | 'space' | 'anime' | 'architecture' | 'color' | 'photography',
  // ...
}
```

## 🎨 Theme Preview

### Sci-Fi Tech (Default)

**Cards:** Quantum Core, Neural Network, AI Consciousness, Plasma Reactor, Dark Matter Engine
**Vibe:** Futuristic, cyberpunk, technology
**Example Match:** "Quantum Core powers Neural Network"

### Mythology & Legends

**Cards:** Zeus, Thor, Phoenix, Dragon, Medusa, Kraken, Excalibur
**Vibe:** Epic, legendary, cross-cultural mythology
**Example Match:** "Zeus wields Lightning Bolt"

### Ecosystem & Nature

**Cards:** Sun, Rain, Tree, Bee, Flower, River, Mushroom
**Vibe:** Educational, natural, environmental
**Example Match:** "Bee pollinates Flower"

### Fantasy RPG

**Cards:** Warrior, Mage, Rogue, Sword, Spell Book, Dragon, Castle
**Vibe:** Classic RPG, adventure, fantasy
**Example Match:** "Warrior wields Sword"

### Space Exploration

**Cards:** Black Hole, Nebula, Galaxy, Rocket, Mars, Space Station
**Vibe:** Cosmic, astronomical, space science
**Example Match:** "Supernova creates Nebula"

### Japanese Anime

**Cards:** Ultraman, Kamen Rider, Kaiju, Mecha, Transformation Belt
**Vibe:** Tokusatsu heroes, giant monsters, Japanese pop culture
**Example Match:** "Ultraman battles Kaiju"

### Architecture & Cities

**Cards:** Skyscraper, Bridge, Metro, Power Grid, Urban Park
**Vibe:** Urban planning, infrastructure, modern cities
**Example Match:** "Power Grid energizes Skyscraper"

### Color Theory

**Cards:** Red Light, Green Light, Blue Light, Yellow Light, Prism, Spectrum
**Vibe:** Physics of light, additive color mixing, RGB science
**Example Match:** "Red Light + Green Light = Yellow Light"

### Photography

**Cards:** Aperture, Shutter Speed, ISO, Bokeh, Depth of Field, Starburst
**Vibe:** Camera techniques, optical effects, photography art
**Example Match:** "Aperture creates Bokeh"

## 🔧 Troubleshooting

**Theme not changing?**

- Make sure you saved the file
- Check the dev server reloaded (watch terminal)
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

**TypeScript error?**

- Make sure the theme name is exactly one of: `'scifi'`, `'mythology'`, `'ecosystem'`, `'fantasy-rpg'`, `'space'`, `'anime'`, `'architecture'`, `'color'`, `'photography'`
- Keep the full type annotation

**Want more details?**

- See [THEME_GUIDE.md](THEME_GUIDE.md) for full documentation
- See [README.md](../README.md) for general game documentation
