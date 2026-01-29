import React from 'react';

const Services: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFCF0]">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
              Unrivaled Service
            </span>
            <h2 className="text-4xl md:text-5xl font-display leading-tight text-gray-900">
              Travel to make sweet <br/> everlasting memories
            </h2>
          </div>

          <div className="space-y-12">
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary font-display text-xl group-hover:bg-primary group-hover:text-white transition-all">
                01
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">
                  Concierge at your beck and call
                </h4>
                <p className="text-gray-600 text-sm">
                  Personalized service that anticipates your needs before you even realize them.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary font-display text-xl group-hover:bg-primary group-hover:text-white transition-all">
                02
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">
                  Immersion in Nature's Beauty
                </h4>
                <p className="text-gray-600 text-sm">
                  Our itineraries are designed to bring you closer to the world's most pristine environments.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary font-display text-xl group-hover:bg-primary group-hover:text-white transition-all">
                03
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">
                  Culinary Masterpieces
                </h4>
                <p className="text-gray-600 text-sm">
                  A sensory journey through the world's finest flavors, paired with rare vintages.
                </p>
              </div>
            </div>
          </div>

          <button className="bg-primary hover:bg-luxury-gold text-white px-8 py-4 rounded-full font-bold shadow-xl transition-all">
            EXPLORE THE FLEET
          </button>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform lg:translate-x-12">
            <img
              alt="Cruise Ship Detail"
              className="w-full h-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAow3GiW44_OHx1ael_1CJw0k_odqbSUeyqAJRvMNrc31d5PWur2ARTe25FwHv6rRaQCyklpCrG8mxBvxsqWup4jexY7HoDcLXIPGFHcsF9dBmp-HRxlcEfwWoI_UjEjySewDLPozEeXLtMIotRzrH9A_5ehtcPDczmjBGIljC8elIrqgxaCgxEmbMNhBGYR8Tx8A-kPGxjC3gJwMDHOgpKd1RBwb-997uP5KTqqhYOHeUxZMOSm1-lLB4HZmIjDRVJOa-TZtgfFa0"
            />
            {/* Badge animado superior */}
            <div className="absolute top-10 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce hover:pause">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <img
                  alt="User"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWEmkwRZ2_pYB2dOKV4NdUy9uGKo4ohstet4l_5B_LVWVWp3EdGEcGuyHLmbnjpYpmo3b1vVK-qcULDeSqhX3syck0MiR-JP8W_fxAWDpEfAwQWbwIjQw9w5bxpTUCKRE7E0-rlaoTUnQsjvw1fi7EOPJjBj4K0zbZfDEofPhEWaNHsE8OVobUu8dt36DbjyvRV0jkLVX8FdX9mJhlnLHQUhmqfnF2WZa7Um6Q4S_bYsWe7tE-vO8kPtlFFUv_KVv-FU2EqWBaryU"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-900">Amelia V. ⭐️ 5.0</p>
                <p className="text-[8px] text-gray-500 uppercase tracking-tighter">Gold Member</p>
              </div>
            </div>

            {/* Badge animado inferior */}
            <div className="absolute bottom-20 -right-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <img
                  alt="User"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqzHGz6UYZoR-SaHFJ806Xl3ihmfIierKGAp0dbSy3gcnrCnDpNUw3P7SwIsNANxNL-zxr0vAenvJPM2iiXNLb3y7XCtfuNO6JXPiD9f80qmLFwgpvgetYqe-JYlu8YttCAb4N7DcVU_ZRANK7kN-XZSS-TQXqK6iQKYQXTChIBgzCG1st90CTfMT_GH3_m-RaRXkw6qcEwg4pEWriQ-LH0HcmpLevc5JoCsrAstLT3LZiULiOG3eMmX_79HjejljTA49k2ODuILw"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-900">Julian R. ⭐️ 5.0</p>
                <p className="text-[8px] text-gray-500 uppercase tracking-tighter">Elite Voyager</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -left-10 w-full h-full bg-primary/10 rounded-2xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Services;