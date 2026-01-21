import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project } from '../types';
import { PROJECTS as INITIAL_PROJECTS, CONTACT_INFO as INITIAL_CONTACT_INFO } from '../constants';
import { projectsServiceRTDB, contactServiceRTDB, profileServiceRTDB, cleanupListeners } from '../services/firebaseRealtimeService';

// Inicializar Firebase de forma segura
try {
  import('../config/firebase');
} catch (error) {
  console.warn('Firebase não disponível');
}

interface ContactInfo {
  whatsappNumber: string;
  location: string;
  email: string; // Mantendo email e nome no estado para consistência, mesmo que só editemos whats/local por enquanto
  name: string;
  role: string;
}

interface DataContextType {
  profileImage: string;
  updateProfileImage: (url: string) => void;
  projects: Project[];
  contactInfo: ContactInfo;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado da Imagem de Perfil
  const [profileImage, setProfileImage] = useState<string>('/profile.jpg');
  
  // Estado dos Projetos
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  // Estado das Informações de Contato
  const [contactInfo, setContactInfo] = useState<ContactInfo>(INITIAL_CONTACT_INFO);

  // Estado de carregamento
  const [, setIsLoading] = useState(true);

  // Carregar dados do Firebase ao iniciar e escutar mudanças em tempo real
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Carregar imagem de perfil inicial
        try {
          const profileData = await profileServiceRTDB.get();
          if (profileData?.url) {
            setProfileImage(profileData.url);
          }
        } catch (error) {
          const savedImage = localStorage.getItem('dev_portfolio_image');
          if (savedImage) setProfileImage(savedImage);
        }

        // Carregar projetos inicial
        try {
          const projectsData = await projectsServiceRTDB.getAll();
          if (projectsData && projectsData.length > 0) {
            setProjects(projectsData);
          }
        } catch (error) {
          const savedProjects = localStorage.getItem('dev_portfolio_projects');
          if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
          }
        }

        // Carregar informações de contato inicial
        try {
          const contactData = await contactServiceRTDB.get();
          if (contactData) {
            setContactInfo({
              name: contactData.name,
              role: contactData.role,
              whatsappNumber: contactData.whatsappNumber,
              email: contactData.email,
              location: contactData.location,
            });
          }
        } catch (error) {
          const savedContact = localStorage.getItem('dev_portfolio_contact');
          if (savedContact) {
            setContactInfo(JSON.parse(savedContact));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // Configurar listeners em tempo real para sincronização
    const unsubscribeProfile = profileServiceRTDB.listenToProfile((profileData) => {
      if (profileData?.url) {
        setProfileImage(profileData.url);
        localStorage.setItem('dev_portfolio_image', profileData.url);
      }
    });

    const unsubscribeProjects = projectsServiceRTDB.listenToProjects((projectsData) => {
      setProjects(projectsData);
      localStorage.setItem('dev_portfolio_projects', JSON.stringify(projectsData));
    });

    const unsubscribeContact = contactServiceRTDB.listenToContact((contactData) => {
      if (contactData) {
        setContactInfo({
          name: contactData.name,
          role: contactData.role,
          whatsappNumber: contactData.whatsappNumber,
          email: contactData.email,
          location: contactData.location,
        });
        localStorage.setItem('dev_portfolio_contact', JSON.stringify(contactData));
      }
    });

    // Cleanup listeners ao desmontar
    return () => {
      unsubscribeProfile();
      unsubscribeProjects();
      unsubscribeContact();
    };
  }, []);

  const updateProfileImage = async (url: string) => {
    try {
      setProfileImage(url);
      await profileServiceRTDB.update(url);
    } catch (error) {
      console.error('Erro ao atualizar imagem:', error);
      // Não usa localStorage como fallback - dados devem vir do Firebase
    }
  };

  const updateContactInfo = async (info: Partial<ContactInfo>) => {
    try {
      const newInfo = { ...contactInfo, ...info };
      setContactInfo(newInfo);
      await contactServiceRTDB.update(newInfo);
    } catch (error) {
      console.error('Erro ao atualizar contato:', error);
      // Não usa localStorage como fallback - dados devem vir do Firebase
    }
  };

  const addProject = async (project: Project) => {
    try {
      const { id, ...projectData } = project;
      const newId = await projectsServiceRTDB.add(projectData as any);
      const newProject = { ...projectData, id: newId };
      const updatedProjects = [newProject, ...projects];
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error);
      // Não usa localStorage como fallback - dados devem vir do Firebase
    }
  };

  const updateProject = async (updatedProject: Project) => {
    try {
      await projectsServiceRTDB.update(updatedProject.id, updatedProject);
      const updatedProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      // Não usa localStorage como fallback - dados devem vir do Firebase
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectsServiceRTDB.delete(id);
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      // Não usa localStorage como fallback - dados devem vir do Firebase
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem('dev_portfolio_image');
    localStorage.removeItem('dev_portfolio_projects');
    localStorage.removeItem('dev_portfolio_contact');
    
    setProfileImage('/profile.jpg');
    setProjects(INITIAL_PROJECTS);
    setContactInfo(INITIAL_CONTACT_INFO);
    
    window.location.reload();
  };

  return (
    <DataContext.Provider value={{ 
      profileImage, 
      updateProfileImage, 
      projects,
      contactInfo,
      updateContactInfo, 
      addProject, 
      updateProject, 
      deleteProject, 
      resetToDefaults 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};