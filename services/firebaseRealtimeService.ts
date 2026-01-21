import { db } from '../config/firebase';
import {
  ref,
  get,
  set,
  update,
  remove,
  push,
  serverTimestamp,
  onValue,
  Unsubscribe,
} from 'firebase/database';
import { Project } from '../types';

export interface ContactInfoRTDB {
  whatsappNumber: string;
  location: string;
  email: string;
  name: string;
  role: string;
  updatedAt?: string;
}

export interface ProfileImageRTDB {
  url: string;
  updatedAt?: string;
}

// Store para gerenciar listeners
const listeners: Unsubscribe[] = [];

export const cleanupListeners = () => {
  listeners.forEach(unsubscribe => unsubscribe());
  listeners.length = 0;
};

// Callbacks para notificações em tempo real
const projectsCallbacks: ((projects: Project[]) => void)[] = [];
const profileCallbacks: ((profile: ProfileImageRTDB) => void)[] = [];
const contactCallbacks: ((contact: ContactInfoRTDB) => void)[] = [];

export const subscribeToProjects = (callback: (projects: Project[]) => void): (() => void) => {
  projectsCallbacks.push(callback);
  return () => {
    const index = projectsCallbacks.indexOf(callback);
    if (index > -1) projectsCallbacks.splice(index, 1);
  };
};

export const subscribeToProfile = (callback: (profile: ProfileImageRTDB) => void): (() => void) => {
  profileCallbacks.push(callback);
  return () => {
    const index = profileCallbacks.indexOf(callback);
    if (index > -1) profileCallbacks.splice(index, 1);
  };
};

export const subscribeToContact = (callback: (contact: ContactInfoRTDB) => void): (() => void) => {
  contactCallbacks.push(callback);
  return () => {
    const index = contactCallbacks.indexOf(callback);
    if (index > -1) contactCallbacks.splice(index, 1);
  };
};

// ===== PROJETOS - REALTIME DATABASE =====
export const projectsServiceRTDB = {
  async getAll(): Promise<Project[]> {
    try {
      if (!db) return [];
      const snapshot = await get(ref(db, 'projects'));
      if (!snapshot.exists()) {
        return [];
      }
      const data = snapshot.val();
      return Object.entries(data).map(([id, project]: [string, any]) => ({
        id,
        ...project,
      } as Project));
    } catch (error) {
      console.debug('Firebase: projetos não disponíveis, usando localStorage');
      throw error;
    }
  },

  listenToProjects(callback: (projects: Project[]) => void): (() => void) {
    if (!db) return () => {};
    
    try {
      const unsubscribe = onValue(
        ref(db, 'projects'),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const projects = Object.entries(data).map(([id, project]: [string, any]) => ({
              id,
              ...project,
            } as Project));
            callback(projects);
          } else {
            callback([]);
          }
        },
        (error) => {
          console.debug('Firebase: erro ao escutar projetos', error);
        }
      );
      
      listeners.push(unsubscribe);
      return unsubscribe;
    } catch (error) {
      console.debug('Firebase: erro ao configurar listener de projetos');
      return () => {};
    }
  },

  async add(project: Omit<Project, 'id'>): Promise<string> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      const projectsRef = ref(db, 'projects');
      const newProjectRef = push(projectsRef);
      const newId = newProjectRef.key || '';
      
      await set(newProjectRef, {
        ...project,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      return newId;
    } catch (error: any) {
      console.error('Erro ao adicionar projeto:', error.message);
      throw error;
    }
  },

  async update(id: string, project: Partial<Project>): Promise<void> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      await update(ref(db, `projects/${id}`), {
        ...project,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Erro ao atualizar projeto:', error.message);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      await remove(ref(db, `projects/${id}`));
    } catch (error: any) {
      console.error('Erro ao deletar projeto:', error.message);
      throw error;
    }
  },
};

// ===== INFORMAÇÕES DE CONTATO - REALTIME DATABASE =====
export const contactServiceRTDB = {
  async get(): Promise<ContactInfoRTDB | null> {
    try {
      if (!db) return null;
      const snapshot = await get(ref(db, 'portfolio/contactInfo'));
      if (snapshot.exists()) {
        return snapshot.val() as ContactInfoRTDB;
      }
      return null;
    } catch (error) {
      console.debug('Firebase: informações de contato não disponíveis');
      throw error;
    }
  },

  listenToContact(callback: (contact: ContactInfoRTDB | null) => void): (() => void) {
    if (!db) return () => {};
    
    try {
      const unsubscribe = onValue(
        ref(db, 'portfolio/contactInfo'),
        (snapshot) => {
          if (snapshot.exists()) {
            callback(snapshot.val() as ContactInfoRTDB);
          } else {
            callback(null);
          }
        },
        (error) => {
          console.debug('Firebase: erro ao escutar contato', error);
        }
      );
      
      listeners.push(unsubscribe);
      return unsubscribe;
    } catch (error) {
      console.debug('Firebase: erro ao configurar listener de contato');
      return () => {};
    }
  },

  async update(data: ContactInfoRTDB): Promise<void> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      await set(ref(db, 'portfolio/contactInfo'), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Erro ao atualizar contato:', error.message);
      throw error;
    }
  },
};

// ===== IMAGEM DE PERFIL - REALTIME DATABASE =====
export const profileServiceRTDB = {
  async get(): Promise<ProfileImageRTDB | null> {
    try {
      if (!db) return null;
      const snapshot = await get(ref(db, 'portfolio/profileImage'));
      if (snapshot.exists()) {
        return snapshot.val() as ProfileImageRTDB;
      }
      return null;
    } catch (error) {
      console.debug('Firebase: imagem de perfil não disponível');
      throw error;
    }
  },

  listenToProfile(callback: (profile: ProfileImageRTDB | null) => void): (() => void) {
    if (!db) return () => {};
    
    try {
      const unsubscribe = onValue(
        ref(db, 'portfolio/profileImage'),
        (snapshot) => {
          if (snapshot.exists()) {
            callback(snapshot.val() as ProfileImageRTDB);
          } else {
            callback(null);
          }
        },
        (error) => {
          console.debug('Firebase: erro ao escutar imagem de perfil', error);
        }
      );
      
      listeners.push(unsubscribe);
      return unsubscribe;
    } catch (error) {
      console.debug('Firebase: erro ao configurar listener de perfil');
      return () => {};
    }
  },

  async update(url: string): Promise<void> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      await set(ref(db, 'portfolio/profileImage'), {
        url,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Erro ao atualizar imagem:', error.message);
      throw error;
    }
  },
};
