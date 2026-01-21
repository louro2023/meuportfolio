import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Wifi, WifiOff } from 'lucide-react';

export const SyncStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showStatus) {
    return (
      <button
        onClick={() => setShowStatus(true)}
        className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        title="Status de sincronização"
      >
        {isOnline ? (
          <Wifi size={20} className="text-green-600" />
        ) : (
          <WifiOff size={20} className="text-red-600" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-50">
      <div className="flex items-center gap-3 mb-3">
        {isOnline ? (
          <>
            <CheckCircle2 size={20} className="text-green-600" />
            <div>
              <p className="font-semibold text-green-600">Sincronizado</p>
              <p className="text-sm text-gray-600">Firebase conectado</p>
            </div>
          </>
        ) : (
          <>
            <AlertCircle size={20} className="text-yellow-600" />
            <div>
              <p className="font-semibold text-yellow-600">Offline</p>
              <p className="text-sm text-gray-600">Usando localStorage</p>
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => setShowStatus(false)}
        className="w-full text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
      >
        Fechar
      </button>
    </div>
  );
};
