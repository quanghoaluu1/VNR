import HeroSection from './components/HeroSection'
import InteractiveMapSection from './components/InteractiveMapSection'
import LessonsSection from './components/LessonsSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-paper min-h-screen overflow-x-hidden">
      <HeroSection />
      <InteractiveMapSection />
      <LessonsSection />
      <Footer />
    </div>
  )
}
