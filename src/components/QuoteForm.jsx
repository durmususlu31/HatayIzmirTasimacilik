import { useState, useEffect } from 'react'

const WHATSAPP_NUMBER = '905333224888'

const esyaTipleri = [
  'Ev Eşyası',
  'Fabrika / Endüstriyel',
  'Parça Eşya',
  'Ofis Malzemesi',
  'Diğer',
]

// Custom Icon Components for clarity
const LocationIcon = () => (
  <svg className="w-5 h-5 text-white/40 group-focus-within:text-[#2563EB]/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
)

const ChevronIcon = () => (
  <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

export default function QuoteForm() {
  const [form, setForm] = useState({
    neredenIl: '',
    neredenIlce: '',
    nereyeIl: '',
    nereyeIlce: '',
    esyaTipi: '',
    tarih: '',
  })
  
  const [focused, setFocused] = useState('')
  const [provinces, setProvinces] = useState([])

  // Fetch Provinces and Districts
  useEffect(() => {
    fetch('https://turkiyeapi.dev/api/v1/provinces')
      .then(res => res.json())
      .then(res => {
         const sorted = res.data.sort((a,b) => a.name.localeCompare(b.name, 'tr'))
         setProvinces(sorted)
      })
      .catch(err => console.error("API Fetch Error:", err))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => {
      const newForm = { ...prev, [name]: value }
      // Reset district if province changes
      if (name === 'neredenIl') newForm.neredenIlce = ''
      if (name === 'nereyeIl') newForm.nereyeIlce = ''
      return newForm
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = `Merhaba, ${form.neredenIl} (${form.neredenIlce}) ---> ${form.nereyeIl} (${form.nereyeIlce}) güzergahında ${form.esyaTipi} yüküm var. ${form.tarih} tarihi için fiyat teklifi almak istiyorum.`
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
  }

  const isValid = 
    form.neredenIl && form.neredenIlce && 
    form.nereyeIl && form.nereyeIlce && 
    form.esyaTipi && form.tarih

  const neredenDistricts = provinces.find(p => p.name === form.neredenIl)?.districts?.sort((a,b) => a.name.localeCompare(b.name, 'tr')) || []
  const nereyeDistricts = provinces.find(p => p.name === form.nereyeIl)?.districts?.sort((a,b) => a.name.localeCompare(b.name, 'tr')) || []

  return (
    <section id="teklif" className="py-24 lg:py-32 bg-[#0F172A] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2563EB]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#16A34A]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Info */}
          <div>
            <span className="inline-flex items-center gap-2 bg-[#2563EB]/12 text-[#60A5FA] font-semibold text-xs tracking-[0.12em] uppercase px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] inline-block animate-pulse" />
              Hızlı Teklif
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-family-display)' }}>
              30 Saniyede
              <br />
              <span className="gradient-text-blue">
                Teklif Alın
              </span>
            </h2>
            <p className="mt-6 text-white/50 text-lg leading-relaxed">
              Formu doldurun, taşıma detaylarınız otomatik olarak WhatsApp
              mesajına dönüşsün. Ekibimiz anında maliyet hesabı yapıp size dönsün.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Ücretsiz fiyat teklifi',
                'WhatsApp üzerinden anlık iletişim',
                'Türkiye geneli hizmet ağı',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#16A34A]/18 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/8 rounded-3xl p-8 sm:p-10 space-y-6">
              
              {/* Nereden Row */}
              <div>
                <label className="block text-white/70 text-sm font-semibold mb-2">Nereden Alınacak</label>
                <div className="grid grid-cols-2 gap-3 group">
                  <div className={`relative rounded-xl transition-all duration-200 ${focused === 'neredenIl' ? 'ring-2 ring-[#2563EB]/40' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><LocationIcon /></div>
                    <select name="neredenIl" value={form.neredenIl} onChange={handleChange} onFocus={() => setFocused('neredenIl')} onBlur={() => setFocused('')} className="form-input appearance-none cursor-pointer text-sm" required>
                      <option value="" className="bg-[#0F172A] text-white/40">İl Seçin</option>
                      {provinces.map(p => <option key={p.id} value={p.name} className="bg-[#0F172A] text-white">{p.name}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><ChevronIcon /></div>
                  </div>
                  <div className={`relative rounded-xl transition-all duration-200 ${focused === 'neredenIlce' ? 'ring-2 ring-[#2563EB]/40' : ''} ${!form.neredenIl && 'opacity-50'}`}>
                    <select name="neredenIlce" value={form.neredenIlce} onChange={handleChange} onFocus={() => setFocused('neredenIlce')} onBlur={() => setFocused('')} disabled={!form.neredenIl} className="form-input appearance-none cursor-pointer pl-4 text-sm" required>
                      <option value="" className="bg-[#0F172A] text-white/40">İlçe Seçin</option>
                      {neredenDistricts.map(d => <option key={d.id} value={d.name} className="bg-[#0F172A] text-white">{d.name}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><ChevronIcon /></div>
                  </div>
                </div>
              </div>

              {/* Nereye Row */}
              <div>
                <label className="block text-white/70 text-sm font-semibold mb-2">Nereye Teslim</label>
                <div className="grid grid-cols-2 gap-3 group">
                  <div className={`relative rounded-xl transition-all duration-200 ${focused === 'nereyeIl' ? 'ring-2 ring-[#2563EB]/40' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><LocationIcon /></div>
                    <select name="nereyeIl" value={form.nereyeIl} onChange={handleChange} onFocus={() => setFocused('nereyeIl')} onBlur={() => setFocused('')} className="form-input appearance-none cursor-pointer text-sm" required>
                      <option value="" className="bg-[#0F172A] text-white/40">İl Seçin</option>
                      {provinces.map(p => <option key={p.id} value={p.name} className="bg-[#0F172A] text-white">{p.name}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><ChevronIcon /></div>
                  </div>
                  <div className={`relative rounded-xl transition-all duration-200 ${focused === 'nereyeIlce' ? 'ring-2 ring-[#2563EB]/40' : ''} ${!form.nereyeIl && 'opacity-50'}`}>
                    <select name="nereyeIlce" value={form.nereyeIlce} onChange={handleChange} onFocus={() => setFocused('nereyeIlce')} onBlur={() => setFocused('')} disabled={!form.nereyeIl} className="form-input appearance-none cursor-pointer pl-4 text-sm" required>
                      <option value="" className="bg-[#0F172A] text-white/40">İlçe Seçin</option>
                      {nereyeDistricts.map(d => <option key={d.id} value={d.name} className="bg-[#0F172A] text-white">{d.name}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><ChevronIcon /></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Eşya Tipi */}
                <div>
                  <label className="block text-white/70 text-sm font-semibold mb-2">Eşya Tipi</label>
                  <div className={`relative rounded-xl transition-all duration-200 group ${focused === 'esyaTipi' ? 'ring-2 ring-[#2563EB]/40' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-white/40 group-focus-within:text-[#2563EB]/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                      </svg>
                    </div>
                    <select name="esyaTipi" value={form.esyaTipi} onChange={handleChange} onFocus={() => setFocused('esyaTipi')} onBlur={() => setFocused('')} className="form-input appearance-none cursor-pointer text-sm" required>
                      <option value="" className="bg-[#0F172A] text-white/40">Seçiniz</option>
                      {esyaTipleri.map(tip => <option key={tip} value={tip} className="bg-[#0F172A] text-white">{tip}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><ChevronIcon /></div>
                  </div>
                </div>

                {/* Tarih */}
                <div>
                  <label className="block text-white/70 text-sm font-semibold mb-2">Taşıma Tarihi</label>
                  <div className={`relative rounded-xl transition-all duration-200 group ${focused === 'tarih' ? 'ring-2 ring-[#2563EB]/40' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-white/40 group-focus-within:text-[#2563EB]/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      name="tarih"
                      min={new Date().toISOString().split('T')[0]}
                      value={form.tarih}
                      onChange={handleChange}
                      onFocus={() => setFocused('tarih')}
                      onBlur={() => setFocused('')}
                      className="form-input cursor-pointer text-sm font-medium w-full max-w-full date-input"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-bold text-base transition-all mt-4 ${
                  isValid ? 'bg-[#EA580C] hover:bg-[#C2410C] shadow-lg shadow-[#EA580C]/25 hover:-translate-y-0.5 cursor-pointer' : 'bg-white/8 cursor-not-allowed opacity-50'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp ile Teklif Al
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
