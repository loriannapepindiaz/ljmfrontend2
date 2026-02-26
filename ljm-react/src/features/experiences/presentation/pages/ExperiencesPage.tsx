import ExperiencesHero from "../components/ExperiencesHero";
import MustTryExperiences from "../components/MustTryExperiences";
import WhyExperiences from "../components/WhyExperiences";
import TestimonialsSection from "../components/TestimonialsSection";
import CtaFaqSection from "../components/CtaFaqSection";

import Navbar from "../../../home/presentation/components/Navbar";
import Footer from "../../../home/presentation/components/Footer";

const ExperiencesPage = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />

      <ExperiencesHero />
      <MustTryExperiences />
      <WhyExperiences />
      <TestimonialsSection />
      <CtaFaqSection />

      <Footer />
    </div>
  );
};

export default ExperiencesPage;