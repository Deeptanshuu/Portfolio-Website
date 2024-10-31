import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scroll = useScroll()
  const { size } = useThree()

  const navItems = [
    { id: 'home', label: 'Home', offset: 0 },
    { id: 'projects', label: 'Projects', offset: 1.6 },
    { id: 'skills', label: 'Skills', offset: 4.6 },
    { id: 'contact', label: 'Contact', offset: 5.5 }
  ]

  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/yourusername' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
    { label: 'Twitter', url: 'https://twitter.com/yourusername' },
    { label: 'Instagram', url: 'https://instagram.com/yourusername' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = scroll.offset

      if (currentScrollPos < 0.33) {
        setActiveSection('home')
      } else if (currentScrollPos < 1.66) {
        setActiveSection('projects')
      } else if (currentScrollPos < 2.66) {
        setActiveSection('skills')
      } else {
        setActiveSection('contact')
      }
    }

    scroll.el.addEventListener('scroll', handleScroll)
    return () => scroll.el.removeEventListener('scroll', handleScroll)
  }, [scroll])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (offset) => {
    scroll.el.scrollTo({
      top: offset * size.height,
      behavior: 'smooth'
    })
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Menu Button */}
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

      {/* Full Screen Menu */}
      <div className={`
        fixed top-0 left-0 right-0 z-[9998] 
        bg-black
        transition-all duration-700 ease-in-out
        ${isMenuOpen ? 'h-screen' : 'h-0'}
        overflow-hidden
      `}>
        <div className={`
          w-full max-w-screen-xl mx-auto px-8 
          flex justify-between items-start
          transition-all duration-700 delay-100
          ${isMenuOpen ? 'opacity-100 translate-y-32' : 'opacity-0 -translate-y-10'}
        `}>
          {/* Navigation Links */}
          <div className="flex flex-col items-start gap-4">
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
                  text-7xl font-light transition-all duration-500
                  ${activeSection === id ? 'text-white' : 'text-white/40'}
                  group-hover:text-white group-hover:-translate-y-full block
                `}>
                  {label}
                </span>
                <span className={`
                  absolute top-full left-0
                  text-7xl font-light transition-all duration-500
                  ${activeSection === id ? 'text-white' : 'text-white/40'}
                  group-hover:text-white group-hover:-translate-y-full block
                `}>
                  {label}
                </span>
              </button>
            ))}

            {/* Resume Download Link with Icon */}
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
                text-7xl font-light transition-all duration-500
                text-white/40
                group-hover:text-white group-hover:-translate-y-full block
              ">
                Resume
              </span>
              <span className="
                absolute top-full left-0
                text-7xl font-light transition-all duration-500
                text-white/40
                group-hover:text-white group-hover:-translate-y-full block
              ">
                Resume
              </span>
              <ArrowDownTrayIcon className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Right Side Content */}
          <div className={`
            flex flex-col gap-12
            transition-all duration-700 delay-300
            ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
          `}>
            {/* Contact Info */}
            <div className="text-right">
              <p className="text-white/40 mb-2 text-sm uppercase tracking-wider">Get in touch</p>
              <a 
                href="mailto:your@email.com" 
                className="text-white text-xl hover:text-white/60 transition-colors"
              >
                your@email.com
              </a>
            </div>

            {/* Social Links with Icons */}
            <div className="text-right">
              <p className="text-white/40 mb-4 text-sm uppercase tracking-wider">Follow</p>
              <div className="flex flex-col gap-3">
                {socialLinks.map(({ label, url }, index) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      text-white/60 hover:text-white transition-all text-lg 
                      flex items-center justify-end gap-2 group
                      duration-700 delay-[${(index + 5) * 100}ms]
                      ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
                    `}
                  >
                    {label}
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-1 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 