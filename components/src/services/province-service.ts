import axios from 'axios';
import { API_URL } from "@/enviroments";


export const findAllProvince = async () => {
    try {
      const response = await axios.get(`${API_URL}provinces`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar províncias:', error);
      throw error;
    }
  };
