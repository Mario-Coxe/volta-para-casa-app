import { useState } from 'react';
import User from '../models/users';
import { AuthService } from '../services/auth-service';

export function useRegisterViewModel() {
  // Definindo os estados para os inputs de registro
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [municipe_id, setMunicipeId] = useState<number>(0); // Id do município
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  
  const register = async (fullName: string, phoneNumber: string, password: string,municipe_id: number) => {
    setLoading(true); // Ativar o estado de loading
    try {
      // Criar o novo objeto do usuário
      const newUser = new User(fullName, phoneNumber, password, municipe_id);
      const result = await AuthService.register(newUser);
      console.log('Usuário registrado com sucesso:', result);
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar usuário.');
    } finally {
      setLoading(false); // Desativar o estado de loading
    }
  };

  // Retorno do hook customizado com todas as variáveis e funções necessárias
  return {
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    municipe_id,
    setMunicipeId,
    loading,
    error,
    register,
  };
}
