import { useEffect, useRef, useState } from 'react'
import { TURKEY_PATH, PRECOMPUTED_CITIES } from './mapData'

const CITIES = [
  { name: 'İstanbul',  highlight: '' },
  { name: 'Ankara',    highlight: '' },
  { name: 'İzmir',     highlight: 'green' },
  { name: 'Bursa',     highlight: '' },
  { name: 'Antalya',   highlight: '' },
  { name: 'Adana',     highlight: '' },
  { name: 'Konya',     highlight: '' },
  { name: 'Gaziantep', highlight: '' },
  { name: 'Hatay',     highlight: 'orange' },
  { name: 'Mersin',    highlight: '' },
  { name: 'Kayseri',   highlight: '' },
  { name: 'Trabzon',   highlight: '' },
  { name: 'Erzurum',   highlight: '' },
  { name: 'Samsun',    highlight: '' },
  { name: 'Eskişehir', highlight: '' },
  { name: 'Diyarbakır',highlight: '' },
  { name: 'Manisa',    highlight: '' },
  { name: 'Muğla',     highlight: '' },
  { name: 'Afyon',     highlight: '' },
  { name: 'Uşak',      highlight: '' },
].map(c => ({ ...c, x: PRECOMPUTED_CITIES[c.name].x, y: PRECOMPUTED_CITIES[c.name].y }));

/* Güzergah waypoint noktaları: Hatay → Adana → Konya → Afyon → Uşak → İzmir */
const IZMIR_POS   = PRECOMPUTED_CITIES['İzmir']
const HATAY_POS   = PRECOMPUTED_CITIES['Hatay']
const ADANA_POS   = PRECOMPUTED_CITIES['Adana']
const KONYA_POS   = PRECOMPUTED_CITIES['Konya']
const AFYON_POS   = PRECOMPUTED_CITIES['Afyon']
const USAK_POS    = PRECOMPUTED_CITIES['Uşak']


/* Cubic bezier route path */
const ROUTE_PATH = `
  M ${HATAY_POS.x},${HATAY_POS.y}
  C ${HATAY_POS.x - 10},${HATAY_POS.y - 10}
    ${ADANA_POS.x + 10},${ADANA_POS.y + 10}
    ${ADANA_POS.x},${ADANA_POS.y}
  C ${ADANA_POS.x - 20},${ADANA_POS.y - 15}
    ${KONYA_POS.x + 20},${KONYA_POS.y + 15}
    ${KONYA_POS.x},${KONYA_POS.y}
  C ${KONYA_POS.x - 15},${KONYA_POS.y - 5}
    ${AFYON_POS.x + 15},${AFYON_POS.y + 5}
    ${AFYON_POS.x},${AFYON_POS.y}
  C ${AFYON_POS.x - 10},${AFYON_POS.y - 5}
    ${USAK_POS.x + 10},${USAK_POS.y + 5}
    ${USAK_POS.x},${USAK_POS.y}
  C ${USAK_POS.x - 15},${USAK_POS.y - 10}
    ${IZMIR_POS.x + 20},${IZMIR_POS.y + 10}
    ${IZMIR_POS.x},${IZMIR_POS.y}
`

/* Şehir ikonu bileşeni */
function CityDot({ city, isVisible, delaySec = 0 }) {
  const pos = city;
  const isOrange = city.name === 'Hatay' || city.highlight === 'orange'
  const isGreen  = city.name === 'İzmir' || city.highlight === 'green'
  const isRoute  = ['Adana', 'Konya', 'Afyon', 'Uşak'].includes(city.name)
  const isHighlighted = isOrange || isGreen

  const color = isOrange ? '#EA580C' : isGreen ? '#16A34A' : isRoute ? '#2563EB' : '#94a3b8'
  const bgColor = isOrange
    ? 'rgba(234,88,12,0.15)'
    : isGreen
    ? 'rgba(22,163,74,0.15)'
    : 'rgba(148,163,184,0.15)'

  if (!isVisible) return null

  return (
    <g transform={`translate(${pos.x}, ${pos.y})`} opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${delaySec}s`} fill="freeze" />
      <g>
        <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="0.5s" begin={`${delaySec}s`} fill="freeze" />
        {isHighlighted && (
          <circle
            r={16}
            fill={bgColor}
            className="animate-dot-pulse"
            style={{ animationDelay: `${delaySec}s` }}
          />
        )}
        <circle
          r={isHighlighted ? 7 : isRoute ? 5 : 4}
          fill={color}
          filter={isHighlighted || isRoute ? 'url(#glow)' : undefined}
        />
        <text
          y={isHighlighted ? -16 : -10}
          textAnchor="middle"
          fill={isHighlighted ? (isOrange ? '#EA580C' : '#16A34A') : isRoute ? '#1E40AF' : '#64748b'}
          fontSize={isHighlighted ? '13' : isRoute ? '11' : '10'}
          fontWeight={isHighlighted || isRoute ? '700' : '500'}
          fontFamily="Inter, sans-serif"
          style={{ userSelect: 'none' }}
        >
          {city.name}
        </text>
      </g>
    </g>
  )
}

/* SVG stat icons — Skill: No emoji as structural icons, use SVG */
const StatIcon = ({ type }) => {
  const icons = {
    distance: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12H3M21 12l-4-4M21 12l-4 4M3 12l4-4M3 12l4 4" />
      </svg>
    ),
    time: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    truck: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    delivery: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  }
  return icons[type] || null
}

/* ── Ana Bileşen ── */
export default function Map() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [routeProgress, setRouteProgress] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setRouteProgress(true), 600)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* Rota istatistikleri — SVG icons instead of emojis */
  const routeStats = [
    { label: 'Hat Uzunluğu',    value: '~850 km', iconType: 'distance' },
    { label: 'Ortalama Süre',   value: '10-12 sa', iconType: 'time' },
    { label: 'Aktif Araç',      value: '4 TIR',    iconType: 'truck' },
    { label: 'Teslimat/Ay',     value: '40+',      iconType: 'delivery' },
  ]

  return (
    <section
      id="guzergah"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#F8FAFC] relative overflow-hidden"
    >
      {/* Dekoratif arka plan */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/4 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EA580C]/3 rounded-full blur-[100px] translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Başlık */}
        <div className="text-center mb-14">
          <span className="section-badge">
            <span className="badge-dot" />
            Hizmet Güzergahı
          </span>
          <h2 className="section-title">
            Hatay'dan İzmir'e{' '}
            <span className="gradient-text-blue">Kesintisiz Hat</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Akdeniz'den Ege'ye uzanan güzergahımızda güvenli, sigortalı ve hızlı taşımacılık
          </p>
        </div>

        {/* Harita Kartı */}
        <div className="map-card-wrapper">
          <div className="map-card">

            {/* SVG Türkiye Haritası */}
            <div className="map-svg-container">
              <svg
                viewBox="0 0 900 440"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Türkiye haritasında Hatay-İzmir güzergahı"
              >
                <defs>
                  {/* Rota gradyanı — Blue to Green (tracking) */}
                  <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#EA580C" />
                    <stop offset="45%"  stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#16A34A" />
                  </linearGradient>

                  {/* Parlama filtresi */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Harita gölgesi */}
                  <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="110%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1E40AF" floodOpacity="0.06" />
                  </filter>

                  {/* Deniz gradyanı */}
                  <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#DBEAFE" />
                    <stop offset="100%" stopColor="#BFDBFE" />
                  </linearGradient>

                  {/* Kara gradyanı */}
                  <linearGradient id="landGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#E9EFF8" />
                    <stop offset="100%" stopColor="#D5DFE9" />
                  </linearGradient>

                  {/* Clip path */}
                  <clipPath id="turkeyClip">
                    <path d={TURKEY_PATH} />
                  </clipPath>
                </defs>

                {/* Arka plan (deniz rengi) */}
                <rect x="0" y="0" width="900" height="440" fill="url(#seaGrad)" rx="12" />

                {/* Deniz isimleri */}
                <text x="40" y="60" fill="#93c5fd" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif" opacity="0.75">KARADENİZ</text>
                <text x="40" y="320" fill="#93c5fd" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif" opacity="0.7">EGE DENİZİ</text>
                <text x="300" y="415" fill="#93c5fd" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif" opacity="0.7">AKDENİZ</text>

                {/* Türkiye ana kara kütlesi */}
                <path
                  d={TURKEY_PATH}
                  fill="url(#landGrad)"
                  stroke="#b8c9db"
                  strokeWidth="1.2"
                  filter="url(#mapShadow)"
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* İç topografik ton */}
                <path
                  d={TURKEY_PATH}
                  fill="none"
                  stroke="#c9d7e4"
                  strokeWidth="0.5"
                  opacity="0.6"
                />

                {/* Ege Bölgesi vurgusu — İzmir çevresi */}
                <ellipse
                  cx={IZMIR_POS.x}
                  cy={IZMIR_POS.y}
                  rx="55" ry="50"
                  fill="rgba(22, 163, 74, 0.10)"
                  stroke="rgba(22, 163, 74, 0.3)"
                  strokeWidth="1"
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: '0.4s' }}
                />

                {/* Akdeniz / Hatay Bölgesi vurgusu */}
                <ellipse
                  cx={HATAY_POS.x}
                  cy={HATAY_POS.y}
                  rx="50" ry="42"
                  fill="rgba(234, 88, 12, 0.10)"
                  stroke="rgba(234, 88, 12, 0.3)"
                  strokeWidth="1"
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: '0.6s' }}
                />

                {/* TravelAnimator Tarzi Rota Cizimi - Golge (Arka Plan) */}
                {routeProgress && (
                  <path
                    d={ROUTE_PATH}
                    fill="none"
                    stroke="rgba(15,23,42,0.1)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8 8"
                  />
                )}

                {/* TravelAnimator Tarzi Rota Cizimi - Dolucu Cizgi (On Plan) */}
                {routeProgress && (
                  <path
                    d={ROUTE_PATH}
                    pathLength="100"
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="100"
                    strokeDashoffset="100"
                    filter="url(#glow)"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="100;0;0"
                      keyTimes="0;0.85;1"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </path>
                )}

                {/* TravelAnimator Tır Modeli ve Kamerası (Top-down) */}
                {routeProgress && (
                  <g>
                    <animateMotion
                      dur="8s"
                      repeatCount="indefinite"
                      path={ROUTE_PATH}
                      rotate="auto"
                      keyPoints="0;1;1"
                      keyTimes="0;0.85;1"
                      calcMode="linear"
                    />
                    {/* Tır arkası takip işığı/gölgesi */}
                    <circle r="16" fill="rgba(37,99,235,0.25)" filter="url(#glow)">
                       <animate attributeName="r" values="12;20;12" dur="1.5s" repeatCount="indefinite" />
                       <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Top-down Tır Şekli */}
                    <svg x="-16" y="-8" width="32" height="16" viewBox="0 0 60 30" fill="none">
                       {/* Dorse */}
                       <rect x="0" y="2" width="40" height="26" rx="2" fill="#2563EB" stroke="#1E40AF" strokeWidth="1" />
                       <rect x="5" y="5" width="30" height="20" rx="1" fill="#3B82F6" opacity="0.3" />
                       {/* Kupa (Kabin) */}
                       <rect x="42" y="3" width="16" height="24" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" filter="url(#mapShadow)"/>
                       {/* Ön cam */}
                       <rect x="52" y="5" width="4" height="20" rx="1" fill="#94A3B8" />
                       {/* Farlar */}
                       <circle cx="58" cy="6" r="2" fill="#FCD34D" filter="url(#glow)" />
                       <circle cx="58" cy="24" r="2" fill="#FCD34D" filter="url(#glow)" />
                    </svg>
                  </g>
                )}

                {/* Şehir noktaları ve pop-up animasyonları */}
                {CITIES.map((city, i) => {
                  const delays = {
                    'Hatay': 0.2,
                    'Adana': 1.6,
                    'Konya': 3.1,
                    'Afyon': 4.5,
                    'Uşak': 5.2,
                    'İzmir': 6.8
                  }
                  let delay = delays[city.name] !== undefined ? delays[city.name] : 0.2 + (i % 5) * 0.1
                  return (
                    <CityDot
                      key={city.name}
                      city={city}
                      isVisible={isVisible}
                      delaySec={delay}
                    />
                  )
                })}

                {/* Mesafe göstergesi */}
                {isVisible && (
                  <g>
                    <rect
                      x={((HATAY_POS.x + IZMIR_POS.x) / 2) - 42}
                      y={((HATAY_POS.y + IZMIR_POS.y) / 2) - 12}
                      width="84" height="24"
                      rx="12"
                      fill="rgba(255,255,255,0.92)"
                      stroke="rgba(37,99,235,0.3)"
                      strokeWidth="1"
                      filter="url(#glow)"
                    />
                    <text
                      x={(HATAY_POS.x + IZMIR_POS.x) / 2}
                      y={(HATAY_POS.y + IZMIR_POS.y) / 2 + 4}
                      textAnchor="middle"
                      fill="#2563EB"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      ≈ 850 km
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Rota İstatistikleri — SVG icons (no emojis) */}
            <div className="map-stats-row">
              {routeStats.map((stat) => (
                <div key={stat.label} className="map-stat-item">
                  <div className="map-stat-icon">
                    <StatIcon type={stat.iconType} />
                  </div>
                  <span className="map-stat-value">{stat.value}</span>
                  <span className="map-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Lejant */}
            <div className="map-legend">
              <div className="map-legend-item">
                <span className="w-3 h-3 rounded-full bg-[#16A34A] flex-shrink-0" />
                <span>İzmir — Varış Noktası</span>
              </div>
              <div className="map-legend-item">
                <span className="w-3 h-3 rounded-full bg-[#EA580C] flex-shrink-0" />
                <span>Hatay — Kalkış Noktası</span>
              </div>
              <div className="map-legend-item">
                <span className="flex-shrink-0 w-8 h-2 rounded-sm" style={{background:'linear-gradient(90deg,#EA580C,#2563EB,#16A34A)'}} />
                <span>Aktif Güzergah</span>
              </div>
              <div className="map-legend-item">
                <span className="w-3 h-3 rounded-full bg-[#2563EB] flex-shrink-0 animate-pulse" />
                <span>Hareketli TIR</span>
              </div>
            </div>

          </div>
        </div>

        {/* Alt bilgi bandı */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#64748B]">
            Güzergah üzerindeki tüm şehirlerde{' '}
            <span className="font-semibold text-[#0F172A]">ara durak, yükleme ve boşaltma</span>{' '}
            hizmeti verilmektedir.
          </p>
        </div>

      </div>
    </section>
  )
}
