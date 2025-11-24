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
import { useAuth } from "../../src/context/AuthContext";
import api from "../../src/services/api";

export default function Create() {
  const { user } = useAuth();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleCreate = async () => {
    if (!titulo || !descricao || !categoria)
      return Alert.alert("Erro", "Preencha tudo");

    try {
      await api.post("/dicas", {
        titulo,
        descricao,
        categoria,
        autorId: user?.id,
      });
      Alert.alert("Sucesso", "Dica publicada!");
      setTitulo("");
      setDescricao("");
      setCategoria("");
      router.push("/(tabs)");
    } catch (error) {
      Alert.alert("Erro", "Falha ao publicar.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ex: Curso de Java Gratuito"
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
        placeholder="Ex: Tecnologia, Design..."
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Detalhes da dica..."
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: Colors.background, flex: 1 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: Colors.white, fontWeight: "bold", fontSize: 16 },
});
