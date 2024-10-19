import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Schema de validação com yup
const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/^9\d{8}$/, "Número de telefone inválido. Deve começar com 9 e ter 9 dígitos."),
  province: yup.string().required("Província é obrigatória"),
  municipality: yup.string().required("Município é obrigatório"),
  password: yup.string().required("Senha é obrigatória").min(6, "A senha deve ter no mínimo 6 caracteres"),
});

interface LoginRegisterModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const provinces = [
  { label: "Luanda", value: "luanda" },
  { label: "Benguela", value: "benguela" },
  { label: "Huambo", value: "huambo" },
];

const municipalities = [
  { label: "Belas", value: "belas" },
  { label: "Cazenga", value: "cazenga" },
  { label: "Viana", value: "viana" },
];

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({
  visible,
  onDismiss,
}) => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = (data: any) => {
    console.log("Dados do registro:", data);
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
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TextInput
                        placeholder="Nome"
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.name && (
                        <Text style={styles.errorText}>
                          {errors.name.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* Telefone */}
                <Controller
                  control={control}
                  name="phone"
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
                      {errors.phone && (
                        <Text style={styles.errorText}>
                          {errors.phone.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* Província */}
                <Controller
                  control={control}
                  name="province"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <RNPickerSelect
                        onValueChange={onChange}
                        items={provinces}
                        value={value}
                        placeholder={{ label: "Selecione uma província", value: "" }}
                        style={pickerSelectStyles}
                      />
                      {errors.province && (
                        <Text style={styles.errorText}>
                          {errors.province.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                {/* Município */}
                <Controller
                  control={control}
                  name="municipality"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <RNPickerSelect
                        onValueChange={onChange}
                        items={municipalities}
                        value={value}
                        placeholder={{ label: "Selecione um município", value: "" }}
                        style={pickerSelectStyles}
                      />
                      {errors.municipality && (
                        <Text style={styles.errorText}>
                          {errors.municipality.message}
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
  content: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "100%",
  },
  switchText: {
    marginTop: 20,
    textAlign: "center",
  },
  switchButton: {
    color: "blue",
    fontWeight: "bold",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

// Estilos para RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "100%",
    color: "#000",
  },
  inputAndroid: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "100%",
    color: "#000",
  },
});

export default LoginRegisterModal;
