"use client";
import axios from "axios";
import { hostURL } from "@/components/dataEnv";


export const getChismes = async () => {
    try {
        //console.log("nodeEnv:..", nodeEnv);
        //console.log("hostURL:..", hostURL);
        const response = await axios.get(`${hostURL}/api/chismes`);
        //console.log('response:..',response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createChisme = async (chisme) => {
    try {
        const response = await axios.post(`${hostURL}/api/chismes`, chisme);
        return response.data;
    } catch (error) {
        console.error('Error al crear el chisme:..',error);

    }
}
