interface Props {
  title: string;
  location: string;
  rating: string;
  image: string;
  description: string;
}

const ExperienceCard = ({
  title,
  location,
  rating,
  image,
  description,
}: Props) => {
  return (
    <div className="group bg-white dark:bg-primary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-pearl/20 hover:-translate-y-2">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{title}</h3>
          <span className="flex items-center text-sm text-secondary font-semibold">
            ⭐ {rating}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3">{location}</p>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>

        <button className="text-secondary font-semibold text-sm hover:underline">
          Learn More →
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;