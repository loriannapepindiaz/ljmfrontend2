const WhyExperiences = () => {
  const items = [
    { icon: 'explore', title: 'Adventure', desc: 'Thrill seeking' },
    { icon: 'account_balance', title: 'Culture', desc: 'Local heritage' },
    { icon: 'spa', title: 'Relaxation', desc: 'Pure tranquility' },
    { icon: 'surfing', title: 'Water Sports', desc: 'Ocean play' },
  ];

  return (
    <section className="bg-[#FAF9F6] px-6" style={{ paddingTop: '0px', paddingBottom: '48px' }}>
      <div
        className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-xl"
        style={{ marginTop: '-180px', position: 'relative', zIndex: 10 }}
      >
        <h2 className="text-2xl md:text-3xl magiona-style text-[#0A1428] text-center mb-8">
          Why LJM Experiences?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-center space-x-3 p-4 rounded-2xl border border-gray-100 hover:border-[#c5a267]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#c5a267] text-3xl flex-shrink-0">
                {item.icon}
              </span>
              <div>
                <p className="font-bold text-[#0A1428] text-sm">{item.title}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyExperiences;