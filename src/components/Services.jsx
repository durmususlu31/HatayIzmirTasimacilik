import { useEffect, useRef, useState } from 'react'

const services = [
  {
    title: 'Evden Eve Nakliyat',
    description: 'Evinizin her köşesini özenle paketleyip, yeni adresinize güvenle taşıyoruz. Profesyonel ekibimiz mobilyalarınızı söküp montaj dahil hizmet sunar.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    features: ['Paketleme', 'Söküm & Montaj', 'Sigortalı'],
    color: 'blue',
  },
  {
    title: 'Fabrika Taşımacılığı',
    description: 'Endüstriyel ekipman ve fabrika malzemelerinin güvenli taşınması. Ağır yük tecrübesi ile hassas ekipmanlarınız emin ellerde.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    features: ['Ağır Yük', 'Endüstriyel', 'Özel Ekipman'],
    color: 'orange',
  },
  {
    title: 'Parça Eşya Taşıma',
    description: 'Tek bir koli bile olsa dikkatlice taşırız. Küçük gönderileriniz için ekonomik ve güvenli parsiyel taşımacılık hizmeti.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    features: ['Ekonomik', 'Tek Parça', 'Hızlı'],
    color: 'green',
  },
]

const colorMap = {
  blue: {
    iconBg: 'bg-[#2563EB]/8',
    iconBgHover: 'group-hover:bg-[#2563EB]/14',
    iconText: 'text-[#2563EB]',
    tagBg: 'bg-[#2563EB]/6',
    tagText: 'text-[#2563EB]/70',
    tagHoverBg: 'group-hover:bg-[#2563EB]/10',
    tagHoverText: 'group-hover:text-[#2563EB]',
    arrowText: 'group-hover:text-[#2563EB]',
    borderHover: 'hover:border-[#2563EB]/20',
    shadowHover: 'hover:shadow-[#2563EB]/6',
  },
  orange: {
    iconBg: 'bg-[#EA580C]/8',
    iconBgHover: 'group-hover:bg-[#EA580C]/14',
    iconText: 'text-[#EA580C]',
    tagBg: 'bg-[#EA580C]/6',
    tagText: 'text-[#EA580C]/70',
    tagHoverBg: 'group-hover:bg-[#EA580C]/10',
    tagHoverText: 'group-hover:text-[#EA580C]',
    arrowText: 'group-hover:text-[#EA580C]',
    borderHover: 'hover:border-[#EA580C]/20',
    shadowHover: 'hover:shadow-[#EA580C]/6',
  },
  green: {
    iconBg: 'bg-[#16A34A]/8',
    iconBgHover: 'group-hover:bg-[#16A34A]/14',
    iconText: 'text-[#16A34A]',
    tagBg: 'bg-[#16A34A]/6',
    tagText: 'text-[#16A34A]/70',
    tagHoverBg: 'group-hover:bg-[#16A34A]/10',
    tagHoverText: 'group-hover:text-[#16A34A]',
    arrowText: 'group-hover:text-[#16A34A]',
    borderHover: 'hover:border-[#16A34A]/20',
    shadowHover: 'hover:shadow-[#16A34A]/6',
  },
}

export default function Services() {
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
    <section
      id="hizmetler"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-badge">
            <span className="badge-dot" />
            Hizmetlerimiz
          </span>
          <h2 className="section-title">
            Ne Taşırsanız Taşıyalım
          </h2>
          <p className="section-subtitle mx-auto">
            Evden eve nakliyattan fabrika taşımacılığına, her ihtiyacınız için profesyonel çözümler
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colors = colorMap[service.color]
            return (
              <div
                key={service.title}
                className={`group relative bg-white rounded-2xl p-8 border border-[#E2E8F0] transition-all duration-300 hover:shadow-2xl ${colors.shadowHover} hover:-translate-y-2 ${colors.borderHover} ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                }}
              >
                {/* Hover gradient accent */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${colors.iconBg} ${colors.iconBgHover} flex items-center justify-center ${colors.iconText} transition-all duration-250 mb-6`}>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3" style={{ fontFamily: 'var(--font-family-display)' }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#64748B] leading-relaxed mb-6 text-[0.92rem]">
                    {service.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map(feat => (
                      <span
                        key={feat}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full ${colors.tagBg} ${colors.tagText} ${colors.tagHoverBg} ${colors.tagHoverText} transition-colors duration-250`}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className={`mt-6 flex items-center gap-2 text-[#94A3B8] ${colors.arrowText} transition-colors duration-250 cursor-pointer`}>
                    <span className="text-sm font-semibold">Detaylı Bilgi</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
