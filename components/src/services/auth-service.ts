import axios from 'axios';
import { AUTH } from '@/enviroments';
import User from '../models/users';

export class AuthService {
  static async register(user: User): Promise<any> {

    console.log("user", user)
    try {
      const response = await axios.post(`${AUTH}register`, {
        full_name: user.fullName,
        phone_number: user.phoneNumber,
        password: user.password,
        municipe_id: user.municipe_id
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error :", error);
        throw new Error(error.response?.data?.message || 'Erro de registro');
      } else {
        console.error("Erro inesperado:", error);
        throw new Error('Erro inesperado ao registrar o usuário');
      }
    }
  }
}

