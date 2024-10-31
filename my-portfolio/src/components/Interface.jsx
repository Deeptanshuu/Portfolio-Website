/* eslint-disable react/no-unescaped-entities */
import { AnimatedText } from './AnimatedText'
import { Navigation } from './Navigation'
import { ProjectCard } from './ProjectCard'
import { SkillsCloud } from './SkillsCloud'

const projects = [
  {
    title: "Immersive 3D Experience",
    description: "A cutting-edge web application that pushes the boundaries of 3D on the web. Built with React and Three.js, this project showcases interactive 3D models, dynamic lighting, and smooth animations to create an engaging user experience.",
    image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=2939&auto=format&fit=crop",
    tags: ["React", "Three.js", "GSAP"],
    link: "https://project1.com"
  },
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js and Tailwind CSS. Features include real-time inventory management, seamless checkout process, and stunning product visualizations enhanced by Framer Motion animations.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "https://project2.com"
  },
  {
    title: "Data Visualization Dashboard",
    description: "A real-time analytics dashboard that transforms complex data into intuitive visualizations. Built with Vue.js and D3.js, it provides interactive charts and graphs that update in real-time using Firebase as the backend.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2940&auto=format&fit=crop",
    tags: ["Vue.js", "D3.js", "Firebase"],
    link: "https://project3.com"
  },
  {
    title: "Social Media App",
    description: "A mobile-first social media application that connects users through shared interests. Built with React Native and Node.js, it features real-time messaging, media sharing, and a recommendation engine powered by MongoDB.",
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
          <div className="space-y-5">
            {/* Main heading */}
            <div>
              <h1 className="text-white text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] 
                font-light tracking-tighter overflow-hidden leading-none">
                <AnimatedText delay={0.2}>
                  Hi I'm Deeptanshu,<br/>
                </AnimatedText>
              </h1>
              
              {/* Roles with dynamic styling */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center 
                gap-2 sm:gap-6 mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
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
            <div className="overflow-hidden max-w-2xl">
              <AnimatedText delay={1} className="
                text-transparent bg-clip-text bg-gradient-to-r 
                from-white/60 to-white/40
                text-lg sm:text-xl md:text-2xl 
                font-light tracking-wide
                leading-relaxed
              ">
                Crafting digital experiences through code and design.<br/> 
                Passionate about creating beautiful, functional, and 
                user-centered solutions.
              </AnimatedText>
            </div>

            {/* CTA Button */}
            <div className="overflow-visible pt-6">
              <AnimatedText delay={1.2}>
                <button className="
                  px-8 py-4
                  bg-white/10 hover:bg-white/20
                  border border-white/10
                  rounded-full
                  text-white text-base sm:text-lg
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
      <section id="projects" className="py-20">
        <div className="max-w-screen-xl mx-auto px-8 mb-20">
          <div className="overflow-hidden">
            <AnimatedText className="text-white text-5xl font-bold">
              Featured Projects
            </AnimatedText>
          </div>
        </div>
        
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index} 
            isEven={index % 2 === 1}
          />
        ))}
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
            <AnimatedText className="block text-white text-8xl font-bold">
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