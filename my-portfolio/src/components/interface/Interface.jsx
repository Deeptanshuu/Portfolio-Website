import { Navigation } from '../navigation/Navigation'
import { Hero } from './Hero'
import { Projects } from './Projects'
import { SkillsCloud } from '../SkillsCloud'
import { Contact } from './Contact'
import { Divider } from './Divider'

export function Interface() {
  return (
    <div className="w-screen">
      <Navigation />
      <Hero />
      <Divider />
      <Projects />
      <Divider />
      <section id="skills" className="min-h-screen py-20">
        <div className="max-w-screen-xl mx-auto px-8">
          <SkillsCloud />
        </div>
      </section>
      <Divider />
      <Contact />
    </div>
  )
} 