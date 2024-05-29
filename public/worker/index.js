import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    apiKey: 'AIzaSyCyItuReHRFKVwDIA3HwcmOtwPeBg52NdE',
    authDomain: 'chismografo-b04c3.firebaseapp.com',
    databaseURL: 'https://chismografo-b04c3.firebaseio.com',
    projectId: 'chismografo-b04c3',
    storageBucket: 'chismografo-b04c3.appspot.com',
    messagingSenderId: '792405643751',
    appId: '1:792405643751:web:0c180f0b9b32cf4a5e6d42',
    measurementId: 'G-1XQEQS6H8P',
  });
const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: 'https://clientchismografo.vercel.app/icon-192x192.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });



self.addEventListener("push", (event) => {
    event.waitUntil(
      self.registration.showNotification("SpeakBits", {
        body: event.data.text(),
        icon: "/icon-192x192.png"
      })
    );
  });
  
  self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
      self.clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          if (clientList.length > 0) {
            let client = clientList[0];
            for (let i = 0; i < clientList.length; i++) {
              if (clientList[i].focused) {
                client = clientList[i];
              }
            }
            return client.focus();
          }
          return clients.openWindow("/");
        })
    );
  });