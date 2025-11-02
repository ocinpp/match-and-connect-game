# Color Scheme Configuration Guide

## Overview
All colors in the application are now centralized and easily configurable. No hardcoded colors exist in components.

## How to Change Colors

### 1. Update `tailwind.config.js`

All colors are defined in the `colors` section:

```javascript
colors: {
  "cyber-blue": "#00d9ff",      // Primary color (cyan)
  "neon-purple": "#ff006e",     // Accent color (hot pink)
  "matrix-green": "#ffd60a",    // Highlight color (neon yellow)
  "dark-bg": "#0a0e27",         // Dark background
  "card-bg": "#1a1f3a",         // Card background
  "slot-bg": "#151a33",         // Slot background
}
```

### 2. Update Shadow Utilities (if needed)

Shadow utilities are also defined in `tailwind.config.js`:

```javascript
boxShadow: {
  "glow-primary": "0 0 20px rgba(0, 217, 255, 0.5)",      // Cyan glow
  "glow-accent": "0 0 20px rgba(255, 0, 110, 0.5)",       // Pink glow
  "glow-highlight": "0 0 40px rgba(255, 214, 10, 0.4)",   // Yellow glow
  "glow-card": "inset 0 0 20px rgba(0, 217, 255, 0.3)",   // Card hover glow
}
```

### 3. Update CSS Variables (optional)

CSS variables in `assets/css/main.css` are also available:

```css
:root {
  --color-cyber-blue: #00d9ff;
  --color-neon-purple: #ff006e;
  --color-matrix-green: #ffd60a;
  --color-dark-bg: #0a0e27;
  --color-card-bg: #1a1f3a;
  --color-slot-bg: #151a33;
}
```

## Example: Switching to a Different Color Scheme

### Before (Cyberpunk Neon):
```javascript
colors: {
  "cyber-blue": "#00d9ff",
  "neon-purple": "#ff006e",
  "matrix-green": "#ffd60a",
}
```

### After (Synthwave Sunset):
```javascript
colors: {
  "cyber-blue": "#FF006E",      // Hot Pink
  "neon-purple": "#8B00FF",     // Deep Purple
  "matrix-green": "#FF6B00",    // Neon Orange
}
```

Then update the shadow utilities to match the new RGB values.

## Components Using These Colors

- **GameBoard.vue**: Button with `shadow-glow-primary`
- **MatchModal.vue**: Modal with `shadow-glow-highlight`
- **GameCard.vue**: Card hover effect with `shadow-glow-card`
- **All components**: Use Tailwind color classes like `text-cyber-blue`, `bg-card-bg`, `border-matrix-green`

## No Hardcoded Colors

✅ All inline `style="box-shadow: ..."` have been replaced with Tailwind utility classes
✅ All color values are centralized in configuration files
✅ Easy to switch entire color scheme by updating one file

## Benefits

1. **Single Source of Truth**: All colors defined in one place
2. **Easy Maintenance**: Change colors once, applies everywhere
3. **Consistency**: No duplicate color values
4. **Performance**: CSS classes are more efficient than inline styles
5. **Scalability**: Easy to add new color schemes or themes

