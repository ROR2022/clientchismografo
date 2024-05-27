import axios from "axios";
import { hostURL } from "@/components/dataEnv";

export const loginChismoso = async (dataChismoso) => {
  try {
    const response = await axios.post(
      `${hostURL}/api/chismosos/loginChismoso`,
      dataChismoso
    );
    //console.log(response);
    if (response.data) {
        return response.data;  
    }else{
      return response;
    }
    
  } catch (error) {
    console.error(error);
    console.log('error:..',error);
    return error.response.data;
  }
};

export const registerChismoso = async (dataChismoso) => {
  try {
    const response = await axios.post(
      `${hostURL}/api/chismosos/registerChismoso`,
      dataChismoso
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);

  }
};

export const updatePassword = async (dataChismoso) => {
  try {
    const response = await axios.put(
      `${hostURL}/api/chismosos/updatePassword`,
      dataChismoso
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOneChismoso = async (id) => {
  try {
    const response = await axios.get(`${hostURL}/api/chismosos/findOne/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
