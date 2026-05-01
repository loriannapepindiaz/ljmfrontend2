interface TitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle = ({ title, subtitle }: TitleProps) => {
  return (
    <div className="text-center space-y-3">
      <h2 className="text-accent font-display text-4xl md:text-5xl font-light tracking-tight">
        {title}
      </h2>
      <p className="text-accent/70 text-lg font-light max-w-xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle;