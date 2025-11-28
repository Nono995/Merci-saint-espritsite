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
    <main className="overflow-hidden">
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
    </main>
  )
}
