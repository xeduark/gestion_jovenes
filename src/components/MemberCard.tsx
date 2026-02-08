import React from 'react';
import { YouthMember, SpiritualStatus } from '../../types';
// Componente para mostrar la tarjeta de cada miembro en la lista principal
interface MemberCardProps {
  member: YouthMember;
  onSelect: (member: YouthMember) => void;
}
// Colores para cada estado espiritual
const statusColors: Record<SpiritualStatus, string> = {
  [SpiritualStatus.CRECIENDO]: 'bg-green-100 text-green-700 border-green-200',
  [SpiritualStatus.ESTABLE]: 'bg-blue-100 text-blue-700 border-blue-200',
  [SpiritualStatus.NECESITA_APOYO]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  [SpiritualStatus.ALEJADO]: 'bg-red-100 text-red-700 border-red-200',
};
// Componente de tarjeta de miembro
const MemberCard: React.FC<MemberCardProps> = ({ member, onSelect }) => {
  const isBirthdaySoon = () => {
    const today = new Date();
    const birthDate = new Date(member.birthDate);
    return today.getMonth() === birthDate.getMonth() && Math.abs(today.getDate() - birthDate.getDate()) <= 7;
  };

  return (
    // Tarjeta del miembro con foto, nombre, fecha de nacimiento y estado espiritual
    <div 
      onClick={() => onSelect(member)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={member.photoUrl || `https://picsum.photos/seed/${member.id}/400/300`} 
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isBirthdaySoon() && (
          <div className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce flex items-center gap-1 shadow-lg">
            <i className="fas fa-cake-candles"></i> ¡Cumpleaños!
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 truncate">{member.name}</h3>
        <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <i className="far fa-calendar text-indigo-400"></i>
          {new Date(member.birthDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${statusColors[member.status]}`}>
            {member.status}
          </span>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Ver perfil <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
