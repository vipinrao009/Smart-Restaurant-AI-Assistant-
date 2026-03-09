import { useState, useRef, useEffect } from 'react';
import MessageBubble, { TypingIndicator } from './MessageBubble';

const API_BASE = '/api';
const SESSION_STORAGE_KEY = 'chef-ai-session-id';

const quickActions = [
  { label: '🌅 Breakfast Menu', message: "What's today's breakfast menu?" },
  { label: '☀️ Lunch Menu', message: "What's today's lunch menu?" },
  { label: '🌙 Dinner Menu', message: "What's today's dinner menu?" },
  { label: '💰 Prices', message: "How much is the Ribeye Steak?" },
  { label: '🥗 Vegan Options', message: "Recommend me some vegan dishes" },
  { label: '📋 Order Food', message: "I'd like to place an order" },
];

export default function ChatInterface({ initialMessage }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() =>
    localStorage.getItem(SESSION_STORAGE_KEY) || ''
  );
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasProcessedInitial = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle initial message from Hero category click
  useEffect(() => {
    if (initialMessage && !hasProcessedInitial.current) {
      hasProcessedInitial.current = true;
      sendMessage(initialMessage);
    }
  }, [initialMessage]);

  // Focus input on mount (only on desktop — prevents keyboard pop-up on mobile)
  useEffect(() => {
    if (window.innerWidth >= 640) {
      inputRef.current?.focus();
    }
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text.trim(),
          sessionId,
        }),
      });

      const data = await res.json();

      if (data.error) throw new Error(data.error);
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem(SESSION_STORAGE_KEY, data.sessionId);
      }

      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: data.answer },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: "I'm sorry, I couldn't process that request. Please try again! 🙏",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[100dvh] pt-14 sm:pt-[72px] max-w-3xl mx-auto px-2 sm:px-4">
      {/* Chat header */}
      <div className="flex items-center gap-2 sm:gap-3 py-3 sm:py-4 px-2 border-b border-border-subtle shrink-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-accent-gold to-accent-amber flex items-center justify-center text-base sm:text-xl shadow-lg animate-pulse-glow">
          🤖
        </div>
        <div>
          <h2 className="text-xs sm:text-sm font-semibold text-text-primary">Chef AI</h2>
          <p className="text-[10px] sm:text-xs text-emerald-400">Ready to help</p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4 sm:py-6 px-1 sm:px-2 min-h-0">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in px-4">
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">👨‍🍳</div>
            <h3
              className="text-lg sm:text-2xl font-bold text-text-primary mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Welcome to Chef AI
            </h3>
            <p className="text-xs sm:text-base text-text-secondary mb-6 sm:mb-8 max-w-sm">
              Ask me about today's menu, request recommendations, or just say
              hello!
            </p>

            {/* Quick actions */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => sendMessage(action.message)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl glass border border-border-subtle 
                    hover:border-accent-gold/40 hover:bg-accent-gold/5
                    transition-all duration-300 text-xs sm:text-sm text-text-secondary
                    hover:text-text-primary cursor-pointer active:scale-95"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="py-2 sm:py-4 px-1 sm:px-2 border-t border-border-subtle shrink-0"
      >
        <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl glass border border-border-subtle focus-within:border-accent-gold/40 transition-colors duration-300">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about today's menu..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-2.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-text-primary 
              placeholder-text-muted outline-none disabled:opacity-50 min-w-0"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-accent-gold to-accent-amber
              text-bg-primary font-semibold text-xs sm:text-sm
              hover:shadow-lg hover:shadow-accent-gold/25
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-all duration-300 cursor-pointer shrink-0 active:scale-95"
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5 sm:gap-2">
                <svg className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="hidden sm:inline">Thinking</span>
              </span>
            ) : (
              <>
                <span className="sm:hidden">✨</span>
                <span className="hidden sm:inline">Send ✨</span>
              </>
            )}
          </button>
        </div>

        {/* Quick action pills below input */}
        {messages.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3 px-1 sm:px-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => sendMessage(action.message)}
                disabled={isLoading}
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-bg-tertiary/50 border border-border-subtle 
                  text-[10px] sm:text-xs text-text-muted hover:text-text-secondary hover:border-border-glass
                  transition-all duration-200 disabled:opacity-30 cursor-pointer active:scale-95"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
