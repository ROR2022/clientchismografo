// components/NotificationButton.tsx
import React, { useState } from 'react';

const NotificationButton: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscription = async () => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      alert('Notificaciones push no son soportadas por tu navegador.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('Permiso de notificación denegado.');
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('<VAPID_PUBLIC_KEY>')
      });
      console.log('Suscripción exitosa:', subscription);
      setIsSubscribed(true);
    } catch (error) {
      console.error('Error en la suscripción:', error);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array(rawData.split('').map(char => char.charCodeAt(0)));
  };

  return (
    <button onClick={handleSubscription} disabled={isSubscribed}>
      {isSubscribed ? 'Suscrito a Notificaciones' : 'Permitir Notificaciones'}
    </button>
  );
};

export default NotificationButton;
