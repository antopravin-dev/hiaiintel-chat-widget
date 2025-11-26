# ChatWidget Integration Guide

## Quick Start

### Installation

1. Copy the entire `ChatWidget` folder to your project:
```bash
cp -r src/ChatWidget your-project/src/
```

2. Ensure dependencies are installed:
```bash
npm install react framer-motion
# Tailwind CSS should already be configured
```

### Basic Usage

```tsx
import { ChatWidget } from './ChatWidget';

function App() {
  return (
    <div>
      <h1>My Application</h1>
      {/* Your content */}

      {/* Add ChatWidget - that's it! */}
      <ChatWidget />
    </div>
  );
}
```

## Responsive Behavior

The ChatWidget automatically adapts:

### Mobile (< 640px)
- Full-screen chat window
- Slides up from bottom
- Dark backdrop overlay
- Touch-optimized controls
- Safe area support for notches

### Desktop (≥ 640px)
- Floating window (384px × 600px)
- Bottom-right corner
- Rounded corners
- Hover effects
- Keyboard shortcuts

## Configuration

### With Custom Configuration

```tsx
import { ChatWidget } from './ChatWidget';

function App() {
  return (
    <ChatWidget
      config={{
        storageKey: 'my-app-chat-messages',
        showSuggestions: true,
      }}
    />
  );
}
```

### Available Config Options

```typescript
interface ChatWidgetConfig {
  /** Storage key for persisting messages */
  storageKey?: string;

  /** Primary color (future enhancement) */
  primaryColor?: string;

  /** Initial greeting message */
  initialGreeting?: string;

  /** Whether to show suggestions */
  showSuggestions?: boolean;

  /** Custom responses data */
  responsesData?: ResponsesData;
}
```

## Framework-Specific Integration

### Next.js (App Router)

```tsx
// app/page.tsx
import { ChatWidget } from '@/components/ChatWidget';

export default function HomePage() {
  return (
    <main>
      <h1>Welcome</h1>
      <ChatWidget />
    </main>
  );
}
```

### Next.js (Pages Router)

```tsx
// pages/index.tsx
import { ChatWidget } from '@/components/ChatWidget';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <ChatWidget />
    </div>
  );
}
```

### Remix

```tsx
// app/routes/index.tsx
import { ChatWidget } from '~/components/ChatWidget';

export default function Index() {
  return (
    <div>
      <h1>Home</h1>
      <ChatWidget />
    </div>
  );
}
```

### Vite/Create React App

```tsx
// src/App.tsx
import { ChatWidget } from './ChatWidget';

function App() {
  return (
    <>
      <header>My App</header>
      <main>Content</main>
      <ChatWidget />
    </>
  );
}
```

## Styling Customization

### Changing Colors

Edit the component files to change colors:

**ChatLauncher.tsx:**
```tsx
// Change button gradient
className="bg-gradient-to-br from-indigo-600 to-indigo-500"
// To:
className="bg-gradient-to-br from-blue-600 to-blue-500"
```

**MessageBubble.tsx:**
```tsx
// Change user message colors
className="bg-gradient-to-br from-cyan-500 to-indigo-600"
// To:
className="bg-gradient-to-br from-green-500 to-emerald-600"
```

### Custom Responses

```tsx
import { ChatWidget } from './ChatWidget';
import customResponses from './my-responses.json';

function App() {
  return (
    <ChatWidget
      config={{
        responsesData: customResponses
      }}
    />
  );
}
```

## Mobile Optimization

### Viewport Meta Tag

Ensure your HTML includes:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, viewport-fit=cover"
/>
```

The `viewport-fit=cover` enables safe area insets on iOS devices.

### Safe Area Support

The chat automatically handles:
- iPhone notches
- Android notches/holes
- Rounded corners
- Bottom bars (iOS home indicator)

No additional configuration needed!

## Keyboard Shortcuts

The ChatWidget supports:
- **Escape** - Close chat window
- **Enter** - Send message
- **Shift+Enter** - New line in message

## Accessibility

Fully accessible out of the box:
- ✅ Screen reader support
- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Focus management
- ✅ High contrast mode compatible

## Performance Tips

1. **Lazy Loading (Optional)**
   ```tsx
   import { lazy, Suspense } from 'react';

   const ChatWidget = lazy(() => import('./ChatWidget'));

   function App() {
     return (
       <Suspense fallback={null}>
         <ChatWidget />
       </Suspense>
     );
   }
   ```

2. **Code Splitting**
   Already optimized! The build process automatically splits code.

3. **Production Build**
   Always use production builds for deployment:
   ```bash
   npm run build
   ```

## Testing

### Desktop Testing
1. Open in browser
2. Click chat button
3. Verify floating window appears
4. Test hover effects
5. Test keyboard shortcuts

### Mobile Testing
1. Open on actual device (or Chrome DevTools mobile)
2. Tap chat button
3. Verify full-screen mode
4. Test backdrop close
5. Test safe area padding

### Browser DevTools Mobile Simulation
```
Chrome DevTools > Toggle Device Toolbar (Cmd/Ctrl + Shift + M)
Select iPhone 12 Pro or similar
Test responsiveness
```

## Common Issues

### Chat not showing?
- Check z-index conflicts
- Verify no CSS overflow: hidden on parent
- Ensure React is rendering

### Animations choppy?
- Enable hardware acceleration
- Check for CSS conflicts
- Reduce concurrent animations

### Mobile not full-screen?
- Verify viewport meta tag
- Check Tailwind breakpoint config
- Test on actual device

### Safe area padding not working?
- Requires iOS 11+ or modern Android
- Needs viewport-fit=cover
- Only visible on devices with notches

## Support Matrix

| Feature | Chrome | Safari | Firefox | Edge | Mobile Safari | Android Chrome |
|---------|--------|--------|---------|------|---------------|----------------|
| Basic Chat | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Animations | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3D Transforms | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Safe Area | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Full Screen | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Examples

### E-commerce Site
```tsx
function Shop() {
  return (
    <div>
      <ProductList />
      <ShoppingCart />
      <ChatWidget config={{ storageKey: 'shop-chat' }} />
    </div>
  );
}
```

### SaaS Dashboard
```tsx
function Dashboard() {
  return (
    <div>
      <Sidebar />
      <MainContent />
      <ChatWidget config={{ storageKey: 'dashboard-support' }} />
    </div>
  );
}
```

### Landing Page
```tsx
function Landing() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <ChatWidget />
    </>
  );
}
```

## Advanced Usage

### Programmatic Control (Future)

Currently, the ChatWidget manages its own state. For programmatic control, you could modify `ChatWidget.tsx` to accept `isOpen` and `onToggle` props:

```tsx
// Future enhancement
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsChatOpen(true)}>
        Open Chat from Header
      </button>

      <ChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </>
  );
}
```

## Getting Help

1. Check this documentation
2. Review the component source code
3. Check RESPONSIVE_UPDATE.md for animation details
4. Review REFACTORING_SUMMARY.md for architecture

## Next Steps

- [x] Basic integration
- [x] Responsive design working
- [ ] Customize colors/branding
- [ ] Add custom responses
- [ ] Deploy to production
- [ ] Monitor performance
- [ ] Gather user feedback

Happy integrating! 🚀
