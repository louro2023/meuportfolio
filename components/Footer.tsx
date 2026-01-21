import React from 'react';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { contactInfo } = useData();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-2">{contactInfo.name}</h3>
          <p className="text-sm">{contactInfo.role}</p>
        </div>

        <div className="text-center md:text-right flex flex-col items-center md:items-end gap-2">
          <p className="text-sm">&copy; {currentYear} Todos os direitos reservados.</p>
          <div className="text-xs text-slate-600 flex items-center gap-2">
            Desenvolvido com React, Tailwind CSS & TypeScript
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;