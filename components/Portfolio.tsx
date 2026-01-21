import React, { useState } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Code2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const Portfolio: React.FC = () => {
  const { projects } = useData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="portfolio" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Projetos em Destaque</h2>
          <p className="text-slate-600 max-w-2xl">
            Uma seleção de sistemas, dashboards e sites desenvolvidos recentemente. 
            Cada projeto representa um desafio superado e valor gerado para o cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                       (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Code2 size={48} />
                  </div>
                )}
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-xs font-bold text-slate-800 px-3 py-1 rounded-full z-20 shadow-sm uppercase tracking-wide">
                  {project.type}
                </span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                  {project.shortDescription}
                </p>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <button className="text-primary-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Ver detalhes <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Details */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm" onClick={closeModal}>
          <div 
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80 w-full bg-slate-100">
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                   (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000';
                }}
              />
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-slate-800 hover:bg-white hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-3 mb-2">
                 <span className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  {selectedProject.type}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{selectedProject.title}</h3>
              
              <div className="prose prose-slate max-w-none mb-8">
                <p className="text-slate-600 text-lg leading-relaxed">{selectedProject.fullDescription}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Tecnologias Utilizadas</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg text-slate-700 font-medium">
                      <Code2 size={16} className="text-primary-500" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6 flex justify-end">
                <button 
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
