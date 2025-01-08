/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import gsap from 'gsap'

export function ProjectCard({ project, index, isEven }) {
  const sectionRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    // Disable all animations on mobile
    if (isMobile) {
      if (sectionRef.current) {
        gsap.set(sectionRef.current, { opacity: 1, y: 0 });
      }
      return; // Exit early for mobile devices
    }

    // Desktop animation logic
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              delay: index * 0.2
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      gsap.set(sectionRef.current, { y: 100, opacity: 0 })
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <a 
      href={`/projects/${project.id}`}
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border border-white/10 rounded-lg py-12 lg:py-16 first:pt-12 
                 hover:border-white/20 transition-colors duration-300 px-4 lg:px-6
                 backdrop-blur-sm bg-white/[0.02] cursor-pointer block"
    >
      <div className={`flex flex-col lg:flex-row gap-8 lg:gap-20 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content */}
        <div className="lg:w-1/2 space-y-8 lg:space-y-10 px-6 lg:px-10">
          <div className="space-y-6">
            <div className="overflow-hidden whitespace-normal break-normal">
              <span delay={0.1} className="text-white/90 text-3xl lg:text-4xl xl:text-5xl font-normal">
                {project.title}<br/>
              </span>
            </div>
            
            <div className="overflow-hidden">
              <AnimatedText delay={0.2} className="text-white/70 text-lg leading-relaxed font-light whitespace-normal">
                {project.description}<br/>
              </AnimatedText>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm px-4 py-2 rounded-full text-white/80 
                          bg-black/20 lg:bg-white/5 lg:backdrop-blur-sm
                          border border-white/10 transition-colors duration-300
                          hover:bg-white/10 hover:border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="overflow-hidden">
            <AnimatedText delay={0.3}>
              <div
                className="group/button relative px-8 py-3 rounded-full 
                  bg-black/20 lg:bg-white/5 lg:backdrop-blur-sm
                  border border-white/20
                  text-white/90
                  transition-all duration-300
                  hover:bg-white/10 hover:border-white/30 hover:text-white
                  active:scale-95
                  flex items-center gap-2
                  shadow-[0_0_15px_rgba(255,255,255,0.05)]
                  hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]"
              >
                <span>Learn More</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 transform transition-transform duration-300 group-hover/button:translate-x-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </AnimatedText>
          </div>
        </div>

        {/* Image with enhanced hover effects */}
        <div className="lg:w-1/2 w-full aspect-[16/10] rounded-lg overflow-hidden relative group/image
                      bg-white/[0.02]">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 
                        group-hover/image:opacity-100 transition-opacity duration-500" />
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transform transition-all duration-700
              lg:group-hover/image:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>

      {/* Enhanced hover gradient without blur */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
          bg-[radial-gradient(circle_at_${isEven ? '75%' : '25%'}_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]`}
      />
    </a>
  )
} 