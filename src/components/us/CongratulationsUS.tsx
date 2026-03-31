import { useState, useEffect } from 'react'
import { Moon, CheckCircle } from 'lucide-react'

// SVG Icon Components
const CheckIcon = () => (
  <img src="/icons/check-gold.svg" alt="" className="w-5 h-5 flex-shrink-0" />
)

const SparklesIcon = () => (
  <img src="/icons/sparkles-gold.svg" alt="" className="w-5 h-5 flex-shrink-0" />
)

const ShieldIcon = () => (
  <img src="/icons/shield-gold.svg" alt="" className="w-5 h-5 flex-shrink-0" />
)

const MoonIcon = () => (
  <img src="/icons/moon-gold.svg" alt="" className="w-5 h-5 flex-shrink-0" />
)

const LockIcon = () => (
  <img src="/icons/lock-gold.svg" alt="" className="w-5 h-5 flex-shrink-0" />
)

export default function CongratulationsUS() {
  const [isStickyVisible, setIsStickyVisible] = useState(false)

  // Show sticky button after scrolling past video
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsStickyVisible(scrollPosition > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleUpgrade = () => {
    window.open('https://buy.stripe.com/28EbJ00XG9fqbnD0ZK9fW06', '_blank')
  }

  const handleNoThanks = () => {
    window.location.href = 'https://presente-da-vovodivina.netlify.app/digital/us'
  }

  const benefits = [
    {
      icon: <SparklesIcon />,
      title: 'Daily Voice Guidance',
      description: 'Wake up to a specific message from The Divine Grandmother.'
    },
    {
      icon: <ShieldIcon />,
      title: 'Weekly Protection Rituals',
      description: 'Keep bad energy away from your relationships and finances.'
    },
    {
      icon: <MoonIcon />,
      title: 'New Moon/Full Moon Directives',
      description: 'Know exactly what to manifest during astrological shifts.'
    },
    {
      icon: <LockIcon />,
      title: '100% Private',
      description: 'Delivered securely directly to your Telegram app.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F3EFE8] font-sans">
      {/* Progress Bar Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0F]/95 backdrop-blur-md border-b border-[#C9A44C]/20">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-[#B6B1A9] tracking-wider uppercase">
                SUCCESS: Your $5 Oracle Access is confirmed!
              </span>
            </div>
            <span className="text-sm font-serif text-[#C9A44C]">50% Complete</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#2A0E3F]/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#C9A44C] to-[#C9A44C]/80 transition-all duration-1000"
              style={{ width: '50%' }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-32 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Symbol */}
          <div className="flex justify-center mb-8">
            <Moon className="w-10 h-10 text-[#C9A44C] stroke-1" />
          </div>

          {/* Product Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2A0E3F]/30 border border-[#C9A44C]/30 rounded-sm">
              <span className="text-xs tracking-[0.2em] uppercase text-[#C9A44C]">
                Introducing
              </span>
            </div>
          </div>

          {/* Product Name */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#F3EFE8] mb-4">
              The Divine Sanctuary
            </h1>
            <p className="text-lg md:text-xl text-[#C9A44C] font-light tracking-wide">
              Daily Telegram Guidance by The Divine Grandmother
            </p>
          </div>

          {/* Urgent Message */}
          <div className="text-center mb-12 space-y-4">
            <p className="text-xl md:text-2xl font-serif text-[#C9A44C]">
              WAIT! Do not close this page.
            </p>
            <p className="text-lg text-[#B6B1A9] font-light leading-relaxed">
              Your destiny reading is ready, but The Divine Grandmother has one more <span className="text-[#F3EFE8] font-medium">urgent message</span> for you...
            </p>
          </div>

          {/* Video VSL Section */}
          <div className="mb-12">
            <div className="relative w-full aspect-video bg-[#2A0E3F]/20 rounded-sm overflow-hidden border border-[#C9A44C]/20">
              <video
                className="w-full h-full object-cover"
                src="/vsl-video.mp4"
                controls
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                playsInline
                poster="/authentic_hero_hands.png"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-sm text-[#B6B1A9]/60 mt-3 italic">
              Watch this urgent message from The Divine Grandmother
            </p>
          </div>

          {/* The Pitch */}
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-xl text-[#F3EFE8] font-light leading-relaxed mb-6">
              Right now, you are holding the key to the <span className="text-[#C9A44C] font-serif italic">Sanctuary</span>.
            </p>
            <p className="text-[#B6B1A9] leading-relaxed mb-6">
              Normally, private daily guidance costs <span className="text-[#F3EFE8]">hundreds of dollars</span> a month. But because you are already a trusted grandchild who took action today, I am offering you an <span className="text-[#C9A44C] font-medium">exclusive pass</span>.
            </p>
            <p className="text-2xl md:text-3xl font-serif text-[#C9A44C] mb-2">
              Unlock daily guidance for only $7.99/month
            </p>
            <p className="text-sm text-[#B6B1A9]/70 tracking-wider">
              (Cancel anytime, no questions asked)
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-[#2A0E3F]/10 border border-[#C9A44C]/10 rounded-sm hover:border-[#C9A44C]/30 transition-colors duration-300"
                >
                  <div className="mt-0.5">{benefit.icon}</div>
                  <div>
                    <h3 className="text-[#F3EFE8] font-medium mb-1">{benefit.title}</h3>
                    <p className="text-[#B6B1A9] text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main CTA Button (Desktop) */}
          <div className="hidden md:block text-center mb-8">
            <button
              onClick={handleUpgrade}
              className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-[#C9A44C] text-[#0B0B0F] font-serif font-semibold text-xl tracking-wider rounded-sm hover:bg-[#C9A44C]/90 transition-all duration-300 shadow-lg shadow-[#C9A44C]/20 hover:shadow-[#C9A44C]/30"
            >
              <CheckIcon />
              YES, UPGRADE MY JOURNEY FOR $7.99/mo
            </button>
            <p className="text-xs text-[#B6B1A9]/50 mt-3 tracking-wider">
              Clicking here will add the Sanctuary Pass to your order securely
            </p>
          </div>

          {/* Rejection Link */}
          <div className="text-center">
            <button
              onClick={handleNoThanks}
              className="text-[#B6B1A9]/50 text-sm hover:text-[#B6B1A9] transition-colors duration-300 underline underline-offset-4"
            >
              No thank you, I prefer to navigate my spiritual journey alone. Just take me to my $5 reading.
            </button>
          </div>
        </div>
      </div>

      {/* Sticky CTA Button (Mobile) */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0F]/95 backdrop-blur-md border-t border-[#C9A44C]/30 p-4 transition-transform duration-300 md:hidden ${
          isStickyVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          onClick={handleUpgrade}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#C9A44C] text-[#0B0B0F] font-serif font-semibold text-lg tracking-wider rounded-sm"
        >
          <CheckIcon />
          UPGRADE FOR $7.99/mo
        </button>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 mx-6 md:mb-0 mb-20">
        <p className="text-[#B6B1A9]/30 text-xs tracking-widest uppercase font-serif">
          © {new Date().getFullYear()} Divine Grandmother • The Divine Sanctuary
        </p>
      </footer>
    </div>
  )
}
