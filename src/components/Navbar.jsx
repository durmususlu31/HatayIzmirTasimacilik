import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Hizmetler', href: '#hizmetler' },
    { label: 'Filomuz', href: '#filo' },
    { label: 'Hakkımızda', href: '#hakkimizda' },
    { label: 'İletişim', href: '#iletisim' },
  ]

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(15,23,42,0.08),0_4px_24px_rgba(15,23,42,0.06)]'
          : 'bg-white/5 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <a href="#" id="nav-logo" className="flex items-center gap-3 group select-none">
            {/* Icon Mark */}
            <div
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-250 overflow-hidden ${
                scrolled
                  ? 'bg-[#2563EB]'
                  : 'bg-white/12 border border-white/20'
              }`}
            >
              {/* Truck Icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 3h15v13H1z" />
                <path d="M16 8h4l3 4v4h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              {/* Blue accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EA580C]" />
            </div>

            {/* Text */}
            <div className="flex flex-col leading-none">
              <span
                className={`text-[15px] font-bold tracking-tight transition-colors duration-250 ${
                  scrolled ? 'text-[#0F172A]' : 'text-white'
                }`}
                style={{ fontFamily: 'var(--font-family-display)' }}
              >
                Hatay İzmir
              </span>
              <span
                className={`text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors duration-250 mt-0.5 ${
                  scrolled ? 'text-[#2563EB]' : 'text-[#60A5FA]'
                }`}
              >
                Taşımacılık
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/[^a-z]/g, '')}`}
                className={`relative text-sm font-semibold tracking-wide transition-colors duration-250 group cursor-pointer ${
                  scrolled ? 'text-[#334155]' : 'text-white/85'
                } hover:text-[#2563EB]`}
              >
                {link.label}
                {/* Underline animation */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#2563EB] rounded-full transition-all duration-250 group-hover:w-full" />
              </a>
            ))}

            {/* CTA */}
            <a
              href="#teklif"
              id="nav-cta-btn"
              className="flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-250 hover:shadow-[0_4px_20px_rgba(234,88,12,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Teklif Al
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-250 cursor-pointer ${
              scrolled
                ? 'text-[#0F172A] hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Menüyü aç/kapat"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/97 backdrop-blur-xl border-t border-gray-100/80 px-6 py-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-4 py-3 text-[#0F172A] font-semibold text-sm rounded-xl hover:bg-[#2563EB]/6 hover:text-[#2563EB] transition-all duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#teklif"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 mt-3 bg-[#EA580C] text-white text-center px-4 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-[#C2410C] transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Teklif Al
          </a>
        </div>
      </div>
    </nav>
  )
}
