export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-accent-gold to-accent-amber flex items-center justify-center text-base sm:text-xl shadow-lg">
            🍽️
          </div>
          <div>
            <h1 className="text-sm sm:text-lg font-bold tracking-tight text-text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
              Smart Restaurant
            </h1>
            <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent-gold font-medium">
              AI Assistant
            </p>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-bg-tertiary/50 border border-border-subtle">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs text-text-secondary font-medium">Online</span>
        </div>
      </div>
    </nav>
  );
}
