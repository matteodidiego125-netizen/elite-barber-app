const REVIEWS = [
  { author: 'Dani Ejiogu',       text: '"Barbiere fantastico, professionale e preciso. Ambiente curato e accogliente. Non cambierei per niente al mondo!"' },
  { author: 'Lorenzo Martino',    text: '"Ottimo barbiere, sempre disponibile e con un occhio al dettaglio. Il taglio+barba è il migliore che abbia mai fatto in zona."' },
  { author: 'Daniele Scaramella', text: '"Professionalità e gentilezza al top. Ho trovato il mio barbiere di fiducia a Roma. Consigliatissimo a tutti!"' },
]

export default function Reviews() {
  return (
    <section id="recensioni" className="bg-ink py-28 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center max-w-xl mx-auto mb-16">
          {/* Eyebrow — Blu */}
          <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] uppercase mb-3"
             style={{ color: 'var(--clr-blue)' }}>
            <span className="block w-5 h-px" style={{ background: 'var(--clr-blue)' }} />
            Recensioni
            <span className="block w-5 h-px" style={{ background: 'var(--clr-blue)' }} />
          </p>
          <h2 className="font-serif text-4xl text-white leading-[1.15]">
            Lo dicono <em>i clienti</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {REVIEWS.map((r) => (
            <div key={r.author}
              className="bg-white/[0.024] border border-white/[0.06] rounded-[20px] p-7
                         hover:-translate-y-1 transition-all duration-300"
              style={{ '--hover-border': 'rgba(var(--clr-blue-rgb), .2)' } as React.CSSProperties}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,80,157,.22)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '')}>
              {/* Stelle — Rosso deciso */}
              <div className="text-sm mb-4" style={{ color: 'var(--clr-red)' }}>★★★★★</div>
              <p className="text-[0.86rem] text-white/52 leading-[1.75] italic mb-5">{r.text}</p>
              <div className="font-bold text-[0.82rem] text-white">{r.author}</div>
              <div className="text-[0.68rem] text-white/24 mt-0.5">Google Review · 5/5</div>
            </div>
          ))}
        </div>

        {/* Summary badge — numero in Rosso per impatto visivo */}
        <div className="max-w-sm mx-auto text-center rounded-[20px] py-8 px-6"
             style={{
               background: `rgba(var(--clr-red-rgb), .04)`,
               border:     `1px solid rgba(var(--clr-red-rgb), .12)`,
             }}>
          <div className="text-6xl font-black leading-none" style={{ color: 'var(--clr-red)' }}>
            5.0
          </div>
          <div className="text-[0.72rem] text-white/30 tracking-wide mt-2">
            Media su 8 recensioni Google
          </div>
        </div>

      </div>
    </section>
  )
}
