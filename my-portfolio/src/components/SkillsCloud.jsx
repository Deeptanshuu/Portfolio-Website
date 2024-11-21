import { AnimatedText } from './AnimatedText'
import { 
  FaPython, 
  FaReact, 
  FaNodeJs, 
  FaHtml5, 
  FaGitAlt, 
  FaDocker, 
  FaAws 
} from 'react-icons/fa'
import { 
  SiCplusplus, 
  SiJavascript, 
  SiThreedotjs, 
  SiMongodb, 
  SiMysql 
} from 'react-icons/si'

const skills = [
  { name: "Python", color: "#FFD43B", icon: FaPython },
  { name: "C/C++", color: "#00599C", icon: SiCplusplus },
  { name: "JavaScript", color: "#F7DF1E", icon: SiJavascript },
  { name: "React", color: "#61DAFB", icon: FaReact },
  { name: "Node.js", color: "#339933", icon: FaNodeJs },
  { name: "Three.js", color: "#FFFFFF", icon: SiThreedotjs },
  { name: "HTML/CSS", color: "#E34F26", icon: FaHtml5 },
  { name: "Git", color: "#F05032", icon: FaGitAlt },
  { name: "SQL", color: "#4479A1", icon: SiMysql },
  { name: "MongoDB", color: "#47A248", icon: SiMongodb },
  { name: "Docker", color: "#2496ED", icon: FaDocker },
  { name: "AWS", color: "#FF9900", icon: FaAws },
];

export function SkillsCloud() {
  return (
    <div className="section w-full">
      <div className="overflow-hidden mb-12">
        <AnimatedText>
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold block text-white">
            Skills & Technologies
          </span>
        </AnimatedText>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <AnimatedText 
            key={skill.name} 
            delay={0.1 * index}
            className="flex items-center justify-center"
          >
            <div
              className="
                relative
                bg-white/5
                backdrop-blur-sm 
                border border-white/10 
                rounded-xl
                p-4 sm:p-6
                text-white 
                hover:bg-white/10
                transition-all 
                duration-300
                w-full
                text-center
                group
                hover:scale-105
                cursor-pointer
                overflow-hidden
              "
              style={{
                boxShadow: `0 0 0 1px rgba(255,255,255,0.1)`,
              }}
            >
              {/* Glowing outline */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `inset 0 0 20px ${skill.color}33, 0 0 20px ${skill.color}33`,
                }}
              />
              
              {/* Glowing background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`
                }}
              />
              
              {/* Icon */}
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl flex items-center justify-center
                  transform group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: `linear-gradient(45deg, ${skill.color}22, transparent)`,
                  border: `1px solid ${skill.color}22`
                }}
              >
                <skill.icon 
                  className="w-6 h-6 sm:w-8 sm:h-8 m-4 translate-x-[-5px] translate-y-[-5px] transition-transform duration-300 group-hover:rotate-12" 
                  style={{ color: skill.color }}
                />
              </div>

              <div className="text-base sm:text-lg font-medium px-4">{skill.name} <br className="" /></div>
            </div>
          </AnimatedText>
        ))}
      </div>
    </div>
  )
}