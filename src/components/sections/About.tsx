/* Eyebrow helper — riusabile */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] uppercase mb-4"
       style={{ color: 'var(--clr-blue)' }}>
      <span className="block w-5 h-px" style={{ background: 'var(--clr-blue)' }} />
      {children}
      <span className="block w-5 h-px" style={{ background: 'var(--clr-blue)' }} />
    </p>
  )
}

export default function About() {
  return (
    <section id="about" className="bg-ink-2 py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* Testo */}
        <div>
          <Eyebrow>La nostra storia</Eyebrow>

          <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1] mb-6">
            L'arte del rasoio,<br />
            {/* em — Blu profondo per il contrasto elegante */}
            <em className="not-italic" style={{ color: 'var(--clr-blue)' }}>
              la cura del dettaglio
            </em>
          </h2>

          <p className="text-white/50 leading-[1.85] text-[0.95rem] mb-4">
            Nel cuore del Villaggio Prenestino, Èlite Barberia nasce dalla passione per
            la tradizione barbiera italiana fusa con il senso estetico contemporaneo.
          </p>
          <p className="text-white/50 leading-[1.85] text-[0.95rem] mb-10">
            Ogni cliente è accolto come un ospite: con rispetto, attenzione e la
            dedizione di chi fa del proprio mestiere un'arte quotidiana.
          </p>

          {/* Stats — numeri in Blu */}
          <div className="flex gap-10 pt-8 border-t border-white/[0.06]">
            {[
              { num: '5.0',  lbl: 'Rating Google' },
              { num: '100%', lbl: 'Soddisfazione' },
              { num: '6+',   lbl: 'Servizi premium' },
            ].map(({ num, lbl }) => (
              <div key={lbl}>
                <div className="text-4xl font-black leading-none" style={{ color: 'var(--clr-blue)' }}>
                  {num}
                </div>
                <div className="text-[0.66rem] text-white/30 tracking-widest uppercase mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] aspect-[3/4]
                        bg-gradient-to-br from-[#131314] to-[#0e0e0f] flex items-center justify-center">
          {/* Monogram — tinta Blu quasi invisibile */}
          <span className="text-[8rem] font-black leading-none select-none tracking-[-0.06em]"
                style={{ color: 'rgba(var(--clr-blue-rgb), 0.06)' }}>
            ÈB
          </span>

          {/* Badge rating — numero in Rosso per impatto */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/[0.04] backdrop-blur-md
                          border border-white/[0.07] rounded-2xl px-5 py-4
                          flex justify-between items-center">
            <span className="text-[0.75rem] text-white/40">Google Reviews</span>
            <span className="font-bold flex items-center gap-1" style={{ color: 'var(--clr-red)' }}>
              ⭐ 5.0
              <span className="font-light text-[0.69rem] text-white/30">(8 rec.)</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
