/**
 * ChatWidget Module
 * Main entry point for the isolated chat widget
 *
 * Usage:
 * import { ChatWidget } from './ChatWidget';
 *
 * function App() {
 *   return <ChatWidget />;
 * }
 *
 * With configuration:
 * function App() {
 *   return (
 *     <ChatWidget
 *       config={{
 *         storageKey: 'my-app-chat',
 *         primaryColor: 'blue'
 *       }}
 *     />
 *   );
 * }
 */

export { ChatWidget } from './ChatWidget';
export type { ChatWidgetProps, ChatWidgetConfig, Message } from './types';
