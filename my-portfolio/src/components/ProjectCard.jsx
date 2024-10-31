/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react'
import { AnimatedText } from './AnimatedText'
import gsap from 'gsap'

export function ProjectCard({ project, index, isEven, onClick }) {
  const cardRef = useRef(null)

  useEffect(() => {
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

    if (cardRef.current) {
      gsap.set(cardRef.current, { y: 100, opacity: 0 })
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className="group relative bg-white/[0.01] rounded-3xl border border-white/[0.05] p-8 hover:border-white/[0.1] transition-colors duration-700"
    >
      <div className={`flex flex-col lg:flex-row gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Content */}
        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <div className="overflow-hidden">
              <AnimatedText delay={0.1} className="text-white/90 text-3xl font-light">
                {project.title}
              </AnimatedText>
            </div>
            
            <div className="overflow-hidden">
              <AnimatedText delay={0.2} className="text-white/60 text-lg leading-relaxed">
                {project.description}
              </AnimatedText>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm px-4 py-2 bg-white/[0.03] rounded-full text-white/40 border border-white/[0.05]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="overflow-hidden">
            <AnimatedText delay={0.3}>
              <button
                onClick={onClick}
                className="group/button relative z-[100000] px-8 py-3 rounded-full 
                  bg-transparent
                  border border-white/20
                  text-white/60
                  transition-all duration-300
                  hover:border-white/40 hover:text-white/90
                  flex items-center gap-2"
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
        <div className="lg:w-1/2 w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.05]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Hover gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${isEven ? '75%' : '25%'} 50%, rgba(255,255,255,0.03) 0%, transparent 70%)`
        }}
      />
    </div>
  )
} 