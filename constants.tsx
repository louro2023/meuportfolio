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
  email: "contato@henriquelouro.com",
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

export const PROJECTS: Project[] = [
  {
    id: 'nova-iguacu-contratos',
    title: 'Gestão de Contratos - Pref. Nova Iguaçu',
    shortDescription: 'Sistema governamental para controle de contratos públicos, dashboard financeiro e gestão de vigências.',
    fullDescription: 'Solução robusta desenvolvida para a Prefeitura de Nova Iguaçu visando a transparência e controle dos contratos públicos. O sistema apresenta um dashboard gerencial estratégico com KPIs em tempo real (totalizadores financeiros, status de vigência), gráficos interativos por secretaria e uma interface completa para cadastro e acompanhamento de processos, aditivos e prazos. Inclui controle de acesso, alertas de vencimento e relatórios detalhados.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    type: 'Web System'
  },
  {
    id: '1',
    title: 'Sistema de Gestão ERP',
    shortDescription: 'Plataforma completa para gestão empresarial com controle de estoque e financeiro.',
    fullDescription: 'Um sistema robusto de ERP desenvolvido para pequenas e médias empresas. O sistema inclui módulos de controle de estoque em tempo real, fluxo de caixa, emissão de notas fiscais e relatórios gerenciais detalhados. A interface foi otimizada para alta produtividade e suporta múltiplos usuários com diferentes níveis de acesso.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    imageUrl: 'https://picsum.photos/seed/project1/800/600',
    type: 'Web System'
  },
  {
    id: '2',
    title: 'Dashboard Analítico Gov',
    shortDescription: 'Painel de visualização de dados públicos para monitoramento de recursos.',
    fullDescription: 'Desenvolvimento de um dashboard interativo para visualização de dados de transparência pública. O projeto utiliza gráficos dinâmicos para apresentar a alocação de recursos municipais, permitindo filtros por período, setor e categoria. Foco total em acessibilidade e performance para grandes volumes de dados.',
    technologies: ['Next.js', 'TypeScript', 'Recharts', 'Python API'],
    imageUrl: 'https://picsum.photos/seed/project2/800/600',
    type: 'Dashboard'
  },
  {
    id: '3',
    title: 'Portal Institucional Corporativo',
    shortDescription: 'Site institucional responsivo para uma grande empresa de logística.',
    fullDescription: 'Reformulação completa da presença digital de uma empresa de logística. O site conta com área do cliente para rastreamento de pedidos, blog integrado e sistema de carreiras. Otimizado para SEO e performance (Core Web Vitals).',
    technologies: ['React', 'Tailwind CSS', 'CMS Headless', 'Framer Motion'],
    imageUrl: 'https://picsum.photos/seed/project3/800/600',
    type: 'Institutional'
  },
  {
    id: '4',
    title: 'Automação com IA',
    shortDescription: 'Sistema de triagem automática de documentos utilizando NLP.',
    fullDescription: 'Ferramenta interna que utiliza modelos de processamento de linguagem natural (NLP) para ler, classificar e extrair dados de documentos PDF digitalizados, reduzindo o trabalho manual da equipe administrativa em 80%.',
    technologies: ['Python', 'FastAPI', 'React', 'OpenAI API'],
    imageUrl: 'https://picsum.photos/seed/project4/800/600',
    type: 'Web System'
  }
];

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