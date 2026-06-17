const MAPS = 'https://maps.google.com/?q=Via+del+Fosso+dell%27Osa+215+Roma'

export default function Location() {
  return (
    <section id="location" className="bg-ink py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        <div>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.15] mb-8">
            Dove<br />siamo
          </h2>

          {[
            { icon: '📍', content: <><strong className="text-white">Via del Fosso dell'Osa, 215</strong><br />00132 Roma RM — Villaggio Prenestino</> },
            { icon: '🕐', content: <><strong className="text-white">Mar – Sab:</strong> 09:00 – 19:00<br /><strong className="text-white">Lun + Dom:</strong> chiuso</> },
            { icon: '📱', content: <strong className="text-white">+39 351 860 0258</strong> },
            { icon: '📸', content: <strong className="text-white">@elite_barberia1</strong> },
          ].map(({ icon, content }, i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-white/[0.05] last:border-none
                                    text-white/50 text-[0.86rem] leading-[1.55]">
              <span className="text-base min-w-5 mt-0.5">{icon}</span>
              <div>{content}</div>
            </div>
          ))}
        </div>

        {/* Mappa — hover con bordo Blu */}
        <a href={MAPS} target="_blank" rel="noopener noreferrer"
           className="flex flex-col items-center justify-center gap-4 aspect-[4/3] rounded-[20px]
                      bg-white/[0.024] border border-white/[0.058] text-white/20 no-underline
                      hover:-translate-y-1 transition-all duration-300"
           onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,80,157,.35)')}
           onMouseLeave={e => (e.currentTarget.style.borderColor = '')}>
          <span className="text-5xl">📍</span>
          <span className="text-[0.7rem] tracking-widest uppercase">Apri in Google Maps</span>
        </a>

      </div>
    </section>
  )
}
