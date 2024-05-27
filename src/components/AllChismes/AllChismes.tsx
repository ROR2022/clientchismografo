"use client";
import {useEffect, useState} from 'react'
import { getChismes } from '@/api/apiChismes'
import CardChisme from '@/components/CardChisme/CardChisme'
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext'




const AllChismes = () => {
    const [chismes, setChismes]:any = useState([]);
    const {dataLocalStorage}= useContext(MyContext);
    useEffect(() => {
        getAllChismes();
        requestNotificationPermission();
        //console.log('Varibles de entorno', process.env.NEXT_PUBLIC_DEV_ENV)
    }, []);

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
                    sendNotification('Welcome to Gossip', 'You will receive notifications about the chismes');
                }
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