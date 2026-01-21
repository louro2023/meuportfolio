import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">Expertise Técnica</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Tecnologias e Ferramentas</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Um conjunto de ferramentas modernas selecionadas para construir aplicações rápidas, seguras e escaláveis.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {SKILLS.map((skill) => (
            <div 
              key={skill.name}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group"
            >
              <div className="p-3 bg-slate-50 rounded-full mb-4 group-hover:bg-primary-50 transition-colors">
                <skill.icon size={32} className="text-slate-600 group-hover:text-primary-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-slate-900 text-center">{skill.name}</h3>
              <span className="text-xs text-slate-500 mt-1">{skill.category}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-900 rounded-2xl p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-white">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Precisa de uma tecnologia específica?</h3>
            <p className="text-blue-100">Tenho facilidade em aprender e me adaptar a novas stacks conforme a necessidade do projeto.</p>
          </div>
          <a 
            href="#contact" 
            onClick={handleScrollToContact}
            className="px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Consultar disponibilidade
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;