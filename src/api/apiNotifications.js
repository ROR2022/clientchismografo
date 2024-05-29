"use client";
import axios from "axios";
import { hostURL } from "@/components/dataEnv";


export const createNotification = async(dataNotification)=>{
    try {
        const response = await axios.post(`${hostURL}/send-notification`, {data: dataNotification});
        return response.data;
    } catch (error) {
        console.log('Error al crear la notificacion:..',error)
    }
}