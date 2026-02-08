import React, { useState, useEffect } from 'react';
import { YouthMember, SpiritualStatus, SpiritualLog } from '../../types';
import { getPastoralAdvice } from '../../services/geminiService';

// Componente para mostrar el detalle completo de un miembro seleccionado
interface MemberDetailProps {
  member: YouthMember;
  onClose: () => void;
  onUpdate: (member: YouthMember) => void;
}

// Modal de detalle del miembro con información personal, historial y formulario de seguimiento
const MemberDetail: React.FC<MemberDetailProps> = ({ member, onClose, onUpdate }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState<SpiritualStatus>(member.status);

  // Obtener consejo pastoral al cargar el componente

  useEffect(() => {
    fetchAdvice();
  }, [member.id]);

  // Función para obtener consejo pastoral basado en el estado actual del miembro
  const fetchAdvice = async () => {
    setLoadingAdvice(true);
    const result = await getPastoralAdvice(member);
    setAdvice(result);
    setLoadingAdvice(false);
  };

  // Manejar el envío del formulario de seguimiento espiritual

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
// Crear un nuevo registro de seguimiento espiritual y actualizar el miembro
    const log: SpiritualLog = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      note: newNote,
      status: newStatus
    };

// Actualizar el estado espiritual del miembro y agregar el nuevo registro al historial
    const updatedMember = {
      ...member,
      status: newStatus,
      spiritualLogs: [log, ...member.spiritualLogs]
    };

    onUpdate(updatedMember);
    setNewNote('');
  };
  // Renderizar el modal con la información del miembro, consejo pastoral y formulario de seguimiento

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-indigo-50">
          <div className="flex items-center gap-4">
            <img 
              src={member.photoUrl || `https://picsum.photos/seed/${member.id}/200/200`} 
              className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-sm"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{member.name}</h2>
              <p className="text-indigo-600 text-sm font-medium">Seguimiento Espiritual</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* columna izquierda*/}
          <div className="md:col-span-1 space-y-6">
            <section className="bg-gray-50 p-4 rounded-2xl">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Información Personal</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <i className="fas fa-cake-candles text-pink-400"></i>
                  <span className="text-sm">{new Date(member.birthDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-phone text-green-400"></i>
                  <span className="text-sm">{member.phoneNumber || 'Sin teléfono'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-envelope text-blue-400"></i>
                  <span className="text-sm">{member.email || 'Sin correo'}</span>
                </div>
              </div>
            </section>

            <section className="bg-indigo-600 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="flex items-center gap-2 font-bold mb-2">
                  <i className="fas fa-wand-magic-sparkles"></i> Guía Espiritual (AI)
                </h3>
                {loadingAdvice ? (
                  <div className="flex items-center gap-2 text-indigo-200">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Pensando...
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed italic opacity-90">
                    "{advice}"
                  </p>
                )}
                <button 
                  onClick={fetchAdvice}
                  className="mt-4 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
                >
                  <i className="fas fa-rotate-right mr-1"></i> Recargar consejo
                </button>
              </div>
              <i className="fas fa-dove absolute -bottom-4 -right-4 text-white/10 text-8xl"></i>
            </section>
          </div>

          {/* columna derecha: historial y formulario de seguimiento */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Nueva Actualización</h3>
              <form onSubmit={handleAddLog} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado Espiritual</label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as SpiritualStatus)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                  >
                    {Object.values(SpiritualStatus).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nota de observación</label>
                  <textarea 
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="¿Cómo se encuentra hoy? ¿Necesita oración? ¿Avances observados?"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 h-24 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors w-full">
                  Registrar Seguimiento
                </button>
              </form>
            </section>
{/*Historial de segumiento espiritual*/}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Historial</h3>
              <div className="space-y-4">
                {member.spiritualLogs.length === 0 ? (
                  <p className="text-gray-400 text-center py-8 bg-gray-50 rounded-2xl border border-dashed">No hay registros aún.</p>
                ) : (
                  member.spiritualLogs.map(log => (
                    <div key={log.id} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:border-indigo-200 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-tighter">
                          {new Date(log.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-bold">{log.status}</span>
                      </div>
                      <p className="text-sm text-gray-700">{log.note}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
