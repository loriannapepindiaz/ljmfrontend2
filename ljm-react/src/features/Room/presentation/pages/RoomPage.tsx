import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom"; 
import RoomLayout from "../components/RoomLayout";
import RoomHeader from "../components/RoomHeader";
import SectionTitle from "../components/SectionTitle";
import ExperienceCard from "../components/ExperienceCard";
import Navbar from "../../../home/presentation/components/Navbar";
import Footer from "../../../home/presentation/components/Footer";

interface Suite {
  title: string;
  imageUrl: string;
  isSelected: boolean;
  description: string;
}

const RoomPage: FC = () => {
  const navigate = useNavigate(); 
  
  // Estado para controlar cuál está seleccionado (por índice)
  const [selectedSuiteIndex, setSelectedSuiteIndex] = useState<number | null>(null);

const suites: Suite[] = [
  {
    title: "Suite Oceánica",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTo30vnylXxusSwJ0ej11UodSso9-5WhAjGKW7NlFfJwETHlLYlcDMMrHCpE1tAVCaG7a5-u4CY5qsOF1LA5SUX4LmOWTZUVfw0vxekw1n6ApJj7ADK3Sv39ZK8ReS0ouo8Vbd7vTIumA3_CJo8kXuAty_9kE6mRtzNypy5ofBfp_6OEZQXy13ZwJCHhdJtpF9ub3AkPsjnwreYDKvwQvAUF30hEMkD3BXzOxEC1Fo_9b0JtNDQ_GV09dxqk_qCHpN0kMvGChOtOU",
    isSelected: false,
    description: "Balcón privado con vista panorámica al océano, cama king y baño de mármol con tina."
  },
  {
    title: "Camarote Clásico",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCihe7PXjPihW2CUU99x5sUnl1JKk2rs39qF6NSgHZHG6p1XKOliSCfKgo_K8U_qyVfq8e_AnKvB4oaCqBBpzJZ1ZaxsviK7NRaHGJ6C73dkgPLAT2OjKepZL8cE10iwkZbHp8E0T8uWQp3CV-iTCcfrpvln-3H4nNVuwX8GvVh8Hgu9m_ltP98OJXbS6Ez5Gc9Bzoou7PxkpuAPwBiLN44fsPXjhHgbTuUIaMt-WWgTeGHmpepNADQAQVoy_jGQRb6PA3nAl5BWw0",
    isSelected: false,
    description: "Comodidad esencial con diseño refinado, ropa de cama premium y todas las amenidades incluidas."
  },
  {
    title: "Penthouse de Cubierta",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHRzZZLttTDzbN8x7apTbTY8-v8mIKkZPOm59BQ3TX9DA5px6hyzPQi_EqUghJGviWHIcj7rSg5cdPGRKexS_z1C7MaM4Z4HG7r7__gs1kCF5JANFhFGsGxMS8v6ZA3ZLZ3uMOmQ8FBQFVzghPzf8mFlm5AWILGn1m4pBdU5ZgEH1DqMP8h8ONOMQ_Ni_x5NvAhdYHu-Q7vJXH0cKlzGofuqW3vBLPuPGqk23rgOJTP7Zx3wVy3YrBBIsjQAcw0HSZ5F7CnzlZR4o",
    isSelected: false,
    description: "Dos plantas de lujo absoluto con terraza privada, jacuzzi y mayordomo personal las 24 horas."
  },
  {
    title: "Suite Familiar Deluxe",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoFI75_GHTxRtAmEqjGVXFxF-CfrLUUx1SfFYIwnkE3EprPQ_sKUCzm1pWxvhMX0v7Bwrl6WfM5ZES79hPDa2x0F94SXisJ8vMMXOd1BngvXuB5Az02K9cv3Gx09pY1pTPtwvnLHg-lu0xi5UQdo005WL4JObjCv_kMN7h7RwNJUpbA_Yj8-qtkWZT7R8fU28vnSK2ogkYbLhpnEdg3rG0DxKZdcYBcgpqbK2sv4wJS4q0Eu1Bbs9Z-iFgxa0JFAAsFxDHyUED87o",
    isSelected: false,
    description: "Dos dormitorios conectados, sala de estar y vista al mar. Perfecta para toda la familia."
  },
];

  return (
    <div className="flex flex-col min-h-screen bg-background-dark overflow-x-hidden">
      {/* Navbar con fondo sólido */}
      <div className="bg-[#0e1a34] w-full z-50">
        <Navbar />
      </div>

      <main className="flex-1 relative">
        {/* Fondo de imagen de la cubierta del barco */}
        <div className="fixed inset-0 z-0">
          <img 
            alt="Luxury cruise background" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC452Pu70ahp8xhmTebKdEz4fs6mG964FtpeFL1U5001s3JZbsgQgZJVGyxS1lxnHqyqvGMSl8olisyBSMjccvpKAqRApqM3ocCqvxYXcSRN9dUlQl-Sn4yzlddCpdnFYs1bq3LTCujhiT3oAer_G2-YVueQcf4g4_tYvnNfe0b9ziLSYO_NJgvU6nIMqsoziJcpyekFhl3t4UdTuJWGl5P_ekT8K1XdTkU_2tZ3JDs9IchuSSxccleZeP-qQ2QP4bvoHAjxxVUx80" 
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 py-12 px-4 md:px-8 max-w-7xl mx-auto w-full flex justify-center">
          <RoomLayout>
            <RoomHeader />
            
            {/* Contenedor con fondo sólido Navy */}
            <div className="flex flex-col gap-10 p-6 md:p-12 relative bg-[#0e1a34] rounded-b-xl border-t border-accent/10">
              
              <SectionTitle
                title="Eleva Tu Travesía"
                subtitle="Selecciona experiencias exclusivas a bordo para personalizar tu estancia."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suites.map((suite, index) => (
                  <ExperienceCard
                    key={index}
                    title={suite.title}
                    description={suite.description}
                    image={suite.imageUrl}
                    isSelected={selectedSuiteIndex === index}
                    onSelect={() => setSelectedSuiteIndex(selectedSuiteIndex === index ? null : index)}
                  />
                ))}
              </div>

              {/* Botón de acción final actualizado */}
              <div className="flex justify-end pt-6">
                <button 
                  onClick={() => navigate('/details-suit')} // ✅ Ruta actualizada
                  className="flex items-center gap-4 bg-primary hover:bg-primary/90 px-10 py-4 rounded-full text-white font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl shadow-black/50 text-[10px] active:scale-95 group"
                >
                  <span>Ver detalles de la suite</span> {/* ✅ Texto actualizado */}
                  <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-2 text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </RoomLayout>
        </div>
      </main>

      {/* Footer con fondo sólido */}
      <div className="bg-[#0e1a34] w-full z-20 border-t border-accent/5">
        <Footer />
      </div>
    </div>
  );
};

export default RoomPage;