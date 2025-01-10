const skills = {
  "Frontend Development": [
    { name: "React.js", level: 90 },
    { name: "Chakra UI", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Three.js", level: 75 },
    { name: "Framer Motion", level: 85 }
  ],
  "Backend Development": [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 80 },
    { name: "Python", level: 85 },
    { name: "Flask", level: 75 },
    { name: "MongoDB", level: 85 },
    { name: "PostgreSQL", level: 70 }
  ],
  "Machine Learning": [
    { name: "TensorFlow", level: 75 },
    { name: "PyTorch", level: 70 },
    { name: "scikit-learn", level: 80 },
    { name: "BERT", level: 75 },
    { name: "spaCy", level: 70 }
  ],
  "Tools & Others": [
    { name: "Git/GitHub", level: 90 },
    { name: "Docker", level: 75 },
    { name: "AWS", level: 70 },
    { name: "Vercel", level: 85 },
    { name: "DevOps", level: 80 }
  ]
}

export function SkillsCloud() {
  return (
    <div className="py-20 text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Technical Skills</h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          A comprehensive overview of my technical expertise and proficiency levels across different domains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, skillsList], categoryIndex) => (
          <div
            key={category}
            className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-white/10
                     hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold mb-6 text-white">{category}</h3>
            <div className="space-y-4">
              {skillsList.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>{skill.name}</span>
                    <span className="text-white/60">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{
                        width: `${skill.level}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Badges */}
      <div className="mt-16 flex flex-wrap justify-center gap-4">
        {["AWS Certified", "Google Cloud", "React Expert", "ML Engineer"].map((badge, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10
                     hover:bg-white/10 transition-all duration-300 transform hover:scale-110 text-white"
          >
            {badge}
          </div>
        ))}
      </div>
    </div>
  )
}