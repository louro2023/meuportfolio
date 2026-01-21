/**
 * Script Helper para Inicializar o Realtime Database com Dados Padrão
 * 
 * Execute este script uma única vez para popular o Firebase Realtime Database com os projetos iniciais
 * 
 * Como usar:
 * 1. Importe esta função em qualquer componente
 * 2. Chame em um botão do Admin Panel ou durante o setup inicial
 * 
 * Exemplo:
 * import { initializeFirebaseWithDefaults } from '../services/firebaseInit';
 * 
 * const handleInit = async () => {
 *   await initializeFirebaseWithDefaults();
 *   alert('Dados iniciais adicionados ao Firebase!');
 * };
 */

import { projectsServiceRTDB, contactServiceRTDB, profileServiceRTDB } from './firebaseRealtimeService';
import { PROJECTS as INITIAL_PROJECTS, CONTACT_INFO as INITIAL_CONTACT_INFO } from '../constants';

export const initializeFirebaseWithDefaults = async () => {
  try {
    console.log('Iniciando população do Firebase Realtime Database com dados padrão...');

    // Adicionar projetos
    for (const project of INITIAL_PROJECTS) {
      const { id, ...projectData } = project;
      try {
        await projectsServiceRTDB.add(projectData as any);
        console.log(`✓ Projeto adicionado: ${projectData.title}`);
      } catch (error) {
        console.warn(`Projeto ${projectData.title} pode já existir ou houve erro:`, error);
      }
    }

    // Adicionar informações de contato
    try {
      await contactServiceRTDB.update(INITIAL_CONTACT_INFO);
      console.log('✓ Informações de contato adicionadas');
    } catch (error) {
      console.error('Erro ao adicionar informações de contato:', error);
    }

    // Adicionar imagem de perfil padrão
    try {
      await profileServiceRTDB.update('/profile.jpg');
      console.log('✓ Imagem de perfil adicionada');
    } catch (error) {
      console.error('Erro ao adicionar imagem de perfil:', error);
    }

    console.log('✓ Inicialização do Firebase concluída com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao inicializar Firebase:', error);
    throw error;
  }
};

/**
 * Limpar todos os dados do Firebase (CUIDADO!)
 */
export const clearFirebaseData = async () => {
  if (!window.confirm('⚠️ ATENÇÃO: Isso vai deletar TODOS os dados do Firebase!\n\nTem certeza?')) {
    return;
  }

  try {
    const projects = await projectsServiceRTDB.getAll();
    for (const project of projects) {
      await projectsServiceRTDB.delete(project.id);
    }
    console.log('✓ Todos os dados foram deletados');
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
  }
};
