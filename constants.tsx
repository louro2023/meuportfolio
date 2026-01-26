import { 
  Code2, 
  Database, 
  Layout, 
  Server, 
  Smartphone, 
  Cpu, 
  Layers, 
  Terminal,
  Github,
  Linkedin,
  Mail,
  Phone
} from 'lucide-react';
import { Project, Skill, SocialLink } from './types';

export const CONTACT_INFO = {
  name: "Henrique Louro",
  role: "Desenvolvedor Full Stack & Especialista em Sistemas",
  whatsappNumber: "5521981682922", // Format for API: CountryCode+AreaCode+Number
  email: "henrique-louro@hotmail.com",
  location: "São Paulo, SP"
};

export const SKILLS: Skill[] = [
  { name: 'JavaScript (ES6+)', icon: Code2, category: 'Frontend' },
  { name: 'TypeScript', icon: Code2, category: 'Frontend' },
  { name: 'React.js', icon: Layout, category: 'Frontend' },
  { name: 'Next.js', icon: Layers, category: 'Frontend' },
  { name: 'Node.js', icon: Server, category: 'Backend' },
  { name: 'Python', icon: Terminal, category: 'Backend' },
  { name: 'HTML5 & CSS3', icon: Layout, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: Smartphone, category: 'Frontend' },
  { name: 'SQL & NoSQL', icon: Database, category: 'Backend' },
  { name: 'AI Integration', icon: Cpu, category: 'Tools' },
];

export const PROJECTS: Project[] = [];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'WhatsApp',
    url: `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=Olá!%20Gostaria%20de%20falar%20sobre%20um%20projeto.`,
    icon: Phone,
    label: 'Conversar no WhatsApp'
  },
  {
    name: 'Email',
    url: `mailto:${CONTACT_INFO.email}`,
    icon: Mail,
    label: 'Enviar Email'
  },
  {
    name: 'LinkedIn',
    url: '#',
    icon: Linkedin,
    label: 'Perfil Profissional'
  },
  {
    name: 'GitHub',
    url: '#',
    icon: Github,
    label: 'Repositório de Código'
  }
];