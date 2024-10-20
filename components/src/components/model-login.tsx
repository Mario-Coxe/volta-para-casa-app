import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { findMunicipesByProvinceId } from "../services/municipe-service";
import { findAllProvince } from "../services/province-service";
import { useRegisterViewModel } from "../view-models/register-view-model";

// Schema de validação com yup
const schema = yup.object().shape({
  full_name: yup.string().required("Nome é obrigatório"),
  phone_number: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/^9\d{8}$/, "Número de telefone inválido. Deve começar com 9 e ter 9 dígitos."),
  province_id: yup.string().required("Província é obrigatória"),
  municipe_id: yup.string().required("Município é obrigatório"),
  password: yup.string().required("Senha é obrigatória").min(6, "A senha deve ter no mínimo 6 caracteres"),
});

interface LoginRegisterModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({
  visible,
  onDismiss,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [provinces, setProvinces] = useState<Array<{ label: string; value: string }>>([]);
  const [municipalities, setMunicipalities] = useState<Array<{ label: string; value: string }>>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Usar o hook useRegisterViewModel
  const { register, fullName, setFullName, phoneNumber, setPhoneNumber, password, setPassword, municipe_id, setMunicipeId, loading, error } = useRegisterViewModel();


  // Carrega as províncias ao abrir o modal de registro
  useEffect(() => {
    if (visible) {
      loadProvinces();
    }
  }, [visible]);

  const loadProvinces = async () => {
    try {
      const provincesData = await findAllProvince();
      setProvinces(provincesData.map((province: any) => ({ label: province.name, value: province.id })));
    } catch (error) {
      console.error("Erro ao carregar províncias:", error);
    }
  };

  const loadMunicipalities = async (provinceId: number) => {
    try {
      const municipalitiesData = await findMunicipesByProvinceId(provinceId);
      setMunicipalities(
        municipalitiesData.map((municipality: any) => ({
          label: municipality.name,
          value: municipality.id,
        }))
      );
    } catch (error) {
      console.error("Erro ao carregar municípios:", error);
    }
  };

  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvince(provinceId);
    loadMunicipalities(Number(provinceId)); // Carrega os municípios ao selecionar uma província
  };


  const handleRegister = async (data: any) => {
    setFullName(data.full_name);
    setPhoneNumber(data.phone_number);
    setMunicipeId(Number(data.municipe_id));
    setPassword(data.password);

    console.log(data)

    await register(data.full_name, data.phone_number, data.password, data.municipe_id);
    onDismiss();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.content}>
            {isLogin ? (
              <>
                <Text style={styles.title}>Login</Text>
                {/* Login: Não vamos adicionar validação ao login agora */}
                <TextInput
                  placeholder="Telefone"
                  style={styles.input}
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="Senha"
                  style={styles.input}
                  secureTextEntry={true}
                />
                <Button title="Login" onPress={onDismiss} />
                <Text style={styles.switchText}>
                  Não tem conta?{" "}
                  <Text
                    style={styles.switchButton}
                    onPress={() => setIsLogin(false)}
                  >
                    Registre-se
                  </Text>
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.title}>Registro de Usuário</Text>

                {/* Nome */}
                <Controller
                  control={control}
                  name="full_name"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TextInput
                        placeholder="Nome"
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.full_name && (
                        <Text style={styles.errorText}>
                          {errors.full_name.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* Telefone */}
                <Controller
                  control={control}
                  name="phone_number" // Corrigido o nome do campo
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TextInput
                        placeholder="Telefone"
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={onChange}
                        value={value}
                        maxLength={9}
                      />
                      {errors.phone_number && (
                        <Text style={styles.errorText}>
                          {errors.phone_number.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* Província */}
                <Controller
                  control={control}
                  name="province_id"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <RNPickerSelect
                        onValueChange={(value) => {
                          onChange(value);
                          handleProvinceChange(value); // Atualiza a seleção de província
                        }}
                        items={provinces}
                        value={value}
                        placeholder={{ label: "Selecione uma província", value: "" }}
                        style={pickerSelectStyles}
                      />
                      {errors.province_id && (
                        <Text style={styles.errorText}>
                          {errors.province_id.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* Município */}
                <Controller
                  control={control}
                  name="municipe_id"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <RNPickerSelect
                        onValueChange={onChange}
                        items={municipalities}
                        value={value}
                        placeholder={{ label: "Selecione um município", value: "" }}
                        style={pickerSelectStyles}
                      />
                      {errors.municipe_id && (
                        <Text style={styles.errorText}>
                          {errors.municipe_id.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* Senha */}
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TextInput
                        placeholder="Senha"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.password && (
                        <Text style={styles.errorText}>
                          {errors.password.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                <Button title="Registrar" onPress={handleSubmit(handleRegister)} />
                <Text style={styles.switchText}>
                  Já tem uma conta?{" "}
                  <Text
                    style={styles.switchButton}
                    onPress={() => setIsLogin(true)}
                  >
                    Faça Login
                  </Text>
                </Text>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    maxHeight: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  switchText: {
    marginTop: 10,
    textAlign: "center",
  },
  switchButton: {
    color: "blue",
    textDecorationLine: "underline",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

// Estilos personalizados para o RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    marginBottom: 10,
  },
});

export default LoginRegisterModal;
