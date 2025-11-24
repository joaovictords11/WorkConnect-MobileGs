import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../../src/constants/Colors";
import api from "../../src/services/api";

export default function Register() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    profissao: "",
  });

  const handleRegister = async () => {
    try {
      await api.post("/usuarios/cadastro", form);
      Alert.alert("Sucesso", "Conta criada! Faça login.");
      router.back();
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível criar a conta. Verifique os dados."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        onChangeText={(t) => setForm({ ...form, nome: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(t) => setForm({ ...form, email: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Profissão (ex: Dev Java)"
        onChangeText={(t) => setForm({ ...form, profissao: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(t) => setForm({ ...form, senha: t })}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 20, alignItems: "center" }}
      >
        <Text style={{ color: Colors.textLight }}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
});
