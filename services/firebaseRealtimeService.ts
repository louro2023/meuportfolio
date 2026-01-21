import { db } from '../config/firebase';
import {
  ref,
  get,
  set,
  update,
  remove,
  push,
  serverTimestamp,
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

// ===== PROJETOS - REALTIME DATABASE =====
export const projectsServiceRTDB = {
  async getAll(): Promise<Project[]> {
    try {
      if (!db) throw new Error('Firebase não configurado');
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
      console.error('Erro ao buscar projetos:', error);
      throw error;
    }
  },

  async add(project: Omit<Project, 'id'>): Promise<string> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      const projectsRef = ref(db, 'projects');
      const newProjectRef = push(projectsRef);
      await set(newProjectRef, {
        ...project,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return newProjectRef.key || '';
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error);
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
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      await remove(ref(db, `projects/${id}`));
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      throw error;
    }
  },
};

// ===== INFORMAÇÕES DE CONTATO - REALTIME DATABASE =====
export const contactServiceRTDB = {
  async get(): Promise<ContactInfoRTDB | null> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      const snapshot = await get(ref(db, 'portfolio/contactInfo'));
      if (snapshot.exists()) {
        return snapshot.val() as ContactInfoRTDB;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar informações de contato:', error);
      throw error;
    }
  },

  async update(data: ContactInfoRTDB): Promise<void> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      await set(ref(db, 'portfolio/contactInfo'), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erro ao atualizar informações de contato:', error);
      throw error;
    }
  },
};

// ===== IMAGEM DE PERFIL - REALTIME DATABASE =====
export const profileServiceRTDB = {
  async get(): Promise<ProfileImageRTDB | null> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      const snapshot = await get(ref(db, 'portfolio/profileImage'));
      if (snapshot.exists()) {
        return snapshot.val() as ProfileImageRTDB;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar imagem de perfil:', error);
      throw error;
    }
  },

  async update(url: string): Promise<void> {
    try {
      if (!db) throw new Error('Firebase não configurado');
      await set(ref(db, 'portfolio/profileImage'), {
        url,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erro ao atualizar imagem de perfil:', error);
      throw error;
    }
  },
};
