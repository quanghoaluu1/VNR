import HeroSection from './components/HeroSection'
import InteractiveMapSection from './components/InteractiveMapSection'
import VictoryFactorsSection from './components/VictoryFactorsSection'
import LessonsSection from './components/LessonsSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-paper min-h-screen overflow-x-hidden">
      <HeroSection />
      <InteractiveMapSection />
      <VictoryFactorsSection />
      <LessonsSection />
      <Footer />
    </div>
  )
}
