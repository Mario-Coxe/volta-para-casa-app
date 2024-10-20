import axios from 'axios';
import { API_URL } from "@/enviroments";

export const findMunicipesByProvinceId = async (provinceId: number) => {
  try {
    const response = await axios.get(`${API_URL}municipes/get-municipes-by-province-id`, {
      params: { province_id: provinceId }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar municípios:', error);
    throw error;
  }
};
