"use client";
import axios from "axios";
import { hostURL } from "@/components/dataEnv";


export const createLike = async(dataLike)=>{
    try {
        const response = await axios.post(`${hostURL}/api/likes`, dataLike);
        return response.data;
    } catch (error) {
        console.log('Error al crear el like:..',error)
    }
}

//export const deleteLike

export const deleteLike = async (idLike)=>{
    try {
        const response = await axios.delete(`${hostURL}/api/likes/${idLike}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}



