import { AnimatedText } from '../AnimatedText'

export function Contact() {
  return (
    <section id="contact" className="flex items-center justify-center py-20">
      <div className="max-w-screen-xl mx-auto px-8 text-right">
        <div className="overflow-v">
          <AnimatedText className="block text-white text-8xl font-bold">
            Let's work together
          </AnimatedText>
        </div>
        <div className="overflow-hidden">
          <AnimatedText delay={0.2}>
            <a 
              href="mailto:your@email.com"
              className="inline-block mt-8 text-white text-xl border-b-2 border-white pb-2 hover:opacity-70 transition-opacity"
            >
              Get in touch →
            </a>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
} 