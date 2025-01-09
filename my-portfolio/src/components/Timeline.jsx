import { useRef } from 'react'

const timelineData = [
  {
    year: "2024",
    title: "Google Developer Student Club Lead",
    company: "RAIT, DY Patil University"
  },
  {
    year: "2023",
    title: "Machine Learning Engineer",
    company: "Personal Project"
  },
  {
    year: "2023",
    title: "Full Stack Developer Intern",
    company: "Tsuki Market"
  },
  {
    year: "2022",
    title: "Web Development Lead",
    company: "College Technical Team"
  }
]

export function Timeline() {
  return (
    <div className="py-12 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative">
          {/* Center Line */}
          <div className="absolute md:left-1/2 left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

          {timelineData.map((item, index) => (
            <div 
              key={index} 
              className={`flex md:justify-center items-center mb-8 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content for larger screens */}
              <div className={`
                md:w-[45%] w-full pl-12 md:pl-0
                ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}
              `}>
                <div className="group bg-white/5 rounded-lg p-4 hover:bg-white/15 transition-all duration-300">
                  <div className={`flex items-center gap-4 mb-2 ${
                    index % 2 === 0 ? 'md:justify-end justify-between' : 'justify-between'
                  }`}>
                    <h3 className="text-lg font-semibold order-1 md:order-none">{item.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                                   border border-white/10 text-sm font-medium order-2 md:order-none
                                   shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">{item.company}</p>
                </div>
              </div>

              {/* Dot */}
              <div className="absolute left-0 md:relative">
                <div className="absolute left-[4px] md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
              </div>

              {/* Empty space for the other side - hidden on mobile */}
              <div className="hidden md:block md:w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 