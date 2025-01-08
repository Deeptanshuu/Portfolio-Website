import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { MenuButton } from './MenuButton'
import { NavigationLinks } from './NavigationLinks'
import { SocialLinks } from './SocialLinks'

const navItems = [
  { id: 'home', label: 'Home', offset: 0 },
  { id: 'projects', label: 'Projects', offset: 1.2 },
  { id: 'skills', label: 'Skills', offset: 6 },
  { id: 'contact', label: 'Contact', offset: 7 }
]

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/Deeptanshuu' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/deeptanshu-lal-6868a4187/' },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scroll = useScroll()
  const { size } = useThree()

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (offset) => {
    scroll.el.scrollTo({
      top: offset * size.height,
      behavior: 'smooth'
    })
    setIsMenuOpen(false)
  }

  return (
    <>
      <MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      <div className={`
        fixed top-0 left-0 right-0 z-[9998] 
        bg-black/95 backdrop-blur-lg
        transition-all duration-700 ease-in-out
        ${isMenuOpen ? 'h-screen' : 'h-0'}
        overflow-hidden
      `}>
        <div className={`
          w-full h-full max-w-screen-xl mx-auto px-6 sm:px-8 sm:pt-24
          flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start
          transition-all duration-700 delay-100
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
        `}>
          <NavigationLinks 
            navItems={navItems}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            isMenuOpen={isMenuOpen}
          />
          <SocialLinks 
            socialLinks={socialLinks}
            isMenuOpen={isMenuOpen}
          />
        </div>
      </div>
    </>
  )
} 