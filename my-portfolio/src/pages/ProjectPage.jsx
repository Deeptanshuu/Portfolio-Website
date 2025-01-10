import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiExternalLink, FiGithub, FiX, FiZoomIn, FiZoomOut, FiMaximize2, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { BsCalendarEvent, BsPeople } from 'react-icons/bs'
import { MdWorkOutline } from 'react-icons/md'
import { HiCheck } from 'react-icons/hi'
import { useState, useCallback, useEffect } from 'react'

const projects = [
  {
    id: "gdsc-leaderboard",
    title: "Google Developer Student Club Leaderboard",
    description: "A leaderboard for the Google Developer Student Club that showcases members' achievements and progress in a visually engaging manner for Hacktoberfest 2024.",
    image: "/projects/leaderboard.jpg",
    images: [
      "/projects/leaderboard/leaderboard.jpg",
      "/projects/leaderboard/2.jpg",
      "/projects/leaderboard/3.jpg",
      "/projects/leaderboard/4.jpg",
      "/projects/leaderboard/5.jpg",
    ],
    tags: ["React.js", "Chakra UI", "MongoDB", "AWS"],
    link: "https://gdsc-rait.vercel.app/",
    github: "https://github.com/Deeptanshuu/gdsc-leaderboard",
    longDescription: "The GDSC Leaderboard is a comprehensive platform designed to track and showcase member contributions during Hacktoberfest 2024. It features real-time updates, detailed progress tracking, and interactive visualizations of member achievements.",
    features: [
      "Real-time contribution tracking",
      "Interactive leaderboard with filters",
      "Dark Mode",
      "Responsive design for all devices"
    ],
    techStack: {
      frontend: ["React.js", "Chakra UI", "Framer Motion"],
      backend: ["Node.js", "Express", "MongoDB"],
      deployment: ["AWS", "Vercel", "GitHub Actions"]
    },
    challenges: [
      "Implementing real-time updates without affecting performance",
      "Creating an intuitive and engaging user interface",
      "Managing large-scale data synchronization"
    ],
    timeline: "September 2023 - October 2023",
    role: "Lead Developer",
    team: ["Deeptanshu Lal", "Kanishk"]
  },
  {
    id: "ai-resume-screener",
    title: "AI Resume Screener",
    description: "A resume screener that uses AI to analyze resumes and provide feedback. BERT model is used for the analysis and spacy for text processing.",
    images: [
      "/projects/resume/resume.png",
      "/projects/resume/2.jpg",
      "/projects/resume/3.jpg",
      "/projects/resume/4.jpg",
      "/projects/resume/5.jpg",
    ],
    tags: ["React.js", "Tailwind", "MongoDB"],
    link: "",
    github: "https://github.com/Deeptanshuu/Resume-Screening-System-ML",
    longDescription: "The AI Resume Screener leverages advanced machine learning models to provide intelligent resume analysis. Using BERT for natural language understanding and spaCy for text processing, it offers detailed feedback on resume quality and job fit.",
    features: [
      "AI-powered resume analysis",
      "Skill matching with job descriptions",
      "Detailed feedback generation",
      "Resume improvement suggestions",
      "Bulk resume processing"
    ],
    techStack: {
      frontend: ["React.js", "Tailwind CSS", "Redux"],
      backend: ["Python", "Flask", "BERT", "spaCy"],
      database: ["MongoDB", "Redis"]
    },
    challenges: [
      "Training the BERT model for specific resume contexts",
      "Optimizing processing time for large documents",
      "Ensuring accuracy in skill extraction"
    ],
    timeline: "January 2023 - March 2023",
    role: "Full Stack Developer & ML Engineer",
    team: ["Deeptanshu Lal"]
  },
  {
    id: "tsuki-market",
    title: "Tsuki Market : E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js and Tailwind CSS. Features include real-time payment management, seamless checkout process, and stunning product visualizations enhanced by Custom css animations.",
    images: [
      "/projects/e-com/e-com.jpg",
      "/projects/e-com/2.jpg",
      "/projects/e-com/3.jpg",
      "/projects/e-com/4.jpg",
      "/projects/e-com/5.jpg",
    ],
    tags: ["React.js", "Tailwind", "MongoDB"],
    link: "https://tsukimarket.vercel.app/",
    github: "https://github.com/Deeptanshuu/tsukimarket",
    longDescription: "Tsuki Market is a full-featured e-commerce platform that combines modern design with powerful functionality. It includes real-time inventory management, secure payment processing, and an intuitive shopping experience enhanced by custom animations.",
    features: [
      "Real-time inventory tracking",
      "Secure payment processing",
      "User authentication and profiles",
      "Order management system",
      "Admin dashboard"
    ],
    techStack: {
      frontend: ["Next.js", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Express", "MongoDB"],
      payment: ["Stripe", "PayPal"],
      hosting: ["Vercel", "MongoDB Atlas"]
    },
    challenges: [
      "Implementing secure payment processing",
      "Managing real-time inventory updates",
      "Optimizing performance for large product catalogs"
    ],
    timeline: "April 2023 - June 2023",
    role: "Full Stack Developer",
    team: ["Deeptanshu Lal"]
  },
  {
    id: "recipe-recommendation",
    title: "ML based Recipe Recommendation System",
    description: "A TF-IDF vectorization based Recipe Recommendation System that recommends recipes based on the user's input using Flask and Python.",
    images: [
      "/projects/recipe/recipe.jpg",
      "/projects/recipe/2.jpg",
      "/projects/recipe/3.jpg",
      "/projects/recipe/4.jpg",
      "/projects/recipe/5.jpg",
    ],
    tags: ["React.js", "Flask", "Python"],
    link: "https://whats-for-dinner2.vercel.app/",
    github: "https://github.com/Deeptanshuu/Whats-for-dinner",
    longDescription: "This Recipe Recommendation System uses advanced machine learning techniques to suggest personalized recipes. It employs TF-IDF vectorization to understand user preferences and provides tailored cooking suggestions through an intuitive interface.",
    features: [
      "Personalized recipe recommendations",
      "Ingredient-based search",
      "Dietary restrictions filter",
      "Cooking time estimation",
      "Nutritional information"
    ],
    techStack: {
      frontend: ["React.js", "Material-UI"],
      backend: ["Python", "Flask", "scikit-learn"],
      database: ["PostgreSQL"],
      ml: ["TF-IDF", "Cosine Similarity"]
    },
    challenges: [
      "Creating accurate recommendation algorithms",
      "Handling diverse recipe data formats",
      "Optimizing search performance"
    ],
    timeline: "July 2023 - August 2023",
    role: "ML Engineer & Backend Developer",
    team: ["Deeptanshu Lal"]
  },
  {
    id: "fee-payment",
    title: "Fee Payment System",
    description: "A simple web application that uses simple UI and animations to make the fee payment process more intuitive and user-friendly.",
    images: [
      "/projects/fee/fee.jpg",
      "/projects/fee/2.jpg",
      "/projects/fee/3.jpg",
      "/projects/fee/4.jpg",
      "/projects/fee/5.jpg",
    ],
    tags: ["HTML", "CSS", "Express"],
    link: "",
    github: "https://github.com/Deeptanshuu/MINI-PROJECT-CENTRALIZED-PAYMENT-PORTAL-FOR-COLLEGE-APPLICATION-",
    longDescription: "The Fee Payment System simplifies the complex process of educational fee payments through an intuitive interface. It features step-by-step payment guidance, transaction history, and receipt generation, all wrapped in a user-friendly design.",
    features: [
      "Intuitive payment workflow",
      "Multiple payment methods",
      "Automated receipt generation",
      "Payment history tracking",
      "Admin dashboard"
    ],
    techStack: {
      frontend: ["HTML", "CSS", "JavaScript"],
      backend: ["Node.js", "Express"],
      database: ["MongoDB"],
      payment: ["Stripe"]
    },
    challenges: [
      "Ensuring payment security",
      "Creating a simple yet effective UI",
      "Managing concurrent transactions"
    ],
    timeline: "February 2023 - March 2023",
    role: "Full Stack Developer",
    team: ["Deeptanshu Lal"]
  }
]

export function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const project = projects.find(p => p.id === id)
  
  const handleImageClick = (image) => {
    const index = project.images.findIndex(img => img === image)
    setCurrentImageIndex(index)
    setSelectedImage(image)
    setScale(1)
    setPosition({ x: 0, y: 0 })
    document.body.style.overflow = 'hidden'
  }

  const handleNextImage = (e) => {
    e.stopPropagation()
    const nextIndex = (currentImageIndex + 1) % project.images.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(project.images[nextIndex])
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handlePrevImage = (e) => {
    e.stopPropagation()
    const prevIndex = (currentImageIndex - 1 + project.images.length) % project.images.length
    setCurrentImageIndex(prevIndex)
    setSelectedImage(project.images[prevIndex])
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const closeModal = () => {
    setSelectedImage(null)
    setScale(1)
    setPosition({ x: 0, y: 0 })
    document.body.style.overflow = 'auto'
  }

  const handleWheel = useCallback((e) => {
    if (!selectedImage) return
    e.preventDefault()
    const delta = e.deltaY * -0.01
    setScale(prevScale => Math.min(Math.max(0.5, prevScale + delta), 4))
  }, [selectedImage])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.5, 4))
  }

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.5, 0.5))
  }

  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e) => {
    if (e.button === 0) { // Left click only
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Project Not Found</h1>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          <FiArrowLeft className="w-5 h-5" />
          Return Home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close button */}
          <button 
            onClick={closeModal}
            className="absolute z-50 top-4 right-4 text-white/80 hover:text-white p-2 rounded-full border-2 border-white/10 bg-white/10 hover:bg-white/20 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={handlePrevImage}
            className="absolute z-50 left-4 top-1/2 -translate-y-1/2 text-gray-500/80 hover:text-gray-500 p-2 rounded-full border-2 border-white/10 bg-white/10 hover:bg-white/20 transition-colors"
          >
            <FiChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute z-50 right-4 top-1/2 -translate-y-1/2 text-gray-500/80 hover:text-gray-500 p-2 rounded-full border-2 border-white/10 bg-white/10 hover:bg-white/20 transition-colors"
          >
            <FiChevronRight className="w-8 h-8" />
          </button>

          {/* Image counter */}
          <div className="absolute z-50 top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white/90">
            {currentImageIndex + 1} / {project.images.length}
          </div>

          {/* Zoom controls */}
          <div className="absolute z-50 bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
              className="p-2 rounded-full border-2 border-white/10 bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            >
              <FiZoomOut className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleReset(); }}
              className="p-2 rounded-full border-2 border-white/10 bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            >
              <FiMaximize2 className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
              className="p-2 rounded-full border-2 border-white/10 bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white"
            >
              <FiZoomIn className="w-6 h-6" />
            </button>
          </div>

          {/* Image container */}
          <div
            className="relative cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Project screenshot" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg transition-transform duration-200"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              draggable="false"
            />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={project.images[0]} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">{project.title}</h1>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
              {project.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-20">
        {/* Navigation */}
        <div className="mb-8 md:mb-16 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button 
            onClick={() => window.close()} 
            className="w-full sm:w-auto px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <FiGithub className="w-5 h-5" />
                View Source
              </a>
            )}
            
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <FiExternalLink className="w-5 h-5" />
                  View Live Project
                  <span className='bg-green-500 rounded-full px-1 py-1'></span>
              </a>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Overview</h2>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                {project.longDescription}
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {project.features.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <HiCheck className="w-6 h-6 text-white/60 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Challenges */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Challenges & Solutions</h2>
              <ul className="space-y-3 md:space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li 
                    key={index}
                    className="text-sm md:text-base text-white/80 leading-relaxed pl-4 border-l-2 border-white/20"
                  >
                    {challenge}
                  </li>
                ))}
              </ul>
            </section>

            {/* Gallery */}
            <section className="relative">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Main large image */}
                <div 
                  className="md:col-span-8 relative aspect-video rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
                  onClick={() => handleImageClick(project.images[0])}
                >
                  <img 
                    src={project.images[0]}
                    alt={`${project.title} main screenshot`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <p className="text-white p-6">Click to view fullscreen</p>
                  </div>
                </div>

                {/* Side column */}
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
                  <div 
                    className="relative aspect-video md:aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
                    onClick={() => handleImageClick(project.images[1])}
                  >
                    <img 
                      src={project.images[1]}
                      alt={`${project.title} feature screenshot`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <p className="text-white p-4">Click to view fullscreen</p>
                    </div>
                  </div>
                  <div 
                    className="relative aspect-video md:aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
                    onClick={() => handleImageClick(project.images[2])}
                  >
                    <img 
                      src={project.images[2]}
                      alt={`${project.title} detail screenshot`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <p className="text-white p-4">Click to view fullscreen</p>
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div 
                  className="md:col-span-6 relative aspect-video rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
                  onClick={() => handleImageClick(project.images[3])}
                >
                  <img 
                    src={project.images[3]}
                    alt={`${project.title} mobile screenshot`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <p className="text-white p-4">Click to view fullscreen</p>
                  </div>
                </div>

                <div 
                  className="md:col-span-6 relative aspect-video rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
                  onClick={() => handleImageClick(project.images[4])}
                >
                  <img 
                    src={project.images[4]}
                    alt={`${project.title} feature screenshot`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <p className="text-white p-4">Click to view fullscreen</p>
                  </div>
                </div>

                {/* Image count indicator */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white/90">
                  {project.images.length} images
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 md:space-y-8">
            {/* Tech Stack */}
            <div className="bg-white/5 rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Tech Stack</h3>
              {Object.entries(project.techStack).map(([category, technologies]) => (
                <div key={category} className="mb-4 last:mb-0">
                  <h4 className="text-white/60 capitalize mb-2 text-sm md:text-base">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-white/10 rounded-full text-xs md:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Project Info */}
            <div className="bg-white/5 rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Project Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BsCalendarEvent className="w-5 h-5 text-white/60" />
                  <div>
                    <h4 className="text-white/60 text-sm">Timeline</h4>
                    <p className="text-sm md:text-base">{project.timeline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MdWorkOutline className="w-5 h-5 text-white/60" />
                  <div>
                    <h4 className="text-white/60 text-sm">Role</h4>
                    <p className="text-sm md:text-base">{project.role}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BsPeople className="w-5 h-5 text-white/60 mt-1" />
                  <div>
                    <h4 className="text-white/60 text-sm">Team</h4>
                    <ul className="space-y-1">
                      {project.team.map((member, index) => (
                        <li key={index} className="text-sm md:text-base">{member}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 