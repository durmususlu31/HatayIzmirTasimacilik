import { useEffect, useState } from 'react'

/* ── Animated counter hook ── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

/* ── Trust Badge Item ── */
function TrustBadge({ icon, value, label, delay, started }) {
  return (
    <div
      className="hero-badge-item"
      style={{ animationDelay: delay }}
    >
      <div className="hero-badge-icon">
        {icon}
      </div>
      <div className="hero-badge-text">
        <span className="hero-badge-value">{value}</span>
        <span className="hero-badge-label">{label}</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const yearsCount  = useCounter(30, 1800, started)
  const delivCount  = useCounter(2000, 2200, started)

  const badges = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      value: `${yearsCount}+`,
      label: 'Yıl Deneyim',
      delay: '0.7s',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="1" />
          <path d="M16 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      value: 'Geniş',
      label: 'Araç Filosu',
      delay: '0.85s',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      value: `${delivCount.toLocaleString('tr-TR')}+`,
      label: 'Başarılı Teslimat',
      delay: '1s',
    },
  ]

  return (
    <section id="hero" className="hero-section">

      {/* ── Background Image Layer ── */}
      <div className="hero-bg-layer">
        <img
          src="/images/hero-bg.png"
          alt="Akdeniz kıyı yolunda lojistik kamyon"
          className="hero-bg-img"
          loading="eager"
          fetchPriority="high"
        />
        {/* Multi-layer gradient overlay */}
        <div className="hero-overlay-gradient" />
        <div className="hero-overlay-vignette" />
        {/* Bottom fade */}
        <div className="hero-overlay-bottom" />
      </div>

      {/* ── Decorative glow orbs ── */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      {/* ── Animated grid lines ── */}
      <div className="hero-grid-lines" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="hero-grid-line" style={{ left: `${20 * (i + 1)}%`, animationDelay: `${i * 0.3}s` }} />
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className="hero-content-wrap">
        <div className="hero-content-inner">

          {/* Live badge */}
          <div className="hero-live-badge animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="hero-live-dot" />
            <span>Hatay ↔ İzmir Hattı Aktif</span>
          </div>

          {/* H1 Headline */}
          <h1 className="hero-headline animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            Akdeniz'den Ege'ye
            <br />
            <span className="hero-headline-highlight">Güvenle</span>{' '}
            <span className="hero-headline-suffix">Taşırız</span>
          </h1>

          {/* Sub-headline */}
          <p className="hero-subtext animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            30+ yıllık sektör deneyimimiz, sigortalı taşımacılık güvencemiz ve
            profesyonel ekibimizle eşyalarınız en güvende ellerde.{' '}
            <strong>Zamanında teslimat garantisi</strong> ile Hatay–İzmir hattının
            tercihiniz.
          </p>

          {/* Trust Badges */}
          <div className="hero-badges animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {badges.map((b) => (
              <TrustBadge key={b.label} {...b} started={started} />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-ctas animate-fade-in-up" style={{ animationDelay: '0.75s' }}>

            {/* Primary CTA */}
            <a href="#teklif" id="hero-cta-primary" className="hero-btn-primary group">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Hızlı Teklif Al</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Secondary — WhatsApp glassmorphism */}
            <a
              href="https://wa.me/905333224888"
              id="hero-cta-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-secondary group"
            >
              {/* WhatsApp icon */}
              <svg className="w-5 h-5 flex-shrink-0 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp İletişim</span>
            </a>
          </div>

          {/* Insurance note */}
          <div className="hero-insurance-note animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <svg className="w-4 h-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Tüm yükler <strong>tam kapsamlı sigorta</strong> güvencesi altındadır.</span>
          </div>

        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-dot" />
        </div>
        <span className="hero-scroll-label">Keşfet</span>
      </div>

    </section>
  )
}
