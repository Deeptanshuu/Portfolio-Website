/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react'
import { AnimatedText } from './AnimatedText'
import gsap from 'gsap'

export function ProjectCard({ project, index }) {
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
      className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="overflow-hidden">
            <AnimatedText delay={0.1} className="text-white text-2xl font-bold mb-2">
              {project.title}
            </AnimatedText>
          </div>
          
          <div className="overflow-hidden">
            <AnimatedText delay={0.2} className="text-gray-300 text-sm mb-4">
              {project.description}
            </AnimatedText>
          </div>
          
          <div className="flex gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 bg-white/10 rounded-full text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 