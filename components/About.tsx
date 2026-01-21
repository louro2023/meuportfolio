import React from 'react';
import { Bot, Zap, CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Sobre Mim</h2>
          <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Sou um desenvolvedor focado em criar <strong>sistemas de gestão eficientes</strong> e interfaces web intuitivas. 
            Com vasta experiência em transformar necessidades complexas de negócios em software funcional, atendo desde startups 
            até demandas de órgãos públicos que exigem rigor técnico e confiabilidade.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Zap className="text-primary-600" size={24} />
                Foco em Produtividade
              </h3>
              <p className="text-slate-600">
                Utilizo metodologias ágeis e arquiteturas limpas para garantir entregas rápidas sem comprometer a qualidade do código ou a escalabilidade do sistema.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Bot className="text-primary-600" size={24} />
                Inteligência Artificial Integrada
              </h3>
              <p className="text-slate-600">
                Utilizo ativamente ferramentas de <strong>Inteligência Artificial</strong> no meu fluxo de trabalho. Isso me permite acelerar o desenvolvimento, garantir códigos mais seguros e propor inovações tecnológicas que colocam seu projeto à frente da concorrência.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 flex flex-wrap gap-4 justify-center md:justify-start">
            {['Sistemas Web', 'APIs Restful', 'Dashboards', 'Automação'].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 text-sm font-medium text-slate-700 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                <CheckCircle2 size={14} className="text-green-500" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;