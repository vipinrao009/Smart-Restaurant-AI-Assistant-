export default function Footer() {
  return (
    <footer className="py-4 sm:py-6 px-4 sm:px-6 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        <p className="text-[10px] sm:text-xs text-text-muted text-center sm:text-left">
          Built with ❤️ using{' '}
          <span className="text-text-secondary">LangGraph</span> +{' '}
          <span className="text-text-secondary">Google Gemini</span>
        </p>
        <p className="text-[10px] sm:text-xs text-text-muted">
          Smart Restaurant AI © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
