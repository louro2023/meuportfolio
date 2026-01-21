import { Timestamp } from 'firebase/firestore';
import { Project } from '../types';

// Este arquivo é legado e não está sendo usado
// A aplicação está usando firebaseRealtimeService.ts para Realtime Database
// Mantido para compatibilidade futura se necessário

export interface ContactInfoDB {
  whatsappNumber: string;
  location: string;
  email: string;
  name: string;
  role: string;
  updatedAt?: Timestamp;
}

export interface ProfileImageDB {
  url: string;
  updatedAt?: Timestamp;
}

// Não implementado - usar firebaseRealtimeService.ts
export const projectsService = {
  async getAll(): Promise<Project[]> {
    return [];
  },
  async add(): Promise<string> {
    return '';
  },
  async update(): Promise<void> {},
  async delete(): Promise<void> {},
};

export const contactService = {
  async get(): Promise<ContactInfoDB | null> {
    return null;
  },
  async update(): Promise<void> {},
};

export const profileService = {
  async get(): Promise<ProfileImageDB | null> {
    return null;
  },
  async update(): Promise<void> {},
};
