import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, Upload, Plus, Trash2, Image as ImageIcon, Pencil, Save, Phone, MapPin } from 'lucide-react';
import { Project } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { 
    profileImage, 
    updateProfileImage, 
    contactInfo,
    updateContactInfo,
    addProject, 
    updateProject, 
    deleteProject, 
    projects, 
    resetToDefaults 
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'projects'>('profile');

  // Estado para controle de edição de projetos
  const [editingId, setEditingId] = useState<string | null>(null);

  // Estados do formulário de projeto
  const [formProject, setFormProject] = useState<Partial<Project>>({
    title: '',
    shortDescription: '',
    fullDescription: '',
    technologies: [],
    imageUrl: '',
    type: 'Web System'
  });
  const [techInput, setTechInput] = useState('');

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setFormProject({ ...project });
    setTechInput(project.technologies.join(', '));
    const formElement = document.getElementById('project-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormProject({
      title: '',
      shortDescription: '',
      fullDescription: '',
      technologies: [],
      imageUrl: '',
      type: 'Web System'
    });
    setTechInput('');
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      deleteProject(id);
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProject.title || !formProject.shortDescription) return;

    const projectData: Project = {
      id: editingId || Date.now().toString(),
      title: formProject.title!,
      shortDescription: formProject.shortDescription!,
      fullDescription: formProject.fullDescription || formProject.shortDescription!,
      technologies: techInput.split(',').map(t => t.trim()).filter(t => t),
      imageUrl: formProject.imageUrl || 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000',
      type: formProject.type as any || 'Web System'
    };

    if (editingId) {
      updateProject(projectData);
      alert('Projeto atualizado com sucesso!');
    } else {
      addProject(projectData);
      alert('Projeto adicionado com sucesso!');
    }
    
    handleCancelEdit();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Área do Desenvolvedor</h2>
            <p className="text-sm text-slate-500">Gerencie o conteúdo do seu portfólio</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 font-medium text-sm transition-colors ${activeTab === 'profile' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Perfil & Contato
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-4 font-medium text-sm transition-colors ${activeTab === 'projects' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Gerenciar Projetos
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex-1">
          {activeTab === 'profile' ? (
            <div className="space-y-8">
              {/* Seção Imagem de Perfil */}
              <div className="text-center pb-8 border-b border-slate-200">
                <div className="relative inline-block group mb-6">
                  <img 
                    src={profileImage} 
                    alt="Current Profile" 
                    className="w-48 h-48 rounded-full object-cover border-4 border-slate-200 shadow-lg mx-auto"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium">Visualização</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-primary-300 rounded-xl bg-primary-50 cursor-pointer hover:bg-primary-100 transition-colors">
                    <Upload size={24} className="text-primary-600 mb-2" />
                    <span className="text-sm font-medium text-primary-700">Upload Imagem</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                  
                  <div className="flex flex-col gap-2">
                    <input 
                      type="text" 
                      placeholder="https://... (URL da Imagem)" 
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                      onChange={(e) => updateProfileImage(e.target.value)}
                    />
                    <p className="text-xs text-slate-500">Ou cole uma URL direta.</p>
                  </div>
                </div>
              </div>

              {/* Seção Dados de Contato */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800">Informações de Contato</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Número do WhatsApp (Formato internacional, sem símbolos)</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={contactInfo.whatsappNumber}
                      onChange={(e) => updateContactInfo({ whatsappNumber: e.target.value })}
                      placeholder="Ex: 5521999999999"
                      className="w-full pl-10 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <p className="text-xs text-slate-500">Isso atualizará todos os botões de "Conversar no WhatsApp" do site.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Localização</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={contactInfo.location}
                      onChange={(e) => updateContactInfo({ location: e.target.value })}
                      placeholder="Ex: São Paulo, SP"
                      className="w-full pl-10 p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Formulário de Adição/Edição */}
              <div id="project-form" className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-800">
                    {editingId ? 'Editar Projeto' : 'Adicionar Novo Projeto'}
                  </h3>
                  {editingId && (
                    <button 
                      onClick={handleCancelEdit}
                      className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      <X size={14} /> Cancelar Edição
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Título do Projeto</label>
                      <input 
                        required
                        type="text" 
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        value={formProject.title}
                        onChange={e => setFormProject({...formProject, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Tipo</label>
                      <select 
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        value={formProject.type}
                        onChange={e => setFormProject({...formProject, type: e.target.value as any})}
                      >
                        <option value="Web System">Web System</option>
                        <option value="Dashboard">Dashboard</option>
                        <option value="Institutional">Institutional</option>
                        <option value="App">App</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Descrição Curta</label>
                    <input 
                      required
                      type="text" 
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                      value={formProject.shortDescription}
                      onChange={e => setFormProject({...formProject, shortDescription: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Descrição Completa</label>
                    <textarea 
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none h-24"
                      value={formProject.fullDescription}
                      onChange={e => setFormProject({...formProject, fullDescription: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Tecnologias (separadas por vírgula)</label>
                    <input 
                      type="text" 
                      placeholder="React, TypeScript, Node.js..."
                      className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                      value={techInput}
                      onChange={e => setTechInput(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">URL da Imagem (Capa)</label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <ImageIcon size={18} className="absolute left-3 top-3 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="https://..."
                          className="w-full pl-10 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                          value={formProject.imageUrl}
                          onChange={e => setFormProject({...formProject, imageUrl: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-colors font-medium mt-4 text-white ${editingId ? 'bg-primary-600 hover:bg-primary-700' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    {editingId ? <><Save size={20} /> Salvar Alterações</> : <><Plus size={20} /> Adicionar Projeto</>}
                  </button>
                </form>
              </div>

              {/* Lista de Projetos Existentes */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">
                  Projetos Existentes ({projects.length})
                </h3>
                
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${editingId === project.id ? 'bg-primary-50 border-primary-200 ring-1 ring-primary-300' : 'bg-white border-slate-200 hover:shadow-md'}`}
                    >
                      <img 
                        src={project.imageUrl || 'https://via.placeholder.com/50'} 
                        alt={project.title}
                        className="w-12 h-12 rounded object-cover bg-slate-100"
                        onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50'}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 truncate">{project.title}</h4>
                        <p className="text-xs text-slate-500 truncate">{project.shortDescription}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(project)}
                          className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(project.id)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <button 
            onClick={() => {
              if(window.confirm('Isso apagará todas as configurações salvas (Projetos e Contato) e restaurará o padrão. Continuar?')) {
                resetToDefaults();
              }
            }}
            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
          >
            <Trash2 size={16} />
            Resetar Fábrica
          </button>
          
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
          >
            Concluir Edição
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;