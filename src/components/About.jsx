export default function About() {
  return (
    <section id="hakkimizda" className="py-24 lg:py-32 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2563EB]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Stats & Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0] text-center">
                <div className="text-4xl font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-family-display)' }}>30+</div>
                <div className="text-sm text-[#64748B] mt-1 font-medium">Yıl Deneyim</div>
              </div>
              <div className="bg-[#2563EB] rounded-2xl p-8 shadow-md text-center">
                <div className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-family-display)' }}>2K+</div>
                <div className="text-sm text-white/70 mt-1 font-medium">Mutlu Müşteri</div>
              </div>
              <div className="bg-[#EA580C] rounded-2xl p-8 shadow-md text-center">
                <div className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-family-display)' }}>4</div>
                <div className="text-sm text-white/80 mt-1 font-medium">Araçlık Filo</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0] text-center">
                <div className="text-4xl font-bold text-[#16A34A]" style={{ fontFamily: 'var(--font-family-display)' }}>%99</div>
                <div className="text-sm text-[#64748B] mt-1 font-medium">Memnuniyet</div>
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div>
            <span className="section-badge">
              <span className="badge-dot" />
              Hakkımızda
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-family-display)' }}>
              Hatay–İzmir Hattında
              <br />
              <span className="gradient-text-blue">
                Güvenin Adı
              </span>
            </h2>
            <div className="mt-6 space-y-4 text-[#64748B] leading-relaxed">
              <p>
                10 yılı aşkın süredir Akdeniz ve Ege bölgeleri arasında profesyonel
                nakliyat ve lojistik hizmeti sunuyoruz. Evden eve taşımacılıktan
                fabrika nakliyatına, parça eşya gönderiminden komple taşımacılık
                çözümlerine kadar geniş bir hizmet yelpazesi ile yanınızdayız.
              </p>
              <p>
                Deneyimli kadromuz, bakımlı araç filomuz ve sigortalı taşımacılık
                anlayışımız ile eşyalarınızı güvenle taşımak en büyük önceliğimizdir.
                Her adımda şeffaf iletişim ve zamanında teslimat garantisi sunuyoruz.
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {['Lisanslı Firma', 'Tam Sigorta', 'ISO Standartları', 'Hızlı Teslimat'].map(badge => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 bg-[#2563EB]/6 text-[#2563EB]/80 text-xs font-semibold px-4 py-2 rounded-full"
                >
                  <svg className="w-3.5 h-3.5 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
