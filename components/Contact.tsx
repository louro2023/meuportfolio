import React from 'react';
import { MessageSquare, Mail, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { contactInfo } = useData();

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Vamos tirar seu projeto do papel?</h2>
        <p className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
          Entre em contato para discutirmos como posso ajudar a desenvolver seu sistema, dashboard ou site institucional. 
          Estou disponível para novas parcerias.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a 
            href={`https://wa.me/${contactInfo.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors border border-slate-700 group"
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
              <MessageSquare className="text-green-500" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
            <span className="text-slate-400 text-sm">Fale diretamente comigo</span>
          </a>

          <a 
            href={`mailto:${contactInfo.email}`}
            className="flex flex-col items-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors border border-slate-700 group"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Mail className="text-blue-500" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-1">Email</h3>
            <span className="text-slate-400 text-sm">{contactInfo.email}</span>
          </a>

          <div className="flex flex-col items-center p-6 bg-slate-800 rounded-xl border border-slate-700">
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-purple-500" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-1">Localização</h3>
            <span className="text-slate-400 text-sm">{contactInfo.location}</span>
          </div>
        </div>

        <a 
          href={`https://wa.me/${contactInfo.whatsappNumber}?text=Olá,%20gostaria%20de%20fazer%20um%20orçamento.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1"
        >
          Iniciar Conversa Agora
        </a>
      </div>
    </section>
  );
};

export default Contact;