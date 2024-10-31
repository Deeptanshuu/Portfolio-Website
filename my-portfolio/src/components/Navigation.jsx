import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [visible, setVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const scroll = useScroll()
  const { size } = useThree()

  const navItems = [
    { id: 'home', label: 'Home', offset: 0 },
    { id: 'projects', label: 'Projects', offset: 1.6 },
    { id: 'skills', label: 'Skills', offset: 2.6 },
    { id: 'contact', label: 'Contact', offset: 3.6 }
  ]

  // Handle scroll and section detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = scroll.offset
      const currentScrollPixels = currentScrollPos * size.height

      // Update active section based on scroll position
      if (currentScrollPos < 0.33) {
        setActiveSection('home')
      } else if (currentScrollPos < 0.66) {
        setActiveSection('projects')
      } else if (currentScrollPos < 2.66) {
        setActiveSection('skills')
      } else {
        setActiveSection('contact')
      }

      // Show/hide based on scroll direction
      setVisible(
        (currentScrollPixels < 100) || // Always show at top
        (prevScrollPos > currentScrollPos) // Show when scrolling up
      )
      setPrevScrollPos(currentScrollPos)
    }

    scroll.el.addEventListener('scroll', handleScroll)
    return () => scroll.el.removeEventListener('scroll', handleScroll)
  }, [scroll, prevScrollPos, size.height])

  const scrollToSection = (offset) => {
    scroll.el.scrollTo({
      top: offset * size.height,
      behavior: 'smooth'
    })
  }

  return (
    <nav className={`
      fixed top-0 left-1/2 -translate-x-1/2 z-[9999]
      flex flex-row gap-4 
      bg-black/50 backdrop-blur-lg
      p-3 rounded-full border border-white/10
      transition-all duration-300 ease-in-out
      hover:bg-black/60
      shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
      backdrop-filter
      mt-8
      ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
    `}>
      {navItems.map(({ id, label, offset }) => (
        <button
          key={id}
          onClick={() => scrollToSection(offset)}
          className={`
            relative px-6 py-2 rounded-full text-sm transition-all
            ${activeSection === id 
              ? 'text-black bg-white shadow-lg' 
              : 'text-white hover:bg-white/10'
            }
            hover:scale-105
          `}
        >
          {label}
        </button>
      ))}
    </nav>
  )
} 