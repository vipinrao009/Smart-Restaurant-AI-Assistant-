import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatInterface from './components/ChatInterface';
import Footer from './components/Footer';

export default function App() {
  const [chatActive, setChatActive] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const handleCategoryClick = (category) => {
    const msg = `What's today's ${category} menu?`;
    setInitialMessage(msg);
    setChatActive(true);
  };

  const handleStartChat = () => {
    setChatActive(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Navbar />

      <main className="flex-1">
        {!chatActive ? (
          <Hero onCategoryClick={handleCategoryClick} />
        ) : (
          <ChatInterface initialMessage={initialMessage} />
        )}
      </main>

      {!chatActive && <Footer />}
    </div>
  );
}
