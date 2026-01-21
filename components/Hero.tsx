import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero: React.FC = () => {
  const { profileImage, contactInfo } = useData();

  const handleScrollToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/50 via-slate-50 to-slate-50"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left order-2 md:order-1">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary-700 uppercase bg-primary-100 rounded-full">
            Disponível para novos projetos
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Desenvolvedor de <br/>
            <span className="text-primary-600">Sistemas & Web</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Especializado em criar soluções digitais robustas, dashboards gerenciais e sites de alta performance para empresas e órgãos públicos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href={`https://wa.me/${contactInfo.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all shadow-md hover:shadow-lg gap-2"
            >
              <MessageCircle size={20} />
              Conversar no WhatsApp
            </a>
            <a 
              href="#portfolio"
              onClick={handleScrollToPortfolio}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-all gap-2 cursor-pointer"
            >
              Ver Projetos
              <ArrowRight size={20} />
            </a>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 flex justify-center order-1 md:order-2">
          {profileImage && (
            <div className="relative">
              <div className="absolute inset-0 bg-primary-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              
              <img 
                src={profileImage} 
                alt={contactInfo.name} 
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              {/* Floating badge */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-0 bg-white p-3 rounded-lg shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-slate-700">Online Agora</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Hero;