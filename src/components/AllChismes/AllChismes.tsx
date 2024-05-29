"use client";
import {use, useEffect, useState} from 'react'
import { getChismes } from '@/api/apiChismes'
import CardChisme from '@/components/CardChisme/CardChisme'
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext'
import { VAPID_PUBLIC_KEY,hostURL } from '../dataEnv';



//import { getToken, onMessage, getMessaging } from "firebase/messaging";
// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";


/* declare global {
    interface Window {
      registration: any; // Replace 'any' with the actual type if known
    }
  }
 */// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: "AIzaSyCyItuReHRFKVwDIA3HwcmOtwPeBg52NdE",
  authDomain: "chismografo-b04c3.firebaseapp.com",
  projectId: "chismografo-b04c3",
  storageBucket: "chismografo-b04c3.appspot.com",
  messagingSenderId: "792405643751",
  appId: "1:792405643751:web:0c180f0b9b32cf4a5e6d42",
  measurementId: "G-1XQEQS6H8P"
}; */

// Initialize Firebase
/* const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log('analytics:...',analytics); */

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

 /* getToken(messaging, { vapidKey: 'BHkxcyUTCaLWZDriU2BeWXcum9px0Mk-T_sCrWZrUoJFTBIUuQk-DgHxIFCt_kADyI9e6Y9HSeFFuEgHvGKAo2w' })
.then((currentToken) => {
  if (currentToken) {
    console.log('currentToken(FCM):...',currentToken);

    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  }); */ 

  function urlBase64ToUint8Array(base64String:any) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }






const AllChismes = () => {
    const [chismes, setChismes]:any = useState([]);
    const {dataLocalStorage}= useContext(MyContext);
    const [askForNotification, setAskForNotification] = useState(false);
    useEffect(() => {
        getAllChismes();
        requestNotificationPermission();
        if("serviceWorker" in navigator) {
            handleServiceWorker();
          }
        //console.log('Varibles de entorno', process.env.NEXT_PUBLIC_DEV_ENV)
    }, []);


    useEffect(() => {
        if ("Notification" in window) {
          const setupNotifications = () => {
            navigator.serviceWorker.ready.then((reg):void => {
              reg.pushManager.getSubscription().then(async(sub) => {
                if (
                  sub &&
                  !(
                    sub.expirationTime &&
                    Date.now() > sub.expirationTime - 5 * 60 * 1000
                  )
                ) {
                    const res = await fetch(`${hostURL}/subscribe`, {
                        method: "POST",
                        body: JSON.stringify(sub),
                        headers: {
                          "content-type": "application/json",
                        },
                      });
                
                      const data = await res.json();
                      console.log('result subscription:...',data);
                  //setSubscription(sub);
                  //setIsSubscribed(true);
                } else {
                  reg.pushManager
                    .subscribe({
                      userVisibleOnly: true,
                      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
                    })
                    .then(async(newSub) => {
                      console.log("User is subscribed:", newSub);
                      
                      const res = await fetch(`${hostURL}/subscribe`, {
                        method: "POST",
                        body: JSON.stringify(newSub),
                        headers: {
                          "content-type": "application/json",
                        },
                      });
                
                      const data = await res.json();
                      console.log(data);
                      //setSubscription(newSub);
                      //setIsSubscribed(true);
                    })
                    .catch((err) => {
                      if (Notification.permission === "denied") {
                        console.log("Permission for notifications was denied");
                      } else {
                        console.log("Failed to subscribe the user: ", err);
                      }
                    });
                }
              });
              //setRegistration(reg);
            });
          };
          if (Notification.permission === "granted") {
            setupNotifications();
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                setupNotifications();
              }
            });
          }
        }
      }, []); 


    useEffect(() => {
        if (askForNotification===false) {
            requestNotificationPermission();
            setAskForNotification(true);
        }
    }, [askForNotification]);

    const handleServiceWorker = async () => {
        const register = await navigator.serviceWorker.register("/worker/index.js");
  
        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: VAPID_PUBLIC_KEY,
        });
  
        const res = await fetch(`${hostURL}/subscribe`, {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "content-type": "application/json",
          },
        });
  
        const data = await res.json();
        console.log(data);
      };

    const sendNotification = async (title:string, body:string) => {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                const options = {
                    body,
                    icon: '/favicon.ico',
                };
                new Notification(title, options);
            } else if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const options = {
                        body,
                        icon: '/favicon.ico',
                    };
                    new Notification(title, options);
                }
            }
        }
    }

    const requestNotificationPermission = async () => {
        if ('Notification' in window) {
            if (Notification.permission !== 'granted') {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    console.log('Permission granted');
                    //sendNotification('Welcome to Gossip', 'You will receive notifications about the chismes');
                }
            }else{
                console.log('Permission granted');
                //sendNotification('Welcome to Gossip', 'You will receive notifications about the chismes');
            }
        }
    }

    const getAllChismes = async () => {
        try {
            const resultChismes:any[] = await getChismes();
            //console.log('resultChismes:..',resultChismes);
            if (resultChismes.length > 0) {
                setChismes([...resultChismes]);
            }
        } catch (error) {
            
        }
    }
  return (
    <>
    {dataLocalStorage.email==='' &&
      <div className='alert alert-info text-center'>
        Please Sign In to Start...
      </div>
      }
    <div className='d-flex flex-wrap justify-content-center align-items-center gap-3 py-3'>
      
    {chismes.map((chisme:any) => (
        <CardChisme key={chisme._id} dataChisme={chisme} getAllChismes={getAllChismes}/>
      ))
    }
    </div>
    </>
  )
}

export default AllChismes