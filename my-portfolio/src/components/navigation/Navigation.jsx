import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { MenuButton } from './MenuButton'
import { NavigationLinks } from './NavigationLinks'
import { SocialLinks } from './SocialLinks'

const navItems = [
  { id: 'home', label: 'Home', offset: 0 },
  { id: 'projects', label: 'Projects', offset: 1.6 },
  { id: 'skills', label: 'Skills', offset: 4.6 },
  { id: 'contact', label: 'Contact', offset: 5.5 }
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