import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

export function NavigationLinks({ navItems, activeSection, scrollToSection, isMenuOpen }) {
  return (
    <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-6">
      {navItems.map(({ id, label, offset }, index) => (
        <button
          key={id}
          onClick={() => scrollToSection(offset)}
          className={`
            group relative overflow-hidden
            transition-all duration-700 delay-[${(index + 1) * 100}ms]
            ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
          `}
        >
          <span className={`
            text-4xl sm:text-7xl font-semibold transition-all duration-500
            ${activeSection === id ? 'text-white' : 'text-white/40'}
            group-hover:text-white group-hover:-translate-y-full block
          `}>
            {label}
          </span>
          <span className={`
            absolute top-full left-0
            text-4xl sm:text-7xl font-semibold transition-all duration-500
            ${activeSection === id ? 'text-white' : 'text-white/40'}
            group-hover:text-white group-hover:-translate-y-full block
          `}>
            {label}
          </span>
        </button>
      ))}

      <ResumeButton isMenuOpen={isMenuOpen} />
    </div>
  )
}

function ResumeButton({ isMenuOpen }) {
  return (
    <a 
      href="/resume.pdf" 
      download
      className={`
        group relative overflow-hidden mt-8 flex items-center gap-4
        transition-all duration-700 delay-500
        ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
      `}
    >
      <span className="
        text-4xl sm:text-7xl font-semibold transition-all duration-500
        text-white/40
        group-hover:text-white group-hover:-translate-y-full block
      ">
        Resume
      </span>
      <span className="
        absolute top-full left-0
        text-4xl sm:text-7xl font-semibold transition-all duration-500
        text-white/40
        group-hover:text-white group-hover:-translate-y-full block
      ">
        Resume
      </span>
      <ArrowDownTrayIcon className="w-8 sm:w-16 h-8 sm:h-16 text-white/40 group-hover:text-white transition-colors" />
    </a>
  )
} 