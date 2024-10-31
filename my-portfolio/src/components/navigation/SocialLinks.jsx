import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export function SocialLinks({ socialLinks, isMenuOpen }) {
  return (
    <div className={`
      flex flex-col gap-12
      transition-all duration-700 delay-300
      ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
    `}>
      <ContactInfo />
      <SocialLinksGrid socialLinks={socialLinks} isMenuOpen={isMenuOpen} />
    </div>
  )
}

function ContactInfo() {
  return (
    <div className="text-right">
      <p className="text-white/40 mb-2 text-sm uppercase tracking-wider">Get in touch</p>
      <a 
        href="mailto:your@email.com" 
        className="text-white text-xl hover:text-white/60 transition-colors"
      >
        your@email.com
      </a>
    </div>
  )
}

function SocialLinksGrid({ socialLinks, isMenuOpen }) {
  return (
    <div className="text-right">
      <p className="text-white/40 mb-4 text-sm uppercase tracking-wider">Follow</p>
      <div className="flex flex-col gap-3">
        {socialLinks.map(({ label, url }, index) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              text-white/60 hover:text-white transition-all text-lg 
              flex items-center justify-end gap-2 group
              duration-700 delay-[${(index + 5) * 100}ms]
              ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
            `}
          >
            {label}
            <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-1 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  )
} 