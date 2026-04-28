import React from 'react';
import FeedbackCard from './FeedbackCard';

const feedbacks = [
  {
    initials: 'JV',
    name: 'Julian Vanhoutte',
    registryId: '8821-ATL',
    stars: 5,
    text: 'La precisión de la sección del Diario Náutico no tiene igual. Como marino veterano, encuentro la curación editorial aquí muy superior a cualquier servicio de ruta automatizada. Se siente como leer un diario clásico manteniendo la integridad de datos modernos.',
    timeAgo: '4 días',
  },
  {
    initials: 'ER',
    name: 'Elena S. Rossi',
    registryId: '4402-MED',
    stars: 4,
    text: 'Un triunfo estético. Navegar por el archivo de "Expediciones" se siente como recorrer una galería física. La interfaz no interfiere, permitiendo que el patrimonio marítimo respire. La respuesta de los curadores también fue sumamente eficiente.',
    timeAgo: '1 semana',
  },
];

const FeedbackList: React.FC = () => {
  return (
    <div className="space-y-8">
      <h3 className="font-serif text-2xl text-[#D9E2FF] border-l-4 border-[#DEC29E] pl-4">
        Comentarios Recientes
      </h3>
      {feedbacks.map((fb) => (
        <FeedbackCard key={fb.registryId} {...fb} />
      ))}
    </div>
  );
};

export default FeedbackList;
