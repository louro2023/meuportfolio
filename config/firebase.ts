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

// Log de debug para verificar se as variáveis estão carregadas
console.log('🔍 Firebase Config Check:', {
  apiKey: firebaseConfig.apiKey ? '✅ Configurado' : '❌ Vazio',
  authDomain: firebaseConfig.authDomain ? '✅ Configurado' : '❌ Vazio',
  projectId: firebaseConfig.projectId ? '✅ Configurado' : '❌ Vazio',
  databaseURL: firebaseConfig.databaseURL ? '✅ Configurado' : '❌ Vazio',
  storageBucket: firebaseConfig.storageBucket ? '✅ Configurado' : '❌ Vazio',
  messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Configurado' : '❌ Vazio',
  appId: firebaseConfig.appId ? '✅ Configurado' : '❌ Vazio',
});

// Initialize Firebase apenas se houver configuração completa
let app: any = null;
let db: any = null;

const isConfigured = firebaseConfig.projectId && firebaseConfig.databaseURL;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    console.log('✅ Firebase inicializado com sucesso!');
  } catch (error: any) {
    console.error('❌ Erro ao inicializar Firebase:', error.message);
  }
} else {
  console.error('❌ Firebase NÃO CONFIGURADO! Verifique as variáveis de ambiente:');
  console.error('   - projectId:', firebaseConfig.projectId ? 'OK' : 'FALTANDO');
  console.error('   - databaseURL:', firebaseConfig.databaseURL ? 'OK' : 'FALTANDO');
  console.error('\nVariáveis necessárias no .env ou Vercel:');
  console.error('   VITE_FIREBASE_API_KEY');
  console.error('   VITE_FIREBASE_AUTH_DOMAIN');
  console.error('   VITE_FIREBASE_PROJECT_ID');
  console.error('   VITE_FIREBASE_DATABASE_URL');
  console.error('   VITE_FIREBASE_STORAGE_BUCKET');
  console.error('   VITE_FIREBASE_MESSAGING_SENDER_ID');
  console.error('   VITE_FIREBASE_APP_ID');
}

export { db };
export default app;
