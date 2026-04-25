import { useEffect, useRef, useState } from 'react'

const reasons = [
  {
    title: 'Sigortalı Taşıma',
    description: 'Tüm eşyalarınız taşıma süresince tam kapsamlı sigorta güvencesi altındadır.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    accent: '#2563EB',
  },
  {
    title: '7/24 Takip',
    description: 'Eşyalarınızın konumunu anlık olarak takip edebilir, bilgi alabilirsiniz.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    accent: '#16A34A',
  },
  {
    title: 'Deneyimli Kadro',
    description: '10+ yıllık sektör tecrübesi ile profesyonel ve eğitimli personel.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    accent: '#0F172A',
  },
  {
    title: 'Zamanında Teslimat',
    description: 'Söz verdiğimiz tarihte teslimat garantisi. Gecikmesiz, güvenilir hizmet.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: '#EA580C',
  },
]

export default function WhyUs() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#2563EB]/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-badge">
            <span className="badge-dot" />
            Neden Biz?
          </span>
          <h2 className="section-title">
            Güvenin Adresi
          </h2>
          <p className="section-subtitle mx-auto">
            Müşteri memnuniyetini en ön planda tutan, şeffaf ve güvenilir hizmet anlayışımız
          </p>
        </div>

        {/* Trust Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, index) => (
            <div
              key={item.title}
              className={`group text-center p-8 rounded-2xl bg-white border border-[#E2E8F0] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 transition-transform duration-250 group-hover:scale-110"
                style={{
                  background: `${item.accent}12`,
                  color: item.accent,
                }}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
                {item.title}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
