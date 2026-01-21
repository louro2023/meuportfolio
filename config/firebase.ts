import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Substitua com as credenciais do seu projeto Firebase
const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string) || '',
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || '',
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) || '',
  databaseURL: (import.meta.env.VITE_FIREBASE_DATABASE_URL as string) || '',
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) || '',
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || '',
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) || '',
};

// Initialize Firebase apenas se houver configuração completa
let app: any = null;
let db: any = null;

const isConfigured = firebaseConfig.projectId && firebaseConfig.databaseURL;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
  } catch (error) {
    console.warn('Erro ao inicializar Firebase:', error);
  }
} else {
  console.info('Firebase não configurado. Configure as variáveis de ambiente para usar.');
}

export { db };
export default app;
