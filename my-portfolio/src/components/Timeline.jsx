import { useRef } from 'react'

const timelineData = [
  {
    year: "2024",
    title: "Google Developer Student Club Lead",
    description: "Leading a community of student developers, organizing workshops, and managing technical projects.",
    company: "RAIT, DY Patil University"
  },
  {
    year: "2023",
    title: "Machine Learning Engineer",
    description: "Worked on AI-powered resume screening system using BERT and spaCy for natural language processing.",
    company: "Personal Project"
  },
  {
    year: "2023",
    title: "Full Stack Developer Intern",
    description: "Developed and maintained web applications using React.js and Node.js. Implemented new features and optimized performance.",
    company: "Tsuki Market"
  },
  {
    year: "2022",
    title: "Web Development Lead",
    description: "Led the development of multiple web projects and mentored junior developers.",
    company: "College Technical Team"
  }
]

export function Timeline() {
  return (
    <div className="relative py-20 text-white">
      {/* Center Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center mb-20 last:mb-0 ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`relative w-full md:w-[calc(50%-2rem)] p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 
                ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}
                hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]`}
            >
              {/* Year Badge */}
              <div className="absolute top-0 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full">
                <span className="text-sm font-medium text-white">{item.year}</span>
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-white/60 text-sm mb-3">{item.company}</p>
                <p className="text-white/80">{item.description}</p>
              </div>

              {/* Connector */}
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-px bg-white/20
                  ${index % 2 === 0 ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'}`}
              >
                <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white/20`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 