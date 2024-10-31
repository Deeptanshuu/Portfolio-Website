export function MenuButton({ isMenuOpen, toggleMenu }) {
  return (
    <button 
      onClick={toggleMenu}
      className="fixed top-8 right-8 z-[9999] mix-blend-difference"
    >
      <div className="flex flex-col items-end gap-2">
        <span className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[10px] w-10' : ''}`} />
        <span className={`w-10 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[10px] w-10' : ''}`} />
      </div>
    </button>
  )
} 