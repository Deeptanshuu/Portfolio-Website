/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react'
import { AnimatedText } from './AnimatedText'
import gsap from 'gsap'

export function ProjectCard({ project, index, isEven, onClick }) {
  const sectionRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)

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
    <section
      ref={sectionRef}
      className="group border-t border-white/10 last:border-b py-12 lg:py-24 first:pt-0"
    >
      <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content */}
        <div className="lg:w-1/2 space-y-6 lg:space-y-8 px-6 lg:px-10">
          <div className="space-y-4">
            <div className="overflow-clip">
              <AnimatedText delay={0.1} className="text-white/90 text-4xl font-normal">
                {project.title}<br/>
              </AnimatedText>
            </div>
            
            <div className="overflow-hidden">
              <AnimatedText delay={0.2} className="text-white/90 text-lg leading-relaxed font-normal">
                {project.description}<br/>
              </AnimatedText>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm px-4 py-2 rounded-full text-white/70 border border-white/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="overflow-hidden">
            <AnimatedText delay={0.3}>
              <button
                onClick={onClick}
                className="group/button relative px-8 py-3 rounded-full 
                  bg-white/10 backdrop-blur-sm
                  border border-white/20
                  text-white/90
                  transition-all duration-300
                  hover:bg-white/20 hover:border-white/30 hover:text-white
                  active:scale-95
                  flex items-center gap-2
                  shadow-[0_0_15px_rgba(255,255,255,0.05)]
                  hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]"
              >
                <span>View Project</span>
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
              </button>
            </AnimatedText>
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-1/2 w-full aspect-[16/10] rounded-sm pt-5 lg:pt-10 px-6 lg:px-10 overflow-hidden relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover lg:group-hover:scale-105 lg:transition-transform lg:duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      {/* Hover gradient - only show on desktop */}
      {window.innerWidth >= 1024 && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isEven ? '75%' : '25%'} 50%, rgba(255,255,255,0.02) 0%, transparent 70%)`
          }}
        />
      )}
    </section>
  )
} 