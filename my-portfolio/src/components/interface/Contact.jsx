import { AnimatedText } from '../AnimatedText'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

const socialLinks = [
  { 
    label: 'GitHub',
    url: 'https://github.com/Deeptanshuu',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    )
  },
  { 
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/deeptanshu-lal-6868a4187/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
      </svg>
    )
  }
]

export function Contact() {
  return (
    <section id="contact" className="relative py-32 mb-20 sm:mb-0 ">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-950/10 to-black/0 pointer-events-none" />
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <div className="text-right mb-24 overflow-visible">
          <div className="overflow-visible">
            <AnimatedText>
              <span
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold block overflow-visible text-white"
              >
                Let's work together
              </span>
            </AnimatedText>
          </div>
          <div className="overflow-visible">
            <AnimatedText delay={0.2}>
              <a 
                href="mailto:your@email.com"
                className="inline-block mt-8 text-white/80 text-xl border-b-2 border-white/20 pb-2 
                  hover:text-white hover:border-white transition-colors duration-300"
              >
                Get in touch →
              </a>
            </AnimatedText>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-4">
          <div className="flex gap-6 scale-150">
            {socialLinks.map((social, index) => (
              <AnimatedText key={social.label} delay={0.1 * index}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              </AnimatedText>
            ))}
          </div>

          <AnimatedText delay={0.3}>
            <a
              href="/resume.pdf"
              download
              className="group flex items-center gap-2 px-7 py-3 rounded-full
                bg-white/5 hover:bg-white/10
                border border-white/10 hover:border-white/20
                text-white/60 hover:text-white
                transition-all duration-300"
            >
              <span>Download Resume</span>
              <ArrowDownTrayIcon className="w-5 h-5 ml-2 mb-0.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </AnimatedText>
        </div>
      </div>

      <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
} 