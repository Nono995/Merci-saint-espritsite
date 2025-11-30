import Hero from '@/components/Hero'
import About from '@/components/About'
import Community from '@/components/Community'
import Events from '@/components/Events'
import Gallery from '@/components/Gallery'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Podcasts from '@/components/Podcasts'
import ShortVideos from '@/components/ShortVideos'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <main className="overflow-hidden relative">
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="crosses" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <line x1="50" y1="30" x2="50" y2="70" stroke="#8b5cf6" strokeWidth="2" />
              <line x1="30" y1="50" x2="70" y2="50" stroke="#8b5cf6" strokeWidth="2" />
            </pattern>
            <pattern id="church" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 60 20 L 80 40 L 80 80 L 40 80 L 40 40 Z" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
              <line x1="60" y1="20" x2="60" y2="10" stroke="#a78bfa" strokeWidth="1.5" />
              <circle cx="60" cy="8" r="2" fill="#a78bfa" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crosses)" />
          <rect width="100%" height="100%" fill="url(#church)" />
        </svg>
      </div>
      <div className="relative z-10">
        <Hero />
      <About />
      <Community />
      <Services />
      <Events />
      <Podcasts />
      <ShortVideos />
      <Gallery />
      <Testimonials />
      <CTA />
      </div>
    </main>
  )
}
