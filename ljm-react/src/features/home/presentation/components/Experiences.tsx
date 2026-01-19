// src/features/home/presentation/components/Experiences.tsx
import React from 'react';

const Experiences = () => {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-gray-900 dark:text-white">
              Elite On-Board Experiences
            </h2>
          </div>
          <p className="max-w-md text-gray-500 dark:text-gray-400 mt-4 md:mt-0 font-light italic">
            Every detail is designed to offer you an unparalleled level of comfort and sophistication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tarjeta 1 - Michelin Star Dining */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
              <img
                alt="Michelin Star Dining"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTDU-mxf5RXSPA7eu992lq6CKzxF7l2gzO__41Xf2C2CW-r1cXNPMsSsGlmj2WQ6A_IkHbctIYif6h-fDOQlvfUUaYkA7upY0BH3Dj0b2xVx4B4e2wYykzQb3KIfhs3glu-xBVdpxG25SwZNCTaAyilyE81KlWQCTU4F2XhMDQfY6XRwPEklXDjSq9sIMs7A2wlxaft-DIpjQlwccvkUIaD0kZK0TFaIfi3C0Zq3FPVHgJBRCngpGjryPhvDDvOQR0aLbVOdEdV8I"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest">
                Premium
              </div>
            </div>
            <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors text-gray-900 dark:text-white">
              Michelin Star Dining
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Cuisine crafted by world-renowned chefs in intimate settings.
            </p>
          </div>

          {/* Tarjeta 2 - Zenith Wellness Spa */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
              <img
                alt="Zenith Wellness Spa"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAwvFmv0EZ137DDqg5TN5PHqMhzbD3gl6vzS1Y5x1LyzAzQbTswXwpMlLBYtvZVgsQ3D5LCaV845gnTLqvp0x6vm_-W8BXQNteb_bkDmW-pGC_SUAiV0AdxlyKWMo8fuiD986_wZcdiZ-KtyMqVA6fT66308ydwA6eE3B-hIGgukpFXB7UlzS7bf2JHyJHY39mtPvMrdPkTNECdzSHqIdXW5x7rxio7pGprkZBjRea815WXFZto3tzeNBXf1pHGiwjPxTpDarVnAE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest">
                Included
              </div>
            </div>
            <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors text-gray-900 dark:text-white">
              Zenith Wellness Spa
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Holistic treatments inspired by the ancient rituals of the sea.
            </p>
          </div>

          {/* Tarjeta 3 - Royal Penthouse Suites */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
              <img
                alt="Royal Penthouse Suites"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVhBdtl5DP2OJ4DAnzdKGm3W6H3a0jc6X9C2Hd2qbc5c7QVhB4NN04sO-cUPjwrheEO-OlV_NagaNAxN45ukRx4fBRdP0Pxfhf1chBcoBxZbdcIwSHLYCaWVtTb9OqFULfjYzjdr2_u5YsiqBlDFaRfMYs3jJpBn9RisCb5VssVNi4M0-FDBsAIznvqQipd5Uiykmk59kstXA31Bvee3d5k6VEmS9I3Jx_0wFRutkHANwiGGj5tVLqsDhp_o77TJ6iSdmr9D6-7rE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors text-gray-900 dark:text-white">
              Royal Penthouse Suites
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Spacious private sanctuaries with panoramic ocean views.
            </p>
          </div>

          {/* Tarjeta 4 - Starlight Observatory */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
              <img
                alt="Starlight Observatory"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuArF8sYitNEj3_jkTPWMJuk40Y6Ne4gwFmpzVNq2v_QZ4Adk_PD4TepMAmJUrx_xlJzzsQfttm6QFYFY2xWfQGaPdQGP7pjZNsySaTF2iIxO7DVEu3_edy3xm-Ycr3_bg3cQ3XT3kCkNTwnTwoK23lW28Tt3RdVYaC_gOFM-3K_cRI80JQiq_uPNvkf-H3RK4Cb6Myq-i5tQC6TPKgrls3ASFo2ism-o0HicBYNoo6yWtpWhys7wcEyGV_ZzU3peDGA9VJRz1SG15o"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors text-gray-900 dark:text-white">
              Starlight Observatory
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              An outdoor lounge for cocktails under the celestial canopy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;