
import React, { useState, useEffect, useMemo } from 'react';
import { YouthMember, SpiritualStatus } from './types';
import MemberCard from './src/components/MemberCard';
import MemberDetail from './src/components/MemberDetail';
import MemberForm from './src/components/MemberForm';

const INITIAL_MEMBERS: YouthMember[] = [
  {
    id: '1',
    name: 'Ana García',
    birthDate: '2005-05-15',
    photoUrl: 'https://picsum.photos/seed/ana/400/400',
    phoneNumber: '555-0101',
    email: 'ana.garcia@gmail.com',
    status: SpiritualStatus.CRECIENDO,
    spiritualLogs: [],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Mateo Rodríguez',
    birthDate: new Date().toISOString().split('T')[0], // Birthday today!
    photoUrl: 'https://picsum.photos/seed/mateo/400/400',
    phoneNumber: '555-0202',
    email: 'mateo.r@outlook.com',
    status: SpiritualStatus.ESTABLE,
    spiritualLogs: [],
    createdAt: new Date().toISOString()
  }
];

const App: React.FC = () => {
  const [members, setMembers] = useState<YouthMember[]>(() => {
    const saved = localStorage.getItem('church_youth_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });
  const [selectedMember, setSelectedMember] = useState<YouthMember | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<SpiritualStatus | 'Todos'>('Todos');

  useEffect(() => {
    localStorage.setItem('church_youth_members', JSON.stringify(members));
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'Todos' || m.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [members, searchTerm, filterStatus]);

  const stats = useMemo(() => {
    const today = new Date();
    return {
      total: members.length,
      birthdays: members.filter(m => {
        const bd = new Date(m.birthDate);
        return bd.getMonth() === today.getMonth();
      }).length,
      needsSupport: members.filter(m => m.status === SpiritualStatus.NECESITA_APOYO).length
    };
  }, [members]);

  const handleAddMember = (newMember: YouthMember) => {
    setMembers([newMember, ...members]);
    setShowAddForm(false);
  };

  const handleUpdateMember = (updated: YouthMember) => {
    setMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
    setSelectedMember(updated);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Sidebar o barra de navegación */}
      <nav className="fixed top-0 left-0 h-full w-20 hidden lg:flex flex-col items-center py-8 bg-indigo-900 text-white z-40">
        <div className="mb-12 bg-white/20 p-3 rounded-2xl">
          <i className="fas fa-church text-2xl"></i>
        </div>
        <div className="space-y-8 flex flex-col items-center">
          <button className="text-white bg-indigo-500 p-3 rounded-2xl shadow-lg">
            <i className="fas fa-home"></i>
          </button>
          <button className="text-indigo-300 hover:text-white transition-colors">
            <i className="fas fa-users"></i>
          </button>
          <button className="text-indigo-300 hover:text-white transition-colors">
            <i className="fas fa-calendar-star"></i>
          </button>
          <button className="text-indigo-300 hover:text-white transition-colors">
            <i className="fas fa-chart-line"></i>
          </button>
        </div>
        <div className="mt-auto">
          <button className="text-indigo-300 hover:text-white">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </nav>

      <main className="lg:ml-20 p-4 md:p-8 max-w-7xl mx-auto">
        {/* seccion de encabezado */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Portal Juvenil</h1>
            <p className="text-gray-500 font-medium">Liderazgo y Seguimiento de Pastoreo</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Buscar joven..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
              />
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 flex items-center gap-2 whitespace-nowrap"
            >
              <i className="fas fa-plus"></i> <span className="hidden sm:inline">Nuevo Joven</span>
            </button>
          </div>
        </header>

        {/* Dashboard */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-xl">
              <i className="fas fa-users"></i>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Jóvenes</p>
              <h3 className="text-2xl font-black text-gray-800">{stats.total}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-5">
            <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-xl">
              <i className="fas fa-birthday-cake"></i>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Cumples del Mes</p>
              <h3 className="text-2xl font-black text-gray-800">{stats.birthdays}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-5">
            <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-xl">
              <i className="fas fa-heart-pulse"></i>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Necesitan Apoyo</p>
              <h3 className="text-2xl font-black text-gray-800">{stats.needsSupport}</h3>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {['Todos', ...Object.values(SpiritualStatus)].map(s => (
            <button 
              key={s}
              onClick={() => setFilterStatus(s as any)}
              className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                filterStatus === s 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* zona miembros */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map(member => (
            <MemberCard 
              key={member.id} 
              member={member} 
              onSelect={setSelectedMember} 
            />
          ))}
          {filteredMembers.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-gray-300 text-3xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-500">No se encontraron jóvenes</h3>
              <p className="text-gray-400">Prueba con otros filtros o añade un nuevo miembro.</p>
            </div>
          )}
        </section>
      </main>

      {/* Modals */}
      {selectedMember && (
        <MemberDetail 
          member={selectedMember} 
          onClose={() => setSelectedMember(null)}
          onUpdate={handleUpdateMember}
        />
      )}
      {showAddForm && (
        <MemberForm 
          onAdd={handleAddMember} 
          onCancel={() => setShowAddForm(false)} 
        />
      )}

      {/* boton para navegacion moviles */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex justify-around items-center py-4 z-40">
        <button className="text-indigo-600"><i className="fas fa-home text-xl"></i></button>
        <button className="text-gray-300"><i className="fas fa-users text-xl"></i></button>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 text-white w-12 h-12 rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center -mt-8"
        >
          <i className="fas fa-plus"></i>
        </button>
        <button className="text-gray-300"><i className="fas fa-calendar text-xl"></i></button>
        <button className="text-gray-300"><i className="fas fa-cog text-xl"></i></button>
      </nav>
    </div>
  );
};

export default App;
