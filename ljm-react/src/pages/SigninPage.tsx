import Navbar from '../features/home/presentation/components/Navbar'
import Hero from '../features/home/presentation/components/Hero'
import Experiences from '../features/home/presentation/components/Experiences'
import Services from '../features/home/presentation/components/Services'
import Destinations from '../features/home/presentation/components/Destinations'
import Membership from '../features/home/presentation/components/Membership'
import Video from '../features/home/presentation/components/Video'
import Footer from '../features/home/presentation/components/Footer'

const SigninPage = () => (
  <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 transition-colors duration-300 min-h-screen">
    <Navbar />
    <Hero />
    <Experiences />
    <Services />
    <Destinations />
    <Membership />
    <Video />
    <Footer />
  </div>
);

export default SigninPage;
