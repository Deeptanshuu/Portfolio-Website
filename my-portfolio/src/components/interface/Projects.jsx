import { AnimatedText } from '../AnimatedText'
import { ProjectCard } from '../ProjectCard'

const projects = [
  {
    title: "Google Developer Student Club Leaderboard",
    description: "A leaderboard for the Google Developer Student Club that showcases members' achievements and progress in a visually engaging manner for Hacktoberfest 2024.",
    image: "/projects/leaderboard.jpg",
    tags: ["Vue.js", "D3.js", "Firebase"],
    link: "https://gdsc-rait.vercel.app/"
  },
  {
    title: "Tsuki Market : E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js and Tailwind CSS. Features include real-time inventory management, seamless checkout process, and stunning product visualizations enhanced by Framer Motion animations.",
    image: "/projects/e-com.jpg",
    tags: ["React.js", "Tailwind", "MongoDB"],
    link: "https://tsukimarket.vercel.app/"
  },
  {
    title: "AI/ML based Recipe Recommendation System",
    description: "A TF-IDF vectorization based Recipe Recommendation System that recommends recipes based on the user's input using Flask and Python.",
    image: "/projects/recipe.jpg",
    tags: ["React.js", "Flask", "Python"],
    link: "https://recipe-recommendation-system.vercel.app/"
  },
  {
    title: "Fee Payment System",
    description: "A simple web application that uses simple UI and animations to make the fee payment process more intuitive and user-friendly.",
    image: "/projects/fee.jpg",
    tags: ["HTML", "CSS", "Express"],
    link: "https://project1.com"
  }
]

export function Projects() {
  const handleProjectClick = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-950/10 to-black/0 pointer-events-none" />
      
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="overflow-hidden">
            <AnimatedText className="text-white/80 text-sm font-light mb-4 uppercase tracking-widest">
              Featured Work
            </AnimatedText>
          </div>
          <div className="overflow-hidden">
            <AnimatedText className="text-white text-5xl font-bold">
              Recent Projects
            </AnimatedText>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-24">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              isEven={index % 2 === 1}
              onClick={() => handleProjectClick(project.link)}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
} 