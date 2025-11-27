/**
 * App Component
 * Main application with routing
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Integration } from './pages/Integration';
import { ChatWidget } from './ChatWidget';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-950 transition-colors duration-300 overflow-x-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/integration" element={<Integration />} />
        </Routes>
        {/* Chat Widget - available on all pages */}
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
