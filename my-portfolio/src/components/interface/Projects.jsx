import { AnimatedText } from '../AnimatedText'
import { ProjectCard } from '../ProjectCard'

const projects = [
  {
    title: "Google Developer Student Club Leaderboard",
    description: "A leaderboard for the Google Developer Student Club that showcases members' achievements and progress in a visually engaging manner for Hacktoberfest 2024.",
    image: "/projects/leaderboard.jpg",
    tags: ["React.js", "Chakra UI", "MongoDB", "AWS"],
    link: "https://gdsc-rait.vercel.app/"
  },
  {
    title: "AI Resume Screener",
    description: "A resume screener that uses AI to analyze resumes and provide feedback. BERT model is used for the analysis and spacy for text processing.",
    image: "/projects/resume.png",
    tags: ["React.js", "Tailwind", "MongoDB"],
    link: "https://github.com/Deeptanshuu/Resume-Screening-System-ML"
  },
  {
    title: "Tsuki Market : E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js and Tailwind CSS. Features include real-time payment management , seamless checkout process, and stunning product visualizations enhanced by Custom css animations.",
    image: "/projects/e-com.jpg",
    tags: ["React.js", "Tailwind", "MongoDB"],
    link: "https://tsukimarket.vercel.app/"
  },
  {
    title: "ML based Recipe Recommendation System",
    description: "A TF-IDF vectorization based Recipe Recommendation System that recommends recipes based on the user's input using Flask and Python.",
    image: "/projects/recipe.jpg",
    tags: ["React.js", "Flask", "Python"],
    link: "https://github.com/Deeptanshuu/Whats-for-dinner"
  },
  {
    title: "Fee Payment System",
    description: "A simple web application that uses simple UI and animations to make the fee payment process more intuitive and user-friendly.",
    image: "/projects/fee.jpg",
    tags: ["HTML", "CSS", "Express"],
    link: ""
  }
]

export function Projects() {
  const handleProjectClick = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <section id="projects" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0  pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-32">
            <div className="overflow-visible">
              <AnimatedText className="text-white/80 text-xl sm:text-2xl font-semibold mb-4 uppercase tracking-widest">
                My Work
              </AnimatedText>
            </div>
              <div className="overflow-visible">
              <AnimatedText>
                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-white/80">
                  Featured Projects
                </h2>
              </AnimatedText>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-32 relative">
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

        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-500/20 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      </section>
    </>
  )
} 