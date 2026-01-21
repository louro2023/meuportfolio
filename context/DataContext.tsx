import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project } from '../types';
import { PROJECTS as INITIAL_PROJECTS, CONTACT_INFO as INITIAL_CONTACT_INFO } from '../constants';
import { projectsServiceRTDB, contactServiceRTDB, profileServiceRTDB } from '../services/firebaseRealtimeService';

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

  // Carregar dados do Firebase ao iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Tentar carregar do Firebase, com fallback para localStorage
        try {
          // Carregar imagem de perfil
          const profileData = await profileServiceRTDB.get();
          if (profileData?.url) {
            setProfileImage(profileData.url);
          } else {
            throw new Error('Firebase não disponível');
          }
        } catch {
          const savedImage = localStorage.getItem('dev_portfolio_image');
          if (savedImage) setProfileImage(savedImage);
        }

        try {
          // Carregar projetos
          const projectsData = await projectsServiceRTDB.getAll();
          if (projectsData && projectsData.length > 0) {
            setProjects(projectsData);
          } else {
            throw new Error('Firebase não disponível');
          }
        } catch {
          const savedProjects = localStorage.getItem('dev_portfolio_projects');
          if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
          }
        }

        try {
          // Carregar informações de contato
          const contactData = await contactServiceRTDB.get();
          if (contactData) {
            setContactInfo({
              name: contactData.name,
              role: contactData.role,
              whatsappNumber: contactData.whatsappNumber,
              email: contactData.email,
              location: contactData.location,
            });
          } else {
            throw new Error('Firebase não disponível');
          }
        } catch {
          const savedContact = localStorage.getItem('dev_portfolio_contact');
          if (savedContact) {
            setContactInfo(JSON.parse(savedContact));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Fallback para localStorage se tudo falhar
        const savedImage = localStorage.getItem('dev_portfolio_image');
        const savedProjects = localStorage.getItem('dev_portfolio_projects');
        const savedContact = localStorage.getItem('dev_portfolio_contact');

        if (savedImage) setProfileImage(savedImage);
        if (savedProjects) setProjects(JSON.parse(savedProjects));
        if (savedContact) setContactInfo(JSON.parse(savedContact));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const updateProfileImage = async (url: string) => {
    try {
      setProfileImage(url);
      await profileServiceRTDB.update(url);
      localStorage.setItem('dev_portfolio_image', url);
    } catch (error) {
      console.error('Erro ao atualizar imagem:', error);
      localStorage.setItem('dev_portfolio_image', url);
    }
  };

  const updateContactInfo = async (info: Partial<ContactInfo>) => {
    try {
      const newInfo = { ...contactInfo, ...info };
      setContactInfo(newInfo);
      await contactServiceRTDB.update(newInfo);
      localStorage.setItem('dev_portfolio_contact', JSON.stringify(newInfo));
    } catch (error) {
      console.error('Erro ao atualizar contato:', error);
      localStorage.setItem('dev_portfolio_contact', JSON.stringify({ ...contactInfo, ...info }));
    }
  };

  const addProject = async (project: Project) => {
    try {
      const { id, ...projectData } = project;
      const newId = await projectsServiceRTDB.add(projectData as any);
      const newProject = { ...projectData, id: newId };
      const updatedProjects = [newProject, ...projects];
      setProjects(updatedProjects);
      localStorage.setItem('dev_portfolio_projects', JSON.stringify(updatedProjects));
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error);
      const updatedProjects = [project, ...projects];
      setProjects(updatedProjects);
      localStorage.setItem('dev_portfolio_projects', JSON.stringify(updatedProjects));
    }
  };

  const updateProject = async (updatedProject: Project) => {
    try {
      await projectsServiceRTDB.update(updatedProject.id, updatedProject);
      const updatedProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
      setProjects(updatedProjects);
      localStorage.setItem('dev_portfolio_projects', JSON.stringify(updatedProjects));
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      const updatedProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
      setProjects(updatedProjects);
      localStorage.setItem('dev_portfolio_projects', JSON.stringify(updatedProjects));
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectsServiceRTDB.delete(id);
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem('dev_portfolio_projects', JSON.stringify(updatedProjects));
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem('dev_portfolio_projects', JSON.stringify(updatedProjects));
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