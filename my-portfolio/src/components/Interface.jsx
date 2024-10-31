/* eslint-disable react/no-unescaped-entities */
import { AnimatedText } from './AnimatedText'
import { Navigation } from './Navigation'
import { ProjectCard } from './ProjectCard'
import { SkillsCloud } from './SkillsCloud'

const projects = [
  {
    title: "Project One",
    description: "A beautiful web application built with React and Three.js",
    image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=2939&auto=format&fit=crop",
    tags: ["React", "Three.js", "GSAP"],
    link: "https://project1.com"
  },
  {
    title: "Project Two",
    description: "An e-commerce platform with stunning animations",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "https://project2.com"
  },
  {
    title: "Project Three",
    description: "A real-time dashboard with data visualization",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2940&auto=format&fit=crop",
    tags: ["Vue.js", "D3.js", "Firebase"],
    link: "https://project3.com"
  },
  {
    title: "Project Four",
    description: "Mobile-first social media application",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    tags: ["React Native", "Node.js", "MongoDB"],
    link: "https://project4.com"
  }
]

export function Interface() {
  return (
    <div className="w-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center px-4 sm:px-8">
        <div className="max-w-screen-xl w-full mx-auto">
          <div className="space-y-6">
            {/* Main heading */}
            <div>
              <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl 
                font-semibold tracking-tighter overflow-hidden leading-tight">
                <AnimatedText delay={0.2}>
                  Hi I'm Deeptanshu,
                </AnimatedText>
              </h1>
              
              {/* Roles with dynamic styling */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center 
                gap-2 sm:gap-4 mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                overflow-hidden">
                <AnimatedText delay={0.4}>
                  <span className="font-normal text-white/80">Developer</span>
                </AnimatedText>
                
                <span className="hidden sm:block text-white/40">|</span>
                
                <AnimatedText delay={0.6}>
                  <span className="text-white cursive">
                    Designer
                  </span>
                </AnimatedText>
                
                <span className="hidden sm:block text-white/40">|</span>
                
                <AnimatedText delay={0.8}>
                  <span className="text-white/60 font-light">
                    Creator
                  </span>
                </AnimatedText>
              </div>
            </div>

            {/* Description with gradient text */}
            <div className="overflow-hidden max-w-xl">
              <AnimatedText delay={1} className="
                text-transparent bg-clip-text bg-gradient-to-r 
                from-white/60 to-white/40
                text-base sm:text-lg md:text-xl 
                font-light tracking-wide
                leading-relaxed
              ">
                Crafting digital experiences through code and design.<br/> 
                Passionate about creating beautiful, functional, and 
                user-centered solutions.
              </AnimatedText>
            </div>

            {/* CTA Button */}
            <div className="overflow-visible pt-4">
              <AnimatedText delay={1.2}>
                <button className="
                  px-6 py-3 
                  bg-white/10 hover:bg-white/20
                  border border-white/10
                  rounded-full
                  text-white text-sm sm:text-base
                  transition-all duration-300
                  hover:scale-105
                  backdrop-blur-sm
                ">
                  View My Work →
                </button>
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-screen-xl mx-auto px-8">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="overflow-hidden mb-16">
            <AnimatedText className="text-white text-5xl font-bold">
              Featured Projects
            </AnimatedText>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-screen-xl mx-auto px-8">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20">
        <div className="max-w-screen-xl mx-auto px-8">
          <SkillsCloud />
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-screen-xl mx-auto px-8">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Contact Section */}
      <section id="contact" className="flex items-center justify-center py-20">
        <div className="max-w-screen-xl mx-auto px-8 text-right">
          <div className="overflow-v">
            <AnimatedText className="block text-white text-6xl font-bold">
              Let's work together
            </AnimatedText>
          </div>
          <div className="overflow-hidden">
            <AnimatedText delay={0.2}>
              <a 
                href="mailto:your@email.com"
                className="inline-block mt-8 text-white text-xl border-b-2 border-white pb-2 hover:opacity-70 transition-opacity"
              >
                Get in touch →
              </a>
            </AnimatedText>
          </div>
        </div>
      </section>
    </div>
  )
} 