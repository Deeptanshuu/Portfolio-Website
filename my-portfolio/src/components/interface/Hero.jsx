/* eslint-disable react/no-unescaped-entities */
import { AnimatedText } from '../AnimatedText'
import { Logo } from './Logo'

export function Hero() {
  return (
    <section id="home" className="h-screen flex items-center justify-center px-4 sm:px-8 relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:top-12 lg:left-[5rem] scale-100">
        <Logo />
      </div>
      
      {/* Animated lines - Only visible on 1080p and higher */}
      <div className="absolute inset-0 opacity-60 hidden 2xl:block">
        <div className="absolute left-8 xl:left-64 top-0 w-px h-full 
          bg-gradient-to-b from-transparent via-white to-transparent opacity-50" />
        
        <div className="absolute bottom-1/4 left-0 h-px w-full 
          bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          
        <div className="absolute left-8 xl:left-64 bottom-1/4
          w-6 h-6 -translate-x-[12px] -translate-y-[-10px]">
          <span className="absolute w-6 h-[2px] bg-white top-1/2 -translate-y-[1px] opacity-50"></span>
          <span className="absolute h-6 w-[2px] bg-white left-1/2 -translate-x-[1px] opacity-50"></span>
        </div>
      </div>
      
      <div className="max-w-screen-xl w-full mx-auto relative">
        <div className="space-y-3 md:space-y-5 px-4 md:px-8">
          <div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter overflow-hidden leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              <AnimatedText delay={0.2}>
                <span className="block text-white">
                  Hi I&apos;m{" "}
                  <span
                    className="inline-block"
                    style={{ 
                      color: '#4fc1ff',
                      textShadow: '0 0 30px rgba(79, 193, 255, 0.3)',
                      willChange: 'transform',
                      WebkitFontSmoothing: 'subpixel-antialiased',
                      mozOsxFontSmoothing: 'grayscale',
                      transform: 'translateZ(0)'
                    }}
                  >
                    Deeptanshu,
                  </span>
                </span>
              </AnimatedText>
            </h1>
            
            <RolesList />
          </div>

          <Description />
        </div>
      </div>
    </section>
  )
}

function RolesList() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center 
      gap-0.5 sm:gap-1 md:gap-3 mt-1 sm:mt-2 md:mt-3 
      text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl 
      overflow-visible w-[20%]">
      <AnimatedText delay={0.4}>
        <span className="font-normal text-white">Developer</span>
      </AnimatedText>
      
      <span className="hidden md:block text-white/40">|</span>
      
      <AnimatedText delay={0.6}>
        <span className="text-white font-medium cursive">
          Designer
        </span>
      </AnimatedText>
      
      <span className="hidden md:block text-white/40">|</span>
      
      <AnimatedText delay={0.8}>
        <span className="text-white/80 font-light">
          Programmer
        </span>
      </AnimatedText>
    </div>
  )
}

function Description() {
  return (
    <div className="overflow-hidden max-w-[90%] md:max-w-2xl">
      <AnimatedText delay={0.8} className="
        bg-clip-text text-white/80
        text-xs sm:text-sm md:text-lg lg:text-xl
        font-light leading-relaxed
      ">
        I love everything space, computers and tech.
      </AnimatedText>
    </div>
  )
} 