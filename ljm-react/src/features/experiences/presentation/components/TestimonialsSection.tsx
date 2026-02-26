import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sophie Laurent",
      review:
        "An unforgettable luxury experience. Everything was flawless.",
    },
    {
      name: "James Carter",
      review:
        "Top-tier service and breathtaking adventures. Highly recommended.",
    },
    {
      name: "Isabella Rossi",
      review:
        "Pure elegance and excitement combined perfectly.",
    },
  ];

  return (
    <section className="bg-background-light dark:bg-background-dark py-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl magiona-style mb-4">
          What Our Guests Say
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;