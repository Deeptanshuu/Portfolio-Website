import { motion } from 'framer-motion';
import { 
  SiReact, SiChakraui, SiTypescript, SiTailwindcss, SiThreedotjs, SiFramer,
  SiNodedotjs, SiExpress, SiPython, SiFlask, SiMongodb, SiPostgresql,
  SiTensorflow, SiPytorch, SiScikitlearn, SiGit, SiDocker, SiVercel
} from 'react-icons/si';

const skillsWithIcons = {
  "Frontend Development": [
    { name: "React.js", icon: SiReact, color: "#61DAFB" },
    { name: "Chakra UI", icon: SiChakraui, color: "#319795" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Three.js", icon: SiThreedotjs, color: "#000000" },
    { name: "Framer Motion", icon: SiFramer, color: "#0055FF" }
  ],
  "Backend Development": [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#000000" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Flask", icon: SiFlask, color: "#000000" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" }
  ],
  "Machine Learning": [
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
    { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E" }
  ],
  "Tools & Others": [
    { name: "Git/GitHub", icon: SiGit, color: "#F05032" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Vercel", icon: SiVercel, color: "#000000" }
  ]
};

export function SkillsCloud() {
  return (
    <div className="py-20 text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Technical Skills</h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          An overview of my technical expertise across different domains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skillsWithIcons).map(([category, skillsList], categoryIndex) => (
          <div
            key={category}
            className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-white/10
                     hover:bg-white/10 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-6 text-white">{category}</h3>
            <div className="grid grid-cols-3 gap-4">
              {skillsList.map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/5
                           hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <skill.icon 
                    className="w-10 h-10 mb-2" 
                    style={{ color: skill.color }}
                  />
                  <span className="text-sm text-center text-white/80">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Badges */}
      <div className="mt-16 flex flex-wrap justify-center gap-4">
        {["AWS Certified", "Google Cloud", "React Expert", "ML Engineer"].map((badge, index) => (
          <motion.div
            key={index}
            className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10
                     hover:bg-white/10 transition-all duration-300 text-white"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {badge}
          </motion.div>
        ))}
      </div>
    </div>
  );
}