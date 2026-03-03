const categories = [
  {
    id: 'breakfast',
    emoji: '🌅',
    label: 'Breakfast',
    desc: 'Start your day right',
    gradient: 'from-orange-500/20 to-amber-500/20',
    border: 'border-orange-500/20 hover:border-orange-500/40',
  },
  {
    id: 'lunch',
    emoji: '☀️',
    label: 'Lunch',
    desc: 'Midday favorites',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/20 hover:border-yellow-500/40',
  },
  {
    id: 'dinner',
    emoji: '🌙',
    label: 'Dinner',
    desc: 'Evening delights',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    border: 'border-purple-500/20 hover:border-purple-500/40',
  },
];

export default function Hero({ onCategoryClick }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-10 relative overflow-hidden">
      {/* Background accents — hidden on small screens for perf */}
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-accent-gold/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-52 md:w-80 h-52 md:h-80 bg-purple-500/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />

      {/* Main content */}
      <div className="text-center max-w-3xl animate-fade-in-up w-full">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-bg-tertiary/50 border border-border-subtle mb-5 sm:mb-8">
          <span className="text-accent-gold text-xs sm:text-sm">✨</span>
          <span className="text-[10px] sm:text-xs text-text-secondary font-medium tracking-wide uppercase">
            Powered by Google Gemini AI
          </span>
        </div>

        <h2
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 px-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your{' '}
          <span className="gradient-text">AI-Powered</span>
          <br />
          Dining Experience
        </h2>

        <p className="text-sm sm:text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
          Ask our intelligent assistant about today's menu, get personalized
          recommendations, and explore culinary delights — all in a
          conversation.
        </p>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-sm sm:max-w-lg md:max-w-2xl w-full mb-8 sm:mb-12 px-2 sm:px-0">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat.id)}
            className={`group relative p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${cat.gradient} border ${cat.border} 
              transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer
              animate-fade-in-up`}
            style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'backwards' }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1.5 sm:mb-3">{cat.emoji}</div>
            <h3 className="text-xs sm:text-base md:text-lg font-semibold text-text-primary mb-0.5 sm:mb-1">{cat.label}</h3>
            <p className="text-[10px] sm:text-xs text-text-secondary hidden sm:block">{cat.desc}</p>
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <p className="text-text-muted text-xs sm:text-sm animate-pulse">
        👆 Click a category or type a message below
      </p>
    </section>
  );
}
