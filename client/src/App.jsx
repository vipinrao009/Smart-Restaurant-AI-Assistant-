import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatInterface from './components/ChatInterface';
import Footer from './components/Footer';

export default function App() {
  const [chatActive, setChatActive] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const handleSendMessage = (message) => {
    setInitialMessage(message);
    setChatActive(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Navbar />

      <main className="flex-1">
        {!chatActive ? (
          <Hero onSendMessage={handleSendMessage} />
        ) : (
          <ChatInterface initialMessage={initialMessage} />
        )}
      </main>

      {!chatActive && <Footer />}
    </div>
  );
}
