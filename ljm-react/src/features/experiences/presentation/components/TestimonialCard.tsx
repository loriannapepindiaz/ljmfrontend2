interface Props {
  name: string;
  review: string;
}

const TestimonialCard = ({ name, review }: Props) => {
  return (
    <div className="bg-white dark:bg-primary p-6 rounded-2xl shadow-lg border border-pearl/20">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        “{review}”
      </p>
      <p className="font-bold text-secondary">{name}</p>
    </div>
  );
};

export default TestimonialCard;