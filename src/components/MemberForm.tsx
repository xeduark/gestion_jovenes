import React, { useState, useRef } from 'react';
import { YouthMember, SpiritualStatus } from '../../types';

// Componente para el formulario de agregar nuevo miembro

interface MemberFormProps {
  onAdd: (member: YouthMember) => void;
  onCancel: () => void;
}

// Modal de formulario para agregar un nuevo miembro con campos para información personal y foto

const MemberForm: React.FC<MemberFormProps> = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejar la carga de la foto y convertirla a base64 para mostrarla en la interfaz

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar el envío del formulario y crear un nuevo miembro con la información proporcionada

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthDate) return;

    const newMember: YouthMember = {
      id: crypto.randomUUID(),
      name,
      birthDate,
      photoUrl,
      phoneNumber,
      email,
      status: SpiritualStatus.ESTABLE,
      spiritualLogs: [],
      createdAt: new Date().toISOString()
    };

    onAdd(newMember);
  };

  // Renderizar el modal con el formulario para agregar un nuevo miembro

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-6 border-b bg-indigo-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Nuevo Joven</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex flex-col items-center mb-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 bg-gray-100 rounded-3xl border-2 border-dashed border-indigo-200 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-indigo-50 transition-colors"
            >
              {photoUrl ? (
                <img src={photoUrl} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <i className="fas fa-camera text-indigo-300 text-xl mb-1"></i>
                  <p className="text-[10px] text-indigo-400 font-bold">FOTO</p>
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoUpload} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nombre Completo</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Fecha de Nacimiento</label>
            <input 
              required
              type="date" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Celular</label>
            <input 
              type="tel" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="+506 8888 8888"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onCancel}
              className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberForm;
