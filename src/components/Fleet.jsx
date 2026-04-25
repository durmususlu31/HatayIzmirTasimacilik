import { useEffect, useRef, useState } from 'react'

const trucks = [
  {
    name: 'Mercedes Actros 1848',
    driver: 'Yusuf Uslu',
    capacity: '25 Ton',
    phone: '905333224888',
    type: 'Mega Tır',
    image: '/images/mercedes-actros.png',
    brand: 'Mercedes-Benz',
  },
  {
    name: 'Scania R500',
    driver: 'Mustafa Türkmenoğlu',
    capacity: '25 Ton',
    phone: '905354608650',
    type: 'Mega Tır',
    image: '/images/scania-r500.png',
    brand: 'Scania',
  },
  {
    name: 'Scania R450',
    driver: 'Burak Uslu',
    capacity: '25 Ton',
    phone: '905333224888',
    type: 'Mega Tır',
    image: '/images/scania-r450.png',
    brand: 'Scania',
  },
  {
    name: 'Ford Cargo',
    driver: 'Cemil Türkmenoğlu',
    capacity: '25 Ton',
    phone: '905333224888',
    type: 'Mega Tır',
    image: '/images/ford-cargo.png',
    brand: 'Ford Trucks',
  },
]

export default function Fleet() {
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
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="filo" ref={sectionRef} className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="section-badge">
            <span className="badge-dot" />
            Filomuz
          </span>
          <h2 className="section-title">
            Güçlü Filomuzla Yanınızdayız
          </h2>
          <p className="section-subtitle mx-auto">
            Mercedes, Scania ve Ford Trucks markaları ile profesyonel ve güvenli taşımacılık
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trucks.map((truck, index) => (
            <div
              key={truck.name}
              className={`group relative bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] transition-all duration-300 hover:shadow-2xl hover:shadow-[#2563EB]/6 hover:-translate-y-2 hover:border-[#2563EB]/15 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 120}ms` : '0ms',
              }}
            >
              {/* Truck Image */}
              <div className="relative h-52 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] flex items-center justify-center overflow-hidden">
                <img
                  src={truck.image}
                  alt={`${truck.name} - ${truck.brand}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Brand badge */}
                <div className="absolute top-3 left-3 bg-[#0F172A]/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm tracking-wide uppercase">
                  {truck.brand}
                </div>
                {/* Capacity badge */}
                <div className="absolute top-3 right-3 bg-[#2563EB] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#2563EB]/25">
                  {truck.capacity}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                {/* Truck name */}
                <h3 className="text-base font-bold text-[#0F172A] mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
                  {truck.name}
                </h3>

                {/* Driver info */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-[#2563EB]/8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <span className="text-sm text-[#334155] font-semibold">{truck.driver}</span>
                </div>

                {/* Type tag */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#EA580C]/8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#EA580C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  <span className="text-xs text-[#64748B] font-medium">{truck.type} • Büyük Kapasite</span>
                </div>

                {/* WhatsApp Contact Button */}
                <a
                  href={`https://wa.me/${truck.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#16A34A]/8 hover:bg-[#16A34A] text-[#16A34A] hover:text-white py-3 rounded-xl font-semibold text-sm transition-all duration-250 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Sürücü ile İletişime Geç
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet summary */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
            <span>Toplam <strong className="text-[#0F172A]">4 TIR</strong> • <strong className="text-[#0F172A]">100 Ton</strong> taşıma kapasitesi</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span>Tüm araçlar <strong className="text-[#0F172A]">tam sigortalı</strong></span>
          </div>
        </div>
      </div>
    </section>
  )
}
