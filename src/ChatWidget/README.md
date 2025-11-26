# ChatWidget Module

A fully isolated, reusable chat widget built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ **SOLID Principles**: Clean architecture with separated concerns
- ✅ **Isolated Module**: No dependencies on parent app context
- ✅ **Easy Integration**: Drop-in component with minimal configuration
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Tailwind CSS**: All styling through utility classes
- ✅ **Persistent Storage**: Automatic message persistence
- ✅ **Smart Responses**: Context-aware AI response matching
- ✅ **Smooth Animations**: Framer Motion powered transitions

## Architecture (SOLID Principles)

### Single Responsibility Principle
- `MessageMatcher.ts`: Handles message matching logic only
- `MessageStorage.ts`: Handles storage operations only
- `useChatMessages.ts`: Manages message state only
- Each component has one clear purpose

### Open/Closed Principle
- `ChatWidget` is open for extension via `config` props
- Services can be extended without modifying existing code

### Interface Segregation Principle
- Clean, focused prop interfaces for each component
- No unnecessary dependencies

### Dependency Inversion Principle
- Services depend on interfaces (types), not concrete implementations
- Easy to swap out implementations

## Quick Start

### Basic Usage

```tsx
import { ChatWidget } from './ChatWidget';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <ChatWidget />
    </div>
  );
}
```

### With Configuration

```tsx
import { ChatWidget } from './ChatWidget';

function App() {
  return (
    <ChatWidget
      config={{
        storageKey: 'my-custom-chat-key',
        showSuggestions: true,
      }}
    />
  );
}
```

## Configuration Options

```typescript
interface ChatWidgetConfig {
  /** Storage key for persisting messages (default: 'chat-widget-messages') */
  storageKey?: string;

  /** Primary color for the chat widget (default: indigo) */
  primaryColor?: string;

  /** Initial greeting message */
  initialGreeting?: string;

  /** Whether to show suggestions */
  showSuggestions?: boolean;

  /** Custom responses data */
  responsesData?: ResponsesData;
}
```

## File Structure

```
ChatWidget/
├── index.ts                      # Main export
├── ChatWidget.tsx                # Main component
├── types.ts                      # TypeScript interfaces
├── components/
│   ├── ChatWindow.tsx            # Chat interface window
│   ├── ChatLauncher.tsx          # Floating action button
│   ├── MessageBubble.tsx         # Message display
│   ├── TypingIndicator.tsx       # Typing animation
│   └── SuggestionChips.tsx       # Suggestion buttons
├── hooks/
│   └── useChatMessages.ts        # Message management hook
└── services/
    ├── MessageMatcher.ts         # Response matching logic
    └── MessageStorage.ts         # Storage operations
```

## Integration in Any System

This widget is completely self-contained and can be integrated into:

1. **React Apps**: Import directly
2. **Next.js**: Works with both pages and app directory
3. **Remix**: Import in routes
4. **Other React Frameworks**: Works anywhere React works

### Example: Next.js Integration

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

### Example: Standalone Integration

```tsx
// Copy the entire ChatWidget folder to your project
// Then import:
import { ChatWidget } from './path/to/ChatWidget';
```

## Customization

The widget uses Tailwind CSS utility classes. To customize:

1. **Colors**: Modify the color classes in components
2. **Responses**: Provide custom `responsesData` in config
3. **Storage**: Change `storageKey` to namespace your storage
4. **Behavior**: Extend the services or create new ones

## No Theme Switching

This widget uses a single, clean light theme. All dark mode code has been removed for:
- Simpler maintenance
- Smaller bundle size
- Consistent appearance across all systems
- Easier customization

## Dependencies

- React 19+
- Framer Motion
- Tailwind CSS

## License

Part of the HaiIntel Chat Widget project.
