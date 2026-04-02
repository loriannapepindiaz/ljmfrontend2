import ExperiencesHero from "../components/ExperiencesHero";
import WhyExperiences from "../components/WhyExperiences";
import MustTryExperiences from "../components/MustTryExperiences";
import TestimonialsSection from "../components/TestimonialsSection";
import CtaFaqSection from "../components/CtaFaqSection"; // ← nombre correcto
import Navbar from "../../../home/presentation/components/Navbar";
import Footer from "../../../home/presentation/components/Footer";

const ExperiencesPage = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <ExperiencesHero />
      <WhyExperiences />
      <MustTryExperiences />
      <TestimonialsSection />
      <CtaFaqSection /> {/* ← nombre correcto */}
      <Footer />
    </div>
  );
};

export default ExperiencesPage;