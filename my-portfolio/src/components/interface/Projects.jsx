import { AnimatedText } from '../AnimatedText'
import { ProjectCard } from '../ProjectCard'

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

export function Projects() {
  return (
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
  )
} 