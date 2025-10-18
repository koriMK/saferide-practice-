# SafeRide Uber Theme

A non-destructive, Uber-inspired visual theme for the SafeRide application.

## Quick Start

### Enable Theme
```javascript
// In browser console or component
document.body.setAttribute('data-theme', 'uber');
```

### Disable Theme
```javascript
// Remove theme
document.body.removeAttribute('data-theme');
```

### Using Theme Toggle Utility
```javascript
import { toggleUberTheme, initializeTheme } from './src/utils/theme-toggle.js';

// Toggle theme
toggleUberTheme();

// Initialize saved theme on app load
initializeTheme();
```

## Integration

### 1. Import Theme CSS
Add to your main CSS file or component:
```css
@import './src/styles/uber-theme.css';
```

### 2. Add Theme Toggle Button (Optional)
```jsx
import { toggleUberTheme, getCurrentTheme } from './utils/theme-toggle';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getCurrentTheme());
  
  const handleToggle = () => {
    const newTheme = toggleUberTheme();
    setTheme(newTheme);
  };
  
  return (
    <button onClick={handleToggle}>
      {theme === 'uber' ? 'Default Theme' : 'Uber Theme'}
    </button>
  );
};
```

## Design System

### Color Tokens
- `--uber-primary`: #000000 (Black)
- `--uber-accent`: #00b341 (Green)
- `--uber-bg`: #ffffff (White)
- `--uber-text`: #000000 (Black)
- `--uber-text-secondary`: #6b7280 (Gray)

### Typography
- Font: Inter (already used in SafeRide)
- Weights: 400, 500, 600, 700
- Clean, bold headings with tight letter spacing

### Components Styled
- ✅ Header/Navigation
- ✅ Buttons (Primary, Secondary, CTA)
- ✅ Cards (Feature, Stats, Trip)
- ✅ Forms (Inputs, Labels, File uploads)
- ✅ Hero Section
- ✅ Dashboard Elements
- ✅ Footer

## Responsive Breakpoints
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## Accessibility
- WCAG AA contrast ratios maintained
- Focus states enhanced
- Keyboard navigation preserved

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Rollback Instructions

### Single Command Revert
```bash
# Remove theme files
rm -f src/styles/uber-theme.css src/utils/theme-toggle.js
```

### Manual Revert
1. Remove `data-theme="uber"` from body element
2. Delete `src/styles/uber-theme.css`
3. Delete `src/utils/theme-toggle.js`
4. Remove any theme imports from your CSS/JS files

## File Structure
```
src/
├── styles/
│   └── uber-theme.css          # Main theme stylesheet
├── utils/
│   └── theme-toggle.js         # Theme toggle utility
└── UBER_THEME_README.md        # This file
```

## Testing Checklist
- [x] Theme only applies when `data-theme="uber"` is set
- [x] All major components styled appropriately
- [x] Responsive design maintained
- [x] Accessibility standards met
- [x] No conflicts with existing styles
- [x] Easy enable/disable functionality

## Customization

Edit design tokens in `uber-theme.css`:
```css
body[data-theme="uber"] {
  --uber-primary: #your-color;
  --uber-accent: #your-accent;
  /* ... other tokens */
}
```

## Support
For issues or customizations, refer to the theme CSS file comments and design token documentation.