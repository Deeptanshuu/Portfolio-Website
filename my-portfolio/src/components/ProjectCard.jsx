/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react'
import { AnimatedText } from './AnimatedText'
import gsap from 'gsap'

export function ProjectCard({ project, index, isEven }) {
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
      className="group w-full py-20 relative overflow-hidden"
    >
      <div className={`max-w-screen-xl mx-auto px-8 flex items-center gap-12 ${isEven ? 'flex-row-reverse' : ''}`}>
        {/* Text Content */}
        <div className="w-1/2 space-y-6">
          <div className="overflow-hidden">
            <AnimatedText delay={0.1} className="text-white text-4xl font-bold">
              {project.title}
            </AnimatedText>
          </div>
          
          <div className="overflow-hidden">
            <AnimatedText delay={0.2} className="text-gray-300 text-lg leading-relaxed">
              {project.description}
            </AnimatedText>
          </div>
          
          <div className="flex gap-3 pt-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm px-4 py-2 bg-white/5 rounded-full text-white/60 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="overflow-hidden pt-6">
            <AnimatedText delay={0.3}>
              <a 
                href={project.link}
                className="inline-flex items-center text-white hover:opacity-70 transition-opacity"
              >
                View Project 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </AnimatedText>
          </div>
        </div>

        {/* Image */}
        <div className="w-1/2 aspect-[4/3] rounded-xl overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${isEven ? '75%' : '25%'} 50%, rgba(255,255,255,0.1) 0%, transparent 70%)`
        }}
      />
    </div>
  )
} 