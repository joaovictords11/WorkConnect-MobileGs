import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../src/constants/Colors";
import { useAuth } from "../../src/context/AuthContext";
import api from "../../src/services/api";

export default function Profile() {
  const { user, signOut, signIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    nome: user?.nome || "",
    email: user?.email || "",
    profissao: user?.profissao || "",
    senha: user?.senha || "",
  });

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/usuarios/${user?.id}`, form);
      Alert.alert("Sucesso", "Perfil atualizado!");
      await signIn({ ...response.data, senha: form.senha });
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar.");
    }
  };

  const handleDelete = () => {
    Alert.alert("Atenção", "Deseja excluir sua conta permanentemente?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/usuarios/${user?.id}`);
            signOut();
          } catch (e) {
            Alert.alert("Erro ao excluir");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.nome?.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user?.nome}</Text>
        <Text style={styles.role}>{user?.profissao}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Seus Dados</Text>

        <TextInput
          style={styles.input}
          value={form.nome}
          editable={isEditing}
          onChangeText={(t) => setForm({ ...form, nome: t })}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          value={form.email}
          editable={isEditing}
          onChangeText={(t) => setForm({ ...form, email: t })}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={form.profissao}
          editable={isEditing}
          onChangeText={(t) => setForm({ ...form, profissao: t })}
          placeholder="Profissão"
        />

        {isEditing && (
          <TextInput
            style={styles.input}
            value={form.senha}
            onChangeText={(t) => setForm({ ...form, senha: t })}
            placeholder="Confirme sua senha para salvar"
            secureTextEntry
          />
        )}

        {isEditing ? (
          <View style={{ gap: 10 }}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
              <Text style={styles.btnText}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.btnText}>Editar Perfil</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
        <Text style={styles.btnText}>Sair do App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteText}>Excluir Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: Colors.background },
  header: { alignItems: "center", marginBottom: 30 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: { color: "white", fontSize: 32, fontWeight: "bold" },
  name: { fontSize: 22, fontWeight: "bold", color: Colors.text },
  role: { fontSize: 16, color: Colors.textLight },
  form: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: Colors.primary,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  editBtn: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: Colors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#999",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutBtn: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteBtn: { padding: 15, alignItems: "center" },
  btnText: { color: "white", fontWeight: "bold" },
  deleteText: { color: Colors.danger, fontWeight: "bold" },
});
