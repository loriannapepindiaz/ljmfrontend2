import React from 'react';
import DestinationCard from './DestinationCard';

const destinos = [
  { 
    id: 1, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnEhzMTeQRFrXIYaiRDEA96_d6VTKAVKnRdt4RsDGK3bFwjffFJ3ACpMplUQE39bt_wboZ6KNm8K1XWl-5cwIF1v-cljyPsdXgYG0ljgIz8axoZbCqEFF3PCH0ohgsY9lcPSW6CJnhwaq9oNw0o17AudyCcF2-qOHxQH9vG6g4WlQqqOpzQjp9NYkUAuGJnoSlwQkVt6Kjop-oaFLol4EcJMx-ClYau6F-iz77K-1Qm6mr9HsT6i4RTElrSNOuMEXA0xskl_6-Mas",
    titulo: "Isla Mombasa", 
    pais: "Kenia", 
    rating: 4.8, 
    descripcion: "Descubre la perla del Índico con playas de arena blanca y una cultura vibrante que te cautivará desde el primer momento."
  },
  { 
    id: 2, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmG3GMcRBeiWB3WiniRudUK8BeMC9LnI_BYxeXKeKz4oKFuqELjoT0OkPdlEH3nNA11y3FZJGR-W8c-jVWSnf9b3xZoPx11myjaIXkS1dnT_ONiDAITniquIaC76JiOLUlUeiFmiePQXdTSzdHutMcyK8IAKhyfpUx42YtXUEJ23GGqqecIJE5nqVCAHhEkjC3OliPlnNlJsXCXAgvmK81skCj6vUiQSJ0u8mc3NAsqcKdEpxtp0RCOtM-hOKDcuponkpZi-yIe_0",
    titulo: "Ciudad de Addu", 
    pais: "Maldivas", 
    rating: 4.6, 
    descripcion: "Un atolón en forma de corazón que ofrece algunos de los mejores lugares de buceo y snorkel del archipiélago, con aguas cristalinas e inigualables vistas aéreas cinematográficas."
  },
  { 
    id: 3, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxt8NmmldWth4kftJXzEFO1_NpD9EQAhIoHkyG3kqegGeQQWo3Pwv44wCyKrovUw3Bin4PFsYVcVbaFxNBFrhD8Rj9jYMu3IMzv4jbDqOhZ-89nlDd2Dbmc8CC1kf9y2vQNGFU_pNZSzjmAmxWWvY4CHpzNg5fc_nQHvH0A8Zc9xgXPN7nIc8Xv_z-685n9DApoiqlu-VpwdEUJsgW1mx9kqaBou2u16ssmazrvO623uR6vmYjuzbxSXFHM3BLSrVbuEU_7pg-qsg",
    titulo: "Garden City", 
    pais: "Singapur", 
    rating: 4.4, 
    descripcion: "La modernidad se encuentra con la naturaleza en una de las ciudades portuarias más impresionantes del mundo."
  },
  { 
    id: 4, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCt6tnyxTzoFXPwhFpwAGmH2SoZeo9WSOlVX3iVGiM9nXEOiGUxkaY_FUupmCB0pLR33TJ9GG-H_UNVq9SekPoK2niRpGg9WCFVD257IrE5HR9b2mJ8OeD4idZcod1Dhrp_AVyO8aojJyW5hmfq-zGpyTQEch_sN2fOQXMieBtkVnQhysooAER9ijM1gpZz70VHPr5xCIHv9mvutC8A4-lvi0rt5zoxzlrXHRt75mbjYkA1BFxdIfGAnn9igYUMDr0l90JEsfx-08",
    titulo: "Giza & El Cairo", 
    pais: "Egipto", 
    rating: 4.9, 
    descripcion: "Un viaje en el tiempo a través de las maravillas de la antigüedad con el confort de la modernidad."
  },
  { 
    id: 5, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLM7KF5dLUSakOkJ1I2z7e4HBbdBauq3Mh8WgR_3wryZV4uCoupFrnSmL7pC0RkuRObyusdZdTGL5gvRPLe0kaFBjOsojpkKopNOB697l2OCuPeoexs4ZIeuofnf1RPLVeejqKt6hO5Q21R5NhvHt3mDVuXhLp090r_UdlE8y0yH7im1nesL7mSgZz8NBQrUQM96XVONHmnF86wH9j1OWXAb6M-gFdDKUotnamswMf9W39clCC8w1BL45DLTA88uDu6g2VJy_HCps",
    titulo: "Burj Al Arab Area", 
    pais: "Dubái", 
    rating: 4.9, 
    descripcion: "El epítome del lujo mundial. Experimente la extravagancia árabe en su máximo esplendor desde su suite privada."
  },
  { 
    id: 6, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRIOYUDt3PNIi_bUqwmc9pVaOFPMldl0kNaAjmE6ji4AD9g9B5tTNPPFHykBaMZIMnlanDr5OI6hli2_PcdSt-CzTFBfm7dJPjk-MaVNNH_R3tMwzKuSBOtueVp4PEJllnbF0YGRYha7Zc-lTRCa6HtM8qcWmPFkjJqwycnIbFTXiLPUo3kRwPw1ZnHs8MJqR4QaOXeorI83m58c7c6yq7G_pFWuvbB0mfywXT62ysLnt3xAILvZghd_psl_EroHXMX8I3IjpoCN8",
    titulo: "Table Mountain", 
    pais: "Sudáfrica", 
    rating: 4.7, 
    descripcion: "Combine la majestuosidad de la icónica montaña con la elegancia costera de Ciudad del Cabo en una parada inolvidable frente al océano."
  }
];

const DestinationsGrid = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-8 lg:px-20 pb-24 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <h2 className="magiona-style text-4xl mb-4 text-night">Todos los Destinos</h2>
          <p className="text-night/60">Explore nuestro catálogo completo de puertos y experiencias seleccionadas para los viajeros más exigentes.</p>
        </div>
        <div className="flex gap-4">
          <select className="bg-white border border-gold/20 rounded-full px-6 py-2 text-sm focus:ring-gold focus:border-gold text-night shadow-sm">
            <option>Filtrar por Región</option>
            <option>Mediterráneo</option>
            <option>Caribe</option>
            <option>Asia Pacífico</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinos.map(destino => (
          <DestinationCard key={destino.id} destino={destino} />
        ))}
      </div>
      <div className="mt-20 text-center">
        <button className="bg-[#0e1a34] text-[#eacea9] px-12 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:shadow-2xl hover:bg-gold hover:text-white transition-all flex items-center gap-3 mx-auto border border-[#0e1a34]">
          Cargar más destinos
          <span className="material-symbols-outlined">expand_more</span>
        </button>
      </div>
    </section>
  );
};

export default DestinationsGrid;
