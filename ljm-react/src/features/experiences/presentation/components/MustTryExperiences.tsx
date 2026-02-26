import ExperienceCard from "./ExperienceCard";

const MustTryExperiences = () => {
  const experiences = [
    {
      title: "Tirolesa sobre el mar",
      location: "Caribe Occidental",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      description:
        "Siente la adrenalina volando sobre aguas turquesas en nuestra tirolesa exclusiva.",
    },
    {
      title: "Tour Privado",
      location: "Mónaco",
      rating: "5.0",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      description:
        "Explora los destinos más lujosos con guía privado y transporte VIP.",
    },
    {
      title: "Jet Ski",
      location: "Maldivas",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      description:
        "Domina las olas con nuestras motos de agua de última generación.",
    },
    {
      title: "Buceo Premium",
      location: "Polinesia",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      description:
        "Descubre arrecifes vibrantes con instructores certificados.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl magiona-style mb-4">
            Must-Try Experiences
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl">
            Our most popular curated adventures.
          </p>
        </div>

        <button className="mt-6 md:mt-0 bg-accent text-primary px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90">
          Explore More
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {experiences.map((exp, i) => (
          <ExperienceCard key={i} {...exp} />
        ))}
      </div>
    </section>
  );
};

export default MustTryExperiences;