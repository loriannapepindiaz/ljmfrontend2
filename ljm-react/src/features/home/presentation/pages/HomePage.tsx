import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Experiences from '../components/Experiences'
import Services from '../components/Services'
import Destinations from '../components/Destinations'
import Membership from '../components/Membership'
import VideoSection from '../components/Video'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-background-light text-gray-800 transition-colors dark:bg-background-dark dark:text-gray-100">
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

export default HomePage
