/**
 * Home Page
 * Landing page showcasing HaiIntel Assistant features
 */

export const Home = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-12">
      <div className="flex flex-col gap-6 items-center">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-900/30 text-indigo-400 border border-indigo-800">
          HaiIntel AI Assistant
        </span>
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          Intelligent Conversations
        </h2>
        <p className="text-lg text-neutral-400 max-w-2xl">
          Experience AI-powered intelligence with HaiIntel Assistant. Get instant, intelligent responses to your questions.
        </p>
        <div className="mt-4 px-8 py-3 rounded-lg bg-indigo-900/30 text-indigo-400 font-semibold border border-indigo-800">
          Click the chat button to start chatting with HaiIntel
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature 1 */}
        <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 p-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Intelligent Responses</h3>
          <p className="text-neutral-400">Get instant, context-aware answers powered by advanced AI technology that understands your questions deeply.</p>
        </div>

        {/* Feature 2 */}
        <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 p-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Guided Conversations</h3>
          <p className="text-neutral-400">Smart suggestions help guide your conversation, making it easy to explore topics and get the information you need.</p>
        </div>

        {/* Feature 3 */}
        <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 p-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Real-Time Responses</h3>
          <p className="text-neutral-400">Experience smooth, streaming responses that feel natural and engaging, just like a real conversation.</p>
        </div>

        {/* Feature 4 */}
        <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 p-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Persistent Memory</h3>
          <p className="text-neutral-400">Your conversations are saved automatically, so you can pick up right where you left off anytime.</p>
        </div>

        {/* Feature 5 */}
        <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 p-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Works Everywhere</h3>
          <p className="text-neutral-400">Seamlessly designed to work on any device - desktop, tablet, or mobile - with a beautiful experience on all screens.</p>
        </div>

        {/* Feature 6 */}
        <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 p-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Enterprise Ready</h3>
          <p className="text-neutral-400">Built with professional standards for reliability, security, and performance that businesses can trust.</p>
        </div>
      </div>
    </main>
  );
};
