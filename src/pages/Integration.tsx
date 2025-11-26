/**
 * Integration Page
 * Fun and easy-to-read guide for integrating HaiIntel Assistant
 */

export const Integration = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Integration Guide
        </h1>
        <p className="text-xl text-neutral-400">
          Get HaiIntel Assistant up and running in your app in just 3 steps. It's easier than making instant noodles! 🍜
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                1
              </span>
              <h2 className="text-2xl font-bold text-white">
                Basic Setup - Drop it in!
              </h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-neutral-300 mb-4">
              Just import and use! The ChatWidget is completely self-contained.
              Drop it anywhere in your React app and you're done. 🎉
            </p>
            <div className="bg-neutral-950 rounded-lg p-6 overflow-x-auto border border-neutral-700">
              <pre className="text-left">
                <code className="text-sm text-neutral-300 font-mono">
{`import { ChatWidget } from './ChatWidget';

function App() {
  return (
    <div>
      <h1>My Awesome App</h1>

      {/* That's it! Just add this one line 👇 */}
      <ChatWidget />
    </div>
  );
}`}
                </code>
              </pre>
            </div>
            <div className="mt-4 flex items-start gap-2 bg-indigo-900/20 border border-indigo-800 rounded-lg p-4">
              <svg className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-indigo-300">
                <strong>Pro tip:</strong> The widget automatically handles everything - state management,
                animations, mobile responsiveness, and even localStorage for chat history!
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                2
              </span>
              <h2 className="text-2xl font-bold text-white">
                Customize It - Make it yours!
              </h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-neutral-300 mb-4">
              Want to customize the behavior? Pass in a config object.
              You can change the storage key or provide your own response data. 🎨
            </p>
            <div className="bg-neutral-950 rounded-lg p-6 overflow-x-auto border border-neutral-700">
              <pre className="text-left">
                <code className="text-sm text-neutral-300 font-mono">
{`import { ChatWidget } from './ChatWidget';

function App() {
  return (
    <ChatWidget
      config={{
        // Custom storage key for your app
        storageKey: 'my-awesome-app-chat',

        // Optional: Use your own response data
        responsesData: myCustomResponses
      }}
    />
  );
}`}
                </code>
              </pre>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="text-indigo-400">📦</span>
                  storageKey
                </h3>
                <p className="text-sm text-neutral-400">
                  Custom localStorage key to keep your chat history separate from other apps
                </p>
              </div>
              <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="text-indigo-400">🤖</span>
                  responsesData
                </h3>
                <p className="text-sm text-neutral-400">
                  Your own AI responses and conversation flows (see Step 3!)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                3
              </span>
              <h2 className="text-2xl font-bold text-white">
                Custom Responses - Teach it your way!
              </h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-neutral-300 mb-4">
              Create your own response patterns! Define keywords and responses
              to make the assistant answer questions about YOUR product or service. 🧠
            </p>
            <div className="bg-neutral-950 rounded-lg p-6 overflow-x-auto border border-neutral-700">
              <pre className="text-left">
                <code className="text-sm text-neutral-300 font-mono">
{`// Define your custom responses
const myCustomResponses = {
  "pricing": {
    "keywords": ["price", "cost", "pricing", "how much"],
    "response": "Our plans start at $9/month! Check out our pricing page for details.",
    "suggestions": [
      "Tell me about features",
      "Do you have a free trial?",
      "Contact sales"
    ]
  },
  "features": {
    "keywords": ["feature", "what can", "capabilities"],
    "response": "We offer amazing features including AI chat, analytics, and 24/7 support!",
    "suggestions": [
      "Show me pricing",
      "How do I get started?",
      "Talk to support"
    ]
  },
  "greeting": {
    "keywords": ["hello", "hi", "hey", "howdy"],
    "response": "Hey there! 👋 Welcome! How can I help you today?",
    "suggestions": [
      "What are your features?",
      "Show me pricing",
      "I need help"
    ]
  }
};

// Use it in your widget
<ChatWidget config={{ responsesData: myCustomResponses }} />`}
                </code>
              </pre>
            </div>
            <div className="mt-4 space-y-3">
              <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Each Response Object Has:
                </h3>
                <ul className="text-sm text-green-300 space-y-1 ml-7">
                  <li><strong>keywords</strong> - Words to match in user messages</li>
                  <li><strong>response</strong> - What the bot should reply</li>
                  <li><strong>suggestions</strong> - Follow-up question chips (optional but awesome!)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* TypeScript Types */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🔷</span>
            TypeScript Support
          </h2>
          <p className="text-neutral-300 mb-4">
            Full TypeScript support with exported types for a better development experience!
          </p>
          <div className="bg-neutral-950 rounded-lg p-6 overflow-x-auto border border-neutral-700">
            <pre className="text-left">
              <code className="text-sm text-neutral-300 font-mono">
{`import { ChatWidget, ChatWidgetConfig, Message } from './ChatWidget';

// Full type safety!
const config: ChatWidgetConfig = {
  storageKey: 'my-app-chat',
  responsesData: myResponses
};`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
};
