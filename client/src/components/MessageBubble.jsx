export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 ${
        isUser ? 'animate-slide-in-right' : 'animate-slide-in-left'
      }`}
    >
      <div className={`flex items-start gap-2 sm:gap-3 ${isUser ? 'max-w-[90%] sm:max-w-[80%]' : 'max-w-[90%] sm:max-w-[80%]'}`}>
        {/* AI avatar */}
        {!isUser && (
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-accent-gold to-accent-amber flex items-center justify-center text-xs sm:text-sm shrink-0 mt-1 shadow-md">
            🤖
          </div>
        )}

        {/* Bubble */}
        <div
          className={`px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl leading-relaxed text-xs sm:text-sm ${
            isUser
              ? 'bg-gradient-to-br from-accent-gold to-accent-amber text-bg-primary font-medium rounded-br-md'
              : 'glass text-text-primary rounded-bl-md'
          }`}
        >
          {content}
        </div>

        {/* User avatar */}
        {isUser && (
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-bg-tertiary border border-border-subtle flex items-center justify-center text-xs sm:text-sm shrink-0 mt-1">
            👤
          </div>
        )}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3 sm:mb-4 animate-fade-in">
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-accent-gold to-accent-amber flex items-center justify-center text-xs sm:text-sm shrink-0 mt-1 shadow-md">
          🤖
        </div>
        <div className="glass px-4 py-3 sm:px-5 sm:py-4 rounded-2xl rounded-bl-md">
          <div className="flex gap-1.5">
            <span className="typing-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-gold" />
            <span className="typing-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-gold" />
            <span className="typing-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
