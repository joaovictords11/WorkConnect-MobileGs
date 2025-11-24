import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../src/constants/Colors";
import { useAuth } from "../../src/context/AuthContext";
import api from "../../src/services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !senha)
      return Alert.alert("Erro", "Preencha todos os campos");

    setLoading(true);
    try {
      const response = await api.post("/usuarios/login", { email, senha });
      await signIn(response.data);
    } catch (error) {
      Alert.alert("Erro", "Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Work Connect 🚀</Text>
      <Text style={styles.subtitle}>
        Conecte-se e evolua profissionalmente.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <Link href="/register" asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 30,
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
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
  linkButton: { marginTop: 20, alignItems: "center" },
  linkText: { color: Colors.primary, fontSize: 16 },
});
