"use client";
import axios from "axios";
import { hostURL } from "@/components/dataEnv";


export const createComment = async(dataComment)=>{
    try {
        const response = await axios.post(`${hostURL}/api/comments`, dataComment);
        return response.data;
    } catch (error) {
        console.log('Error al crear el like:..',error)
    }
}