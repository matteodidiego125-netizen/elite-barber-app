import { useEffect, useState } from 'react'

const WA = 'https://wa.me/393518600258?text=Ciao!%20Vorrei%20prenotare%20un%20appuntamento.'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — Blu profondo */}
        <a href="#hero"
           className="font-serif italic text-xl tracking-wide"
           style={{ color: 'var(--clr-blue)' }}>
          Èlite Barberia
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            ['#about',       'Chi siamo'],
            ['#servizi',     'Servizi'],
            ['#recensioni',  'Recensioni'],
            ['#location',    'Dove siamo'],
          ].map(([href, label]) => (
            <a key={href} href={href}
               className="text-xs font-medium tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-200">
              {label}
            </a>
          ))}
        </nav>

        {/* CTA — Rosso deciso */}
        <a href={WA} target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest
                      px-5 py-2.5 rounded-full hover:scale-105 hover:brightness-110 transition-all duration-150"
           style={{ background: 'var(--clr-red)' }}>
          Prenota
        </a>

      </div>
    </header>
  )
}
