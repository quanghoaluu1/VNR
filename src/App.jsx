import HeroSection from './components/HeroSection'
import InteractiveMapSection from './components/InteractiveMapSection'
import ProgressSection from './components/ProgressSection'
import LessonsSection from './components/LessonsSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ background: '#0A0500', minHeight: '100vh', overflowX: 'hidden' }}>
      <HeroSection />
      <InteractiveMapSection />
      <ProgressSection />
      <LessonsSection />
      <Footer />
    </div>
  )
}
