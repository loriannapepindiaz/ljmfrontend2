// src/features/Room/presentation/components/ExperienceGrid.tsx
import { useState } from "react";
import ExperienceCard from "./ExperienceCard";

const experiences = [
  { id: 1, title: "Michelin Star Dining", description: "Indulge in a multi-course gastronomic journey...", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHRzZZLttTDzbN8x7apTbTY8-v8mIKkZPOm59BQ3TX9DA5px6hyzPQi_EqUghJGviWHIcj7rSg5cdPGRKexS_z1C7MaM4Z4HG7r7__gs1kCF5JANFhFGsGxMS8v6ZA3ZLZ3uMOmQ8FBQFVzghPzf8mFlm5AWILGn1m4pBdU5ZgEH1DqMP8h8ONOMQ_Ni_x5NvAhdYHu-Q7vJXH0cKlzGofuqW3vBLPuPGqk23rgOJTP7Zx3wVy3YrBBIsjQAcw0HSZ5F7CnzlZR4o" },
  { id: 2, title: "Zenith Wellness Spa", description: "Rejuvenate your senses with holistic treatments...", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCihe7PXjPihW2CUU99x5sUnl1JKk2rs39qF6NSgHZHG6p1XKOliSCfKgo_K8U_qyVfq8e_AnKvB4oaCqBBpzJZ1ZaxsviK7NRaHGJ6C73dkgPLAT2OjKepZL8cE10iwkZbHp8E0T8uWQp3CV-iTCcfrpvln-3H4nNVuwX8GvVh8Hgu9m_ltP98OJXbS6Ez5Gc9Bzoou7PxkpuAPwBiLN44fsPXjhHgbTuUIaMt-WWgTeGHmpepNADQAQVoy_jGQRb6PA3nAl5BWw0" },
  { id: 3, title: "Royal Penthouse", description: "Experience unparalleled luxury with expansive private terraces...", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTo30vnylXxusSwJ0ej11UodSso9-5WhAjGKW7NlFfJwETHlLYlcDMMrHCpE1tAVCaG7a5-u4CY5qsOF1LA5SUX4LmOWTZUVfw0vxekw1n6ApJj7ADK3Sv39ZK8ReS0ouo8Vbd7vTIumA3_CJo8kXuAty_9kE6mRtzNypy5ofBfp_6OEZQXy13ZwJCHhdJtpF9ub3AkPsjnwreYDKvwQvAUF30hEMkD3BXzOxEC1Fo_9b0JtNDQ_GV09dxqk_qCHpN0kMvGChOtOU" },
  { id: 4, title: "Starlight Observatory", description: "Unlock the mysteries of the cosmos...", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoFI75_GHTxRtAmEqjGVXFxF-CfrLUUx1SfFYIwnkE3EprPQ_sKUCzm1pWxvhMX0v7Bwrl6WfM5ZES79hPDa2x0F94SXisJ8vMMXOd1BngvXuB5Az02K9cv3Gx09pY1pTPtwvnLHg-lu0xi5UQdo005WL4JObjCv_kMN7h7RwNJUpbA_Yj8-qtkWZT7R8fU28vnSK2ogkYbLhpnEdg3rG0DxKZdcYBcgpqbK2sv4wJS4q0Eu1Bbs9Z-iFgxa0JFAAsFxDHyUED87o" },
];

const ExperienceGrid = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {experiences.map((exp) => (
        <ExperienceCard 
          key={exp.id} 
          title={exp.title}
          description={exp.description}
          image={exp.image}
          // Lógica de selección exclusiva y deselección
          isSelected={selectedId === exp.id}
          onSelect={() => setSelectedId(selectedId === exp.id ? null : exp.id)}
        />
      ))}
    </div>
  );
};

export default ExperienceGrid;