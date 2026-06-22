import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import HeroCanvas from './components/HeroCanvas'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Reviews from './components/sections/Reviews'
import Booking from './components/sections/Booking'
import Location from './components/sections/Location'
import { scrollState } from './store'

gsap.registerPlugin(ScrollTrigger)
 const WA = 'https://tinyurl.com/barberiaelitePrenota'
/*
  ARCHITETTURA SCROLL:
  ─────────────────────────────────────────────────────────────────────
  • Hero container: height 300vh → crea 2×100vh di scroll effettivo
    (300vh container − 100vh canvas sticky = 200vh range animazione)
  • Canvas: position sticky top:0, height 100vh → rimane fisso mentre
    l'utente scrolla i 200vh di "spazio animazione"
  • progress = scrollY / (2 × innerHeight)  →  0 … 1
  • A progress ≥ 0.70: fade-in titolo ÈLITE Barberia
  • A progress ≥ 0.80: ClipperModel inizia il fade-out materiali
  • Dopo 300vh: canvas sale via, le sezioni HTML diventano visibili
  ─────────────────────────────────────────────────────────────────────
*/

const HERO_PAGES   = 2          // scroll-range in viewport-heights
const TITLE_AT     = 0.70       // progress soglia apparizione titolo
const CTA_DELAY    = 0.25       // secondi dopo il titolo

export default function App() {
  const eyebrowRef    = useRef<HTMLParagraphElement>(null)
  const titleRef      = useRef<HTMLDivElement>(null)
  const ctaRef        = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const titleShown    = useRef(false)

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration:    1.15,
      easing:      (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const HERO_SCROLL = HERO_PAGES * window.innerHeight

    /* Aggiorna scrollState.progress ad ogni tick Lenis */
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      scrollState.progress = Math.min(1, scroll / HERO_SCROLL)
      scrollState.started  = scroll > 0

      /* Trigger one-shot: titolo + CTA appaiono quando si raggiunge 70% */
      if (scrollState.progress >= TITLE_AT && !titleShown.current) {
        titleShown.current = true

        gsap.to(titleRef.current,   { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' })
        gsap.to(ctaRef.current,     { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: CTA_DELAY })
        gsap.to(scrollHintRef.current, { opacity: 0, duration: 0.5 })
      }
    })

    gsap.ticker.add((time: number) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000))
    }
  }, [])

  /* ── Stato iniziale: scroll hint visibile, titolo nascosto ── */
  useEffect(() => {
    gsap.set(titleRef.current,      { opacity: 0, y: 50 })
    gsap.set(ctaRef.current,        { opacity: 0, y: 30 })
    gsap.set(scrollHintRef.current, { opacity: 1 })
  }, [])

  return (
    <div className="w-full text-white font-sans" style={{ background: '#0a0a0a' }}>
      <Navbar />

      {/* ══ HERO — 300vh container con canvas sticky ══ */}
      <section id="hero" style={{ height: '300vh', position: 'relative' }}>

        {/* Canvas 3D: sticky, rimane fisso durante i 200vh di scroll */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse 80% 70% at 50% 45%, #1c1c26 0%, #111118 40%, #07070a 75%, #000 100%)',
          }}
        >
          <HeroCanvas />

          {/* Vignette top + bottom */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 100% 22% at 50% 0%,   rgba(0,0,0,.75) 0%, transparent 100%),' +
                'radial-gradient(ellipse 100% 22% at 50% 100%, rgba(0,0,0,.75) 0%, transparent 100%)',
            }}
          />

          {/* Eyebrow — sempre visibile */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
            <p ref={eyebrowRef}
               className="flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.22em] uppercase"
               style={{ color: 'rgba(var(--clr-blue-rgb), 0.75)' }}>
              <span className="block w-6 h-px" style={{ background: 'rgba(var(--clr-blue-rgb), .45)' }} />
              Villaggio Prenestino · Roma
              <span className="block w-6 h-px" style={{ background: 'rgba(var(--clr-blue-rgb), .45)' }} />
            </p>
          </div>

          {/* Titolo ÈLITE + tagline — appare a progress ≥ 0.70 */}
          <div
            ref={titleRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4
                       pointer-events-none select-none"
            style={{ opacity: 0 }}
          >
            <span
              className="block font-sans font-black text-white uppercase leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(4rem, 12vw, 13rem)' }}
            >
              ÈLITE
            </span>
            <span
              className="block font-serif italic font-normal leading-[0.9] -mt-3"
              style={{ fontSize: 'clamp(2.6rem, 7.5vw, 9rem)', color: 'var(--clr-blue)' }}
            >
              Barberia
            </span>
            <p className="font-light tracking-[0.2em] uppercase mt-1"
               style={{ fontSize: 'clamp(.7rem, 1.1vw, .88rem)', color: 'rgba(255,255,255,.35)' }}>
              L'arte del rasoio dal 2020
            </p>
          </div>

          {/* CTA Prenota — pointer-events attivi, appare con titolo */}
          <div
            ref={ctaRef}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 pointer-events-auto"
            style={{ opacity: 0 }}
          >
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-white font-bold text-[0.88rem]
                         tracking-[0.06em] uppercase px-8 py-3.5 rounded-full
                         transition-all duration-150 hover:scale-105"
              style={{ background: 'var(--clr-red)' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(214,40,40,.4)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Prenota Ora
            </a>
          </div>

          {/* Scroll hint — scompare quando appare il titolo */}
          <div
            ref={scrollHintRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2
                       text-[0.64rem] tracking-[0.14em] uppercase pointer-events-none"
            style={{ color: 'rgba(255,255,255,.22)' }}
          >
            <div className="w-px h-11 bg-gradient-to-b from-[rgba(0,80,157,.55)] to-transparent
                            animate-[lineAnim_1.9s_ease-in-out_infinite]" />
            Scroll
          </div>
        </div>
      </section>

      {/* ══ SEZIONI — visibili dopo 300vh ══ */}
      <About />
      <Services />
      <Reviews />
      <Booking />
      <Location />

      {/* Footer */}
      <footer className="py-14 px-6 text-center border-t border-white/[0.04]"
              style={{ background: '#000' }}>
        <div className="font-serif italic text-[1.65rem] mb-2" style={{ color: 'var(--clr-blue)' }}>
          Èlite Barberia
        </div>
        <div className="text-[0.72rem] tracking-wide mb-6" style={{ color: 'rgba(255,255,255,.17)' }}>
          Via del Fosso dell'Osa, 215 · 00132 Roma · Villaggio Prenestino
        </div>
        <div className="flex justify-center gap-8">
          {[
            ['https://wa.me/393518600258', 'WhatsApp'],
            ['https://instagram.com/elite_barberia1', 'Instagram'],
            ['https://maps.google.com/?q=Via+del+Fosso+dell%27Osa+215+Roma', 'Mappa'],
          ].map(([href, label]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               className="text-[0.74rem] tracking-wide transition-colors duration-200"
               style={{ color: 'rgba(255,255,255,.27)' }}
               onMouseEnter={e => (e.currentTarget.style.color = '#FFE57F')}
               onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.27)')}>
              {label}
            </a>
          ))}
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9990] flex gap-3 px-4 py-3
                      backdrop-blur-lg border-t border-white/[0.07]"
           style={{ background: 'rgba(10,10,10,.96)' }}>
        <a href={WA} target="_blank" rel="noopener noreferrer"
           className="flex-1 flex items-center justify-center gap-2 text-white font-bold
                      text-[0.78rem] py-3 rounded-xl active:scale-[.97] transition-transform"
           style={{ background: '#25D366' }}>
          Prenota
        </a>
        <a href="https://instagram.com/elite_barberia1" target="_blank" rel="noopener noreferrer"
           className="flex-1 flex items-center justify-center gap-2 text-white font-bold
                      text-[0.78rem] py-3 rounded-xl active:scale-[.97] transition-transform"
           style={{ background: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)' }}>
          Instagram
        </a>
      </div>
    </div>
  )
}
