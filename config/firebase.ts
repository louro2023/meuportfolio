import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Substitua com as credenciais do seu projeto Firebase
const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string) || 'your-api-key',
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || 'your-auth-domain',
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) || 'your-project-id',
  databaseURL: (import.meta.env.VITE_FIREBASE_DATABASE_URL as string) || 'your-database-url',
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) || 'your-storage-bucket',
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || 'your-messaging-sender-id',
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) || 'your-app-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);

export default app;
