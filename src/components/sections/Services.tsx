const WA = (msg: string) =>
  `https://wa.me/393518600258?text=${encodeURIComponent(msg)}`

const SERVICES = [
  { icon: '✂️', name: 'Taglio Uomo',           dur: '30 min', price: '€15', desc: 'Taglio personalizzato con consulenza stilistica, lavaggio e asciugatura professionale.' },
  { icon: '💈', name: 'Taglio + Barba',        dur: '50 min', price: '€25', desc: 'Il trattamento completo: taglio personalizzato e rifinitura barba con prodotti premium.' },
  { icon: '🪒', name: 'Rasatura Tradizionale', dur: '35 min', price: '€18', desc: 'Rasatura con rasoio a mano libera, asciugamano caldo e creme da barba artigianali.' },
  { icon: '🧔', name: 'Rifinitura Barba',      dur: '20 min', price: '€10', desc: "Definizione dei contorni, lineetta e rifinitura precisa. Perfetto tra un taglio e l'altro." },
  { icon: '✨', name: 'Trattamento Pelli',     dur: '40 min', price: '€20', desc: 'Maschera viso, esfoliazione e idratazione profonda. Pelle luminosa dopo una sola sessione.' },
  { icon: '👦', name: 'Taglio Bambino',        dur: '25 min', price: '€10', desc: 'Taglio delicato e paziente per i più piccoli. Ambiente tranquillo per tutta la famiglia.' },
]

export default function Services() {
  return (
    <section id="servizi" className="bg-ink-2 py-28 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center max-w-xl mx-auto mb-16">
          {/* Eyebrow — Blu */}
          <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] uppercase mb-3"
             style={{ color: 'var(--clr-blue)' }}>
            <span className="block w-5 h-px" style={{ background: 'var(--clr-blue)' }} />
            I nostri servizi
            <span className="block w-5 h-px" style={{ background: 'var(--clr-blue)' }} />
          </p>
          <h2 className="font-serif text-4xl text-white leading-[1.15] mb-3">
            Trattamenti <em>su misura</em>
          </h2>
          <p className="text-white/38 text-[0.88rem]">Passa sul card per i dettagli · Prenota su WhatsApp</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div key={s.name} className="group relative h-[220px] [perspective:1000px] cursor-pointer">
              <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-[600ms]
                              [transition-timing-function:cubic-bezier(.4,0,.2,1)]
                              group-hover:[transform:rotateY(180deg)]">

                {/* Front — bordo Blu sottile on hover */}
                <div className="absolute inset-0 rounded-[20px] bg-white/[0.028] border border-white/[0.07]
                                [backface-visibility:hidden] p-7 flex flex-col justify-between
                                hover:border-b-blue/30 transition-colors">
                  <div>
                    <div className="text-3xl mb-1">{s.icon}</div>
                    <div className="font-bold text-white">{s.name}</div>
                    <div className="text-[0.68rem] text-white/30 tracking-wide mt-0.5">{s.dur}</div>
                  </div>
                  {/* Prezzo — Rosso per massima attenzione */}
                  <div className="text-[2rem] font-black leading-none" style={{ color: 'var(--clr-red)' }}>
                    {s.price}
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 rounded-[20px] [backface-visibility:hidden]
                                [transform:rotateY(180deg)] p-7 flex flex-col justify-between"
                     style={{
                       background: `linear-gradient(140deg, rgba(var(--clr-blue-rgb),.08), rgba(var(--clr-red-rgb),.05))`,
                       border:     `1px solid rgba(var(--clr-blue-rgb),.2)`,
                     }}>
                  <div>
                    {/* Titolo back — Blu */}
                    <div className="font-serif text-[1.05rem] mb-2" style={{ color: 'var(--clr-blue)' }}>
                      {s.name}
                    </div>
                    <p className="text-[0.82rem] text-white/55 leading-[1.65]">{s.desc}</p>
                  </div>
                  {/* CTA WhatsApp — mantiene verde brand */}
                  <a href={WA(`Ciao! Vorrei prenotare: ${s.name} (${s.price}).`)}
                     target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 text-white font-bold
                                text-[0.74rem] px-4 py-1.5 rounded-full w-fit mt-2 hover:brightness-110 transition-all"
                     style={{ background: '#25D366' }}
                     onClick={(e) => e.stopPropagation()}>
                    Prenota
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
