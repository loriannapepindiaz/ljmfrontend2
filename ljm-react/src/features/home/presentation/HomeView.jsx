import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experiences from './components/Experiences'
import Services from './components/Services'
import Destinations from './components/Destinations'
import Membership from './components/Membership'
import VideoSection from './components/VideoSection'
import Footer from './components/Footer'

const HomeView = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 transition-colors">
      <Navbar />
      <Hero />
      <Experiences />
      <Services />
      <Destinations />
      <Membership />
      <VideoSection />
      <Footer />
    </div>
  )
}

export default HomeView
